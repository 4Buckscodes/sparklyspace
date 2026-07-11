"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Check, ArrowLeft, ArrowRight, Shield, AlertTriangle, 
  Leaf, Info, Calendar as CalendarIcon, Phone, Mail, User, MapPin, 
  Home as HomeIcon, CheckCircle, Clipboard, ArrowRightLeft, Smile, 
  HelpCircle, Trash
} from "lucide-react";
import { services } from "@/data/services";
import { BookingSchema, BookingFormData, defaultBookingValues } from "@/lib/booking-schema";
import { calculatePricing } from "@/lib/pricing";
import { validatePostcode } from "@/lib/postcode";
import { generateBookingRef, generateWhatsAppUrl, compileBookingSummary } from "@/lib/whatsapp";
import { analytics, FunnelStep } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";

const LOCAL_STORAGE_KEY = "sparkly_space_booking_draft";

export default function BookingWizard() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get("service") || undefined;
  const initialFrequency = searchParams.get("frequency") || undefined;
  const [step, setStep] = useState<number>(1);
  const [postcodeError, setPostcodeError] = useState<string | null>(null);
  const [postcodeArea, setPostcodeArea] = useState<string | null>(null);
  const [bookingRef] = useState<string>(() => generateBookingRef());
  const [copied, setCopied] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Define steps
  const steps: { name: FunnelStep; label: string }[] = [
    { name: "service-select", label: "Service" },
    { name: "location-check", label: "Location" },
    { name: "property-details", label: "Property" },
    { name: "schedule", label: "Schedule" },
    { name: "extras", label: "Extras" },
    { name: "customer-details", label: "Details" },
    { name: "review", label: "Review" },
  ];

  // 1. Initialize Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(BookingSchema),
    defaultValues: defaultBookingValues,
    mode: "onTouched",
  });

  // Watch key values for pricing and step updates
  const watchedServiceId = watch("serviceId");
  const watchedBedrooms = watch("bedrooms");
  const watchedBathrooms = watch("bathrooms");
  const watchedFrequency = watch("frequency");
  const watchedExtras = watch("extras");
  const watchedPostcode = watch("postcode");
  const watchedEcoFriendly = watch("ecoFriendly");

  const currentService = services.find((s) => s.id === watchedServiceId) || services[0];

  // 2. Client-side hydration & draft loading
  useEffect(() => {
    setIsClient(true);
    analytics.trackBookingStarted(
      typeof window !== "undefined" ? document.referrer : undefined
    );

    // Load draft if exists
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with query string parameters if provided
        if (initialServiceId) parsed.serviceId = initialServiceId;
        if (initialFrequency) parsed.frequency = initialFrequency;
        
        reset(parsed);

        // Revalidate postcode if loaded
        if (parsed.postcode) {
          const check = validatePostcode(parsed.postcode);
          if (check.isValid) {
            setPostcodeArea(check.areaName || null);
          }
        }
      } else {
        // Apply URL params if no saved draft
        if (initialServiceId) setValue("serviceId", initialServiceId);
        if (initialFrequency) setValue("frequency", initialFrequency as any);
      }
    } catch (e) {
      console.error("Error loading booking draft", e);
    }
  }, [reset, initialServiceId, initialFrequency, setValue]);

  // 3. Persist draft on change
  const watchedAll = watch();
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watchedAll));
    } catch (e) {
      // Ignore quota errors
    }
  }, [watchedAll, isClient]);

  // 4. Calculate live prices
  const pricing = calculatePricing(
    watchedServiceId,
    watchedBedrooms,
    watchedBathrooms,
    watchedFrequency,
    watchedExtras
  );

  // 5. Navigate Steps
  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["serviceId"];
    } else if (step === 2) {
      // Validate postcode locally first
      const check = validatePostcode(watchedPostcode);
      if (!check.isValid) {
        setPostcodeError(check.error || "Invalid postcode");
        analytics.trackValidationError("postcode", "area_restriction");
        return;
      }
      setPostcodeError(null);
      setPostcodeArea(check.areaName || null);
      // Format postcode
      setValue("postcode", check.formatted);
      fieldsToValidate = ["postcode", "address1", "city"];
    } else if (step === 3) {
      fieldsToValidate = ["propertyType", "bedrooms", "bathrooms"];
    } else if (step === 4) {
      fieldsToValidate = ["preferredDate", "timeWindow", "frequency"];
    } else if (step === 5) {
      fieldsToValidate = ["parking", "access", "extras"];
    } else if (step === 6) {
      fieldsToValidate = ["name", "phone", "email"];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      const currentStepName = steps[step - 1].name;
      analytics.trackStepCompleted(currentStepName, step);

      const nextStepNum = step + 1;
      setStep(nextStepNum);

      if (nextStepNum <= steps.length) {
        analytics.trackStepView(steps[nextStepNum - 1].name, nextStepNum);
      }
      
      // Scroll to top of form
      window.scrollTo({ top: 180, behavior: "smooth" });
    } else {
      // Track validation error events
      fieldsToValidate.forEach((f) => {
        if (errors[f]) {
          analytics.trackValidationError(f, errors[f]?.type || "required");
        }
      });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      const prevStepNum = step - 1;
      setStep(prevStepNum);
      analytics.trackStepView(steps[prevStepNum - 1].name, prevStepNum);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  // Jump directly to a step from Review
  const jumpToStep = (stepNum: number) => {
    setStep(stepNum);
    analytics.trackStepView(steps[stepNum - 1].name, stepNum);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  // 6. Handle Handoff
  const handleWhatsAppHandoff = (data: BookingFormData) => {
    analytics.trackWhatsAppHandoff(data.serviceId, pricing.total, pricing.isQuoteOnly);
    
    const waUrl = generateWhatsAppUrl(data, bookingRef);
    
    // Clear draft storage
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    // Open in new window
    window.open(waUrl, "_blank");
  };

  const handleCopySummary = () => {
    const summary = compileBookingSummary(watchedAll as BookingFormData, bookingRef);
    navigator.clipboard.writeText(summary);
    setCopied(true);
    analytics.trackSummaryCopied(watchedAll.serviceId, pricing.total, pricing.isQuoteOnly);
    setTimeout(() => setCopied(false), 3000);
  };

  const clearForm = () => {
    if (confirm("Are you sure you want to reset the form? All entered details will be deleted.")) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      reset(defaultBookingValues);
      setStep(1);
      setPostcodeError(null);
      setPostcodeArea(null);
      analytics.track("booking_form_reset");
    }
  };

  if (!isClient) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-10 w-10 bg-sky-100 rounded-full"></div>
          <div className="h-6 w-48 bg-slate-200 rounded"></div>
          <div className="h-4 w-64 bg-slate-100 rounded"></div>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.round((step / steps.length) * 100);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 p-6 sm:p-10 mb-20">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100 mb-8">
        <div>
          <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Enquiry Wizard</span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">Configure Your Clean</h2>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
          <span>Booking ID:</span>
          <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-md">{bookingRef}</span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-2.5">
          <span>Step {step} of {steps.length}: {steps[step - 1].label}</span>
          <span>{progressPercentage}% Complete</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-sky-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(handleWhatsAppHandoff)} className="space-y-8">
        
        {/* ==================== STEP 1: SERVICE ==================== */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Select Cleaning Module</h3>
              <p className="text-slate-500 text-xs mt-1">Choose the service type that matches your requirements.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {services.map((service) => {
                const isSelected = watchedServiceId === service.id;
                return (
                  <label
                    key={service.id}
                    className={`relative flex flex-col sm:flex-row justify-between p-6 rounded-2xl border cursor-pointer select-none transition-all ${
                      isSelected
                        ? "border-sky-500 bg-sky-50/40 ring-1 ring-sky-500"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      value={service.id}
                      {...register("serviceId")}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? "border-sky-600 bg-sky-600 text-white" : "border-slate-300 bg-white"
                      }`}>
                        {isSelected && <Check className="h-3 w-3" />}
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <span>{service.name}</span>
                          {service.id === "residential" && (
                            <span className="inline-flex px-2 py-0.5 bg-sky-100 text-sky-800 text-[10px] font-bold rounded-full">
                              Popular
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-amber-600 font-semibold mt-0.5 uppercase tracking-wider">{service.tagline}</p>
                        <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">{service.description}</p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:text-right flex-shrink-0 flex items-center justify-between sm:justify-start sm:flex-col sm:items-end">
                      <span className="text-slate-400 text-xs font-semibold sm:hidden">Est. Price:</span>
                      {service.isQuoteOnly ? (
                        <span className="bg-amber-50 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-100">
                          Quote Required
                        </span>
                      ) : (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">From</span>
                          <span className="text-xl font-extrabold text-sky-600">£{service.basePrice}</span>
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
            {errors.serviceId && (
              <p className="text-red-500 text-xs font-bold">{errors.serviceId.message}</p>
            )}
          </div>
        )}

        {/* ==================== STEP 2: LOCATION ==================== */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Service Location</h3>
              <p className="text-slate-500 text-xs mt-1">We service Bournemouth, Christchurch, Poole and surrounding area postcodes (BH1-BH23).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="postcode" className="block text-sm font-bold text-slate-800">
                  Postcode <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="postcode"
                    type="text"
                    placeholder="e.g. BH1 1AA"
                    {...register("postcode")}
                    className={`pl-11 w-full p-3.5 bg-slate-50 rounded-xl border transition-all placeholder:text-slate-400 focus:bg-white text-slate-800 font-semibold focus-visible:outline-2 ${
                      postcodeError || errors.postcode
                        ? "border-red-400 focus:border-red-500"
                        : "border-slate-200 focus:border-sky-500"
                    }`}
                  />
                </div>
                {postcodeArea && !postcodeError && (
                  <p className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" />
                    <span>Validated service area: {postcodeArea}</span>
                  </p>
                )}
                {postcodeError && (
                  <p className="text-red-500 text-xs font-bold">{postcodeError}</p>
                )}
                {errors.postcode && !postcodeError && (
                  <p className="text-red-500 text-xs font-bold">{errors.postcode.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-bold text-slate-800">
                  Town / City <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="e.g. Bournemouth"
                  {...register("city")}
                  className={`w-full p-3.5 bg-slate-50 rounded-xl border transition-all focus:bg-white text-slate-800 ${
                    errors.city ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-sky-500"
                  }`}
                />
                {errors.city && <p className="text-red-500 text-xs font-bold">{errors.city.message}</p>}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label htmlFor="address1" className="block text-sm font-bold text-slate-800">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  id="address1"
                  type="text"
                  placeholder="Street name, house name or number"
                  {...register("address1")}
                  className={`w-full p-3.5 bg-slate-50 rounded-xl border transition-all focus:bg-white text-slate-800 ${
                    errors.address1 ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-sky-500"
                  }`}
                />
                {errors.address1 && <p className="text-red-500 text-xs font-bold">{errors.address1.message}</p>}
              </div>

              <div className="md:col-span-2 space-y-2">
                <label htmlFor="address2" className="block text-sm font-bold text-slate-800">
                  Address Line 2 <span className="text-slate-400 text-xs font-medium">(Optional)</span>
                </label>
                <input
                  id="address2"
                  type="text"
                  placeholder="Apartment, suite, unit, building, etc."
                  {...register("address2")}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 transition-all focus:bg-white text-slate-800 focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================== STEP 3: PROPERTY DETAILS ==================== */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Property Details</h3>
              <p className="text-slate-500 text-xs mt-1">Specify room metrics to help calculate a pricing estimate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Property Type Dropdown */}
              <div className="space-y-2 md:col-span-3">
                <label htmlFor="propertyType" className="block text-sm font-bold text-slate-800">
                  Property Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="propertyType"
                  {...register("propertyType")}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 transition-all focus:bg-white text-slate-800 focus:border-sky-500 font-semibold"
                >
                  <option value="Flat/Apartment">Flat / Apartment</option>
                  <option value="Terraced House">Terraced House</option>
                  <option value="Semi-Detached House">Semi-Detached House</option>
                  <option value="Detached House">Detached House</option>
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="Other">Other / Custom</option>
                </select>
                {errors.propertyType && (
                  <p className="text-red-500 text-xs font-bold">{errors.propertyType.message}</p>
                )}
              </div>

              {/* Bedrooms Counter */}
              <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="block text-sm font-bold text-slate-850">Bedrooms</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Excluding studios</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setValue("bedrooms", Math.max(0, watchedBedrooms - 1))}
                    disabled={watchedBedrooms <= 0}
                    className="h-10 w-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 active:scale-95 disabled:opacity-50 min-h-[40px]"
                  >
                    -
                  </button>
                  <span className="text-lg font-extrabold text-slate-800">{watchedBedrooms}</span>
                  <button
                    type="button"
                    onClick={() => setValue("bedrooms", Math.min(10, watchedBedrooms + 1))}
                    className="h-10 w-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 active:scale-95 min-h-[40px]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bathrooms Counter */}
              <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="block text-sm font-bold text-slate-850">Bathrooms</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Toilets &amp; shower rooms</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setValue("bathrooms", Math.max(0, watchedBathrooms - 1))}
                    disabled={watchedBathrooms <= 0}
                    className="h-10 w-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 active:scale-95 disabled:opacity-50 min-h-[40px]"
                  >
                    -
                  </button>
                  <span className="text-lg font-extrabold text-slate-800">{watchedBathrooms}</span>
                  <button
                    type="button"
                    onClick={() => setValue("bathrooms", Math.min(10, watchedBathrooms + 1))}
                    className="h-10 w-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 active:scale-95 min-h-[40px]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Dynamic Info Panel */}
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100/50 flex flex-col justify-between text-xs text-sky-800">
                <div className="flex gap-2">
                  <Info className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    Base pricing includes 1 bedroom &amp; 1 bathroom. Adding rooms increases the overall timing and materials required.
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-sky-100 flex justify-between items-center font-bold">
                  <span>Running Subtotal:</span>
                  <span className="text-sm text-sky-950 font-black">
                    {pricing.isQuoteOnly ? "Quote Required" : `£${pricing.subtotal}`}
                  </span>
                </div>
              </div>

            </div>

            {/* Custom Warning for Extreme properties */}
            {(watchedBedrooms > 6 || watchedBathrooms > 5 || watchedServiceId === "commercial") && (
              <div className="p-4 bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl flex gap-3 text-xs leading-relaxed animate-fade-in-up">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Large Property / Commercial Clean Notice</p>
                  <p className="mt-1 text-amber-700">
                    Properties with more than 6 bedrooms, 5 bathrooms, or commercial office setups will fall outside standard pricing estimators. We will process this inquiry as a <strong>"Request a Quote"</strong>. Sparkly Space will contact you to agree a custom quotation.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== STEP 4: SCHEDULE ==================== */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Schedule &amp; Frequency</h3>
              <p className="text-slate-500 text-xs mt-1">Specify date preferences and how often you'd like the service.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Date Input */}
              <div className="space-y-2">
                <label htmlFor="preferredDate" className="block text-sm font-bold text-slate-800">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="preferredDate"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("preferredDate")}
                    className={`pl-11 w-full p-3.5 bg-slate-50 rounded-xl border transition-all focus:bg-white text-slate-800 font-semibold focus-visible:outline-2 ${
                      errors.preferredDate ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-sky-500"
                    }`}
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-red-500 text-xs font-bold">{errors.preferredDate.message}</p>
                )}
              </div>

              {/* Time Window Dropdown */}
              <div className="space-y-2">
                <label htmlFor="timeWindow" className="block text-sm font-bold text-slate-800">
                  Preferred Time Window <span className="text-red-500">*</span>
                </label>
                <select
                  id="timeWindow"
                  {...register("timeWindow")}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 transition-all focus:bg-white text-slate-800 focus:border-sky-500 font-semibold"
                >
                  <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="evening">Late Afternoon (4:00 PM - 8:00 PM)</option>
                </select>
                {errors.timeWindow && (
                  <p className="text-red-500 text-xs font-bold">{errors.timeWindow.message}</p>
                )}
              </div>

              {/* Frequency Selection (Cards) */}
              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-bold text-slate-800">
                  Service Frequency <span className="text-red-500">*</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { id: "one-off", label: "One-off", desc: "No contract", discount: null },
                    { id: "weekly", label: "Weekly", desc: "20% off", discount: "20% off" },
                    { id: "bi-weekly", label: "Bi-weekly", desc: "15% off", discount: "15% off" },
                    { id: "monthly", label: "Monthly", desc: "10% off", discount: "10% off" },
                  ].map((freq) => {
                    const isSelected = watchedFrequency === freq.id;
                    const isTenancyOnly = watchedServiceId === "end-of-tenancy";
                    
                    return (
                      <label
                        key={freq.id}
                        className={`relative flex flex-col justify-between p-4 rounded-xl border select-none transition-all text-center ${
                          isTenancyOnly && freq.id !== "one-off"
                            ? "opacity-40 cursor-not-allowed border-slate-100 bg-slate-50"
                            : isSelected
                            ? "border-sky-500 bg-sky-50/40 ring-1 ring-sky-500 cursor-pointer"
                            : "border-slate-200 hover:border-slate-300 bg-white cursor-pointer"
                        }`}
                      >
                        <input
                          type="radio"
                          value={freq.id}
                          disabled={isTenancyOnly && freq.id !== "one-off"}
                          {...register("frequency")}
                          className="sr-only"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{freq.label}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{freq.desc}</p>
                        </div>
                        {freq.discount && !isTenancyOnly && (
                          <span className="mt-3 inline-block bg-amber-100 text-amber-800 font-extrabold text-[9px] uppercase tracking-wider py-0.5 px-2 rounded-full self-center">
                            {freq.discount}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
                {errors.frequency && (
                  <p className="text-red-500 text-xs font-bold">{errors.frequency.message}</p>
                )}
                {watchedServiceId === "end-of-tenancy" && (
                  <p className="text-xs text-slate-400 mt-1 italic">
                    *Note: End of Tenancy cleaning is only available as a one-off service.
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ==================== STEP 5: EXTRAS & ACCESS ==================== */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Add-Ons &amp; Access Details</h3>
              <p className="text-slate-500 text-xs mt-1">Enhance your booking request and configure access arrangements.</p>
            </div>

            {/* Extras Checklist if service has extras */}
            {currentService.extras.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-800">Select Add-ons</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.extras.map((extra) => {
                    const isChecked = watchedExtras.includes(extra.id);
                    return (
                      <label
                        key={extra.id}
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer select-none transition-all ${
                          isChecked
                            ? "border-sky-500 bg-sky-50/40 ring-1 ring-sky-500"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={extra.id}
                          checked={isChecked}
                          onChange={(e) => {
                            const val = e.target.checked
                              ? [...watchedExtras, extra.id]
                              : watchedExtras.filter((x) => x !== extra.id);
                            setValue("extras", val);
                          }}
                          className="mt-1 h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-800">{extra.name}</span>
                            <span className="text-xs text-sky-600 font-extrabold">+£{extra.price}</span>
                          </div>
                          {extra.description && (
                            <p className="text-[10px] text-slate-400 mt-1">{extra.description}</p>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Eco Preference Toggle */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex justify-between items-center gap-4">
              <div className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-800">Request Eco-Friendly Products</p>
                  <p className="text-xs text-slate-500 mt-1">We will use 100% safe, plant-based, biodegradable products at no extra cost.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={watchedEcoFriendly}
                  onChange={(e) => setValue("ecoFriendly", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Parking & Access drop-downs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-2">
                <label htmlFor="parking" className="block text-sm font-bold text-slate-800">
                  Parking Availability <span className="text-red-500">*</span>
                </label>
                <select
                  id="parking"
                  {...register("parking")}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 transition-all focus:bg-white text-slate-800 focus:border-sky-500 font-semibold"
                >
                  <option value="free-onsite">Free parking on-site / street</option>
                  <option value="paid-onsite">Paid parking nearby (charges apply)</option>
                  <option value="no-parking">No parking available (advise in notes)</option>
                </select>
                {errors.parking && (
                  <p className="text-red-500 text-xs font-bold">{errors.parking.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="access" className="block text-sm font-bold text-slate-800">
                  Property Access <span className="text-red-500">*</span>
                </label>
                <select
                  id="access"
                  {...register("access")}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 transition-all focus:bg-white text-slate-800 focus:border-sky-500 font-semibold"
                >
                  <option value="someone-home">Someone will be home to let you in</option>
                  <option value="lockbox">Key in lockbox (provide code on confirmation)</option>
                  <option value="key-under-mat">Key left under mat / hidden spot</option>
                  <option value="other-access">Other (details in notes)</option>
                </select>
                {errors.access && (
                  <p className="text-red-500 text-xs font-bold">{errors.access.message}</p>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ==================== STEP 6: CUSTOMER DETAILS ==================== */}
        {step === 6 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Contact details &amp; Notes</h3>
              <p className="text-slate-500 text-xs mt-1">We need these to verify your slot availability and communicate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="name" className="block text-sm font-bold text-slate-800">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Jane Doe"
                    {...register("name")}
                    className={`pl-11 w-full p-3.5 bg-slate-50 rounded-xl border transition-all focus:bg-white text-slate-800 focus-visible:outline-2 ${
                      errors.name ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-sky-500"
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-bold text-slate-800">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="e.g. 07123 456789"
                    {...register("phone")}
                    className={`pl-11 w-full p-3.5 bg-slate-50 rounded-xl border transition-all focus:bg-white text-slate-800 focus-visible:outline-2 ${
                      errors.phone ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-sky-500"
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-slate-800">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. jane@example.com"
                    {...register("email")}
                    className={`pl-11 w-full p-3.5 bg-slate-50 rounded-xl border transition-all focus:bg-white text-slate-800 focus-visible:outline-2 ${
                      errors.email ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-sky-500"
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email.message}</p>}
              </div>

              {/* Referral Source */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="referralSource" className="block text-sm font-bold text-slate-800">
                  How did you hear about us? <span className="text-slate-400 text-xs font-medium">(Optional)</span>
                </label>
                <select
                  id="referralSource"
                  {...register("referralSource")}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 transition-all focus:bg-white text-slate-800 focus:border-sky-500 font-semibold"
                >
                  <option value="">Select option</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Friend Recommendation">Friend / Word of Mouth</option>
                  <option value="Flyer / Leaflet">Flyer or Leaflet</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Special Notes / Instructions */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-bold text-slate-800">
                  Special Notes, Priority Areas, or Pets <span className="text-slate-400 text-xs font-medium">(Optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="e.g. Vicious dog in backyard, focus on kitchen floor, allergies to standard scents, etc."
                  {...register("notes")}
                  className="w-full p-3.5 bg-slate-50 rounded-xl border border-slate-200 transition-all focus:bg-white text-slate-800 focus:border-sky-500 focus-visible:outline-2"
                />
              </div>

            </div>
          </div>
        )}

        {/* ==================== STEP 7: REVIEW ==================== */}
        {step === 7 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Review &amp; Finalize</h3>
              <p className="text-slate-500 text-xs mt-1">Verify details below before handing off to WhatsApp.</p>
            </div>

            {/* Summary List */}
            <div className="border border-slate-100 rounded-3xl bg-slate-50/50 p-6 space-y-4 text-sm divide-y divide-slate-100">
              
              {/* Service & Property */}
              <div className="flex justify-between items-start gap-4 pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Service Setup</p>
                  <p className="font-extrabold text-slate-800 mt-1">{currentService.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {watchedBedrooms} Bedrooms | {watchedBathrooms} Bathrooms | {watchedAll.propertyType}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(3)}
                  className="text-xs text-sky-600 hover:text-sky-700 font-bold hover:underline py-1 px-2.5 bg-white border border-slate-200 rounded-lg min-h-[30px]"
                >
                  Edit
                </button>
              </div>

              {/* Location */}
              <div className="flex justify-between items-start gap-4 pt-4 pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Location</p>
                  <p className="font-bold text-slate-800 mt-1">
                    {watchedAll.address1}
                    {watchedAll.address2 ? `, ${watchedAll.address2}` : ""}, {watchedAll.city}
                  </p>
                  <p className="text-xs font-bold text-sky-600 mt-0.5">{watchedAll.postcode}</p>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(2)}
                  className="text-xs text-sky-600 hover:text-sky-700 font-bold hover:underline py-1 px-2.5 bg-white border border-slate-200 rounded-lg min-h-[30px]"
                >
                  Edit
                </button>
              </div>

              {/* Schedule */}
              <div className="flex justify-between items-start gap-4 pt-4 pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Schedule preference</p>
                  <p className="font-bold text-slate-800 mt-1">
                    {watchedAll.preferredDate} ({watchedAll.timeWindow === "morning" ? "Morning" : watchedAll.timeWindow === "afternoon" ? "Afternoon" : "Late Afternoon"})
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Frequency: <span className="font-semibold capitalize">{watchedAll.frequency}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(4)}
                  className="text-xs text-sky-600 hover:text-sky-700 font-bold hover:underline py-1 px-2.5 bg-white border border-slate-200 rounded-lg min-h-[30px]"
                >
                  Edit
                </button>
              </div>

              {/* Contact */}
              <div className="flex justify-between items-start gap-4 pt-4 pb-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Contact</p>
                  <p className="font-bold text-slate-800 mt-1">{watchedAll.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{watchedAll.phone} | {watchedAll.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(6)}
                  className="text-xs text-sky-600 hover:text-sky-700 font-bold hover:underline py-1 px-2.5 bg-white border border-slate-200 rounded-lg min-h-[30px]"
                >
                  Edit
                </button>
              </div>

              {/* Add-ons/Eco */}
              <div className="flex justify-between items-start gap-4 pt-4">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Add-Ons &amp; Preferences</p>
                  <p className="text-slate-700 mt-1">
                    Eco Products: <span className="font-semibold text-emerald-600">{watchedAll.ecoFriendly ? "Yes" : "No preference"}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Extras Selected: {watchedExtras.length > 0 ? (
                      watchedExtras.map(id => currentService.extras.find(e => e.id === id)?.name).join(", ")
                    ) : "None"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(5)}
                  className="text-xs text-sky-600 hover:text-sky-700 font-bold hover:underline py-1 px-2.5 bg-white border border-slate-200 rounded-lg min-h-[30px]"
                >
                  Edit
                </button>
              </div>

            </div>

            {/* Price Estimator Card */}
            <div className="bg-sky-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg shadow-sky-900/10">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-sky-400 fill-sky-400/20" />
                <span className="text-xs font-bold uppercase tracking-wider text-sky-200">Price breakdown</span>
              </div>
              
              {pricing.isQuoteOnly ? (
                <div className="space-y-2">
                  <p className="text-xl font-extrabold">Quote Status: Requested</p>
                  <p className="text-xs text-sky-200/80 leading-relaxed font-light">
                    Commercial or complex properties fall outside basic online estimates. We will evaluate details and arrange a customized quote via WhatsApp.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between text-sky-200/90 font-light">
                    <span>Base &amp; Rooms:</span>
                    <span>£{pricing.subtotal - (watchedExtras.reduce((sum, id) => sum + (currentService.extras.find(e => e.id === id)?.price || 0), 0))}</span>
                  </div>
                  {watchedExtras.length > 0 && (
                    <div className="flex justify-between text-sky-200/90 font-light">
                      <span>Add-ons:</span>
                      <span>+£{watchedExtras.reduce((sum, id) => sum + (currentService.extras.find(e => e.id === id)?.price || 0), 0)}</span>
                    </div>
                  )}
                  {pricing.discountRate > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Frequency discount ({pricing.discountRate * 100}%):</span>
                      <span>-£{pricing.discountAmount}</span>
                    </div>
                  )}
                  {pricing.minimumApplied && (
                    <div className="flex justify-between text-amber-400 font-medium text-xs">
                      <span>Minimum charge applied:</span>
                      <span>+£{(pricing.total - (pricing.subtotal - pricing.discountAmount)).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-sky-800/80 pt-4 flex justify-between items-baseline">
                    <span className="font-extrabold text-base">Estimated Total:</span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-white">£{pricing.total}</span>
                      <span className="block text-[10px] text-sky-300 font-medium mt-1">VAT included</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms Consent and Notice */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs leading-relaxed text-slate-500">
                <Info className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700">Important Handoff Disclaimer</p>
                  <p className="mt-1">
                    Bookings are not confirmed immediately. Sparkly Space confirms availability, scheduling adjustments, access, and locks final quotations during the subsequent WhatsApp contact.
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3 select-none cursor-pointer p-2">
                <input
                  type="checkbox"
                  required
                  {...register("marketingConsent")}
                  className="mt-1 h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500"
                />
                <span className="text-xs text-slate-600 leading-normal">
                  I agree to Sparkly Space contacting me via WhatsApp, SMS, or email regarding this cleaning inquiry.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ==================== WIZARD NAV BUTTONS ==================== */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100">
          
          {/* Back/Reset Buttons */}
          <div className="w-full sm:w-auto flex gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3.5 px-6 rounded-xl text-sm transition-colors active:scale-95 touch-manipulation min-h-[44px]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={clearForm}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-dashed border-red-200 hover:bg-red-50 text-red-600 font-semibold py-3.5 px-6 rounded-xl text-sm transition-colors active:scale-95 touch-manipulation min-h-[44px]"
              >
                <Trash className="h-4 w-4" />
                <span>Reset Draft</span>
              </button>
            )}
          </div>

          {/* Forward/Submit Buttons */}
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
            {step < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3.5 px-8 rounded-xl text-sm transition-all shadow-md shadow-sky-100 hover:shadow-lg active:scale-[0.98] touch-manipulation min-h-[44px]"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="w-full flex flex-col sm:flex-row gap-3">
                {/* Fallback Copy Button */}
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl text-sm transition-all active:scale-[0.98] border min-h-[44px] ${
                    copied 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300" 
                      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <Clipboard className="h-4.5 w-4.5" />
                  <span>{copied ? "Copied Summary!" : "Copy Summary"}</span>
                </button>
                {/* Submit WhatsApp Button */}
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm transition-all shadow-md shadow-emerald-100 hover:shadow-lg active:scale-[0.98] touch-manipulation min-h-[44px]"
                >
                  {/* WhatsApp Icon */}
                  <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.256 5.26.001 11.724.001C14.854.003 17.8.22 20.016 2.438c2.216 2.217 3.434 5.166 3.431 8.297c-.005 6.465-5.263 11.722-11.727 11.722c-2.007-.001-3.978-.515-5.733-1.499L0 24zm6.29-3.731l.374.222c1.53.908 3.256 1.386 5.011 1.388c5.441.002 9.87-4.425 9.874-9.864c.002-2.634-1.02-5.109-2.883-6.974C16.899 3.176 14.43 2.15 11.729 2.15c-5.438 0-9.87 4.426-9.873 9.866c-.001 1.83.479 3.618 1.392 5.148l.244.407L2.49 21.52l4.032-.973l-.175-.278z"/>
                  </svg>
                  <span>Confirm on WhatsApp</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </form>

    </div>
  );
}
