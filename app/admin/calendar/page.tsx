"use client";

import React, { useEffect, useState } from "react";
import { Calendar as CalendarIcon, CheckCircle2, Clock, XCircle, RefreshCw, ExternalLink, Copy, Check, PlusCircle } from "lucide-react";
import { Booking, BookingStatus } from "@/lib/types/booking";

export default function AdminCalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  const [copiedFeed, setCopiedFeed] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const icalUrl = typeof window !== "undefined"
    ? `${window.location.origin}/api/calendar/feed.ics`
    : "https://sparklyspace.co.uk/api/calendar/feed.ics";

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings${filter !== "all" ? `?status=${filter}` : ""}`);
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      } else {
        setMessage(`API Error: ${data.error || 'Failed to load'}`);
      }
    } catch (err: any) {
      console.error("Failed to load bookings:", err);
      setMessage(`Network error loading bookings`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const createSampleBooking = async () => {
    setLoading(true);
    try {
      const ref = `SS-DEMO-${Math.floor(1000 + Math.random() * 9000)}`;
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: ref,
          customer_name: "Demo Customer",
          email: "demo@sparklyspace.co.uk",
          phone: "07700900123",
          postcode: "BH1 1AA",
          address: "12 Beach Road, Bournemouth",
          service_type: "Residential Cleaning",
          property_details: { bedrooms: 2, bathrooms: 1, frequency: "weekly" },
          scheduled_start: new Date().toISOString(),
          status: "pending",
          notes: "Sample demo quote added via Admin Panel",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Demo quote ${ref} created!`);
        await fetchBookings();
      }
    } catch (err) {
      console.error("Failed to create sample booking:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyICalFeed = () => {
    navigator.clipboard.writeText(icalUrl);
    setCopiedFeed(true);
    setTimeout(() => setCopiedFeed(false), 3000);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Date pending";
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return "Date pending";
      return d.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
    } catch (e) {
      return "Date pending";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 mb-2">
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>Schedule & Sync Manager</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Booking Calendar & Sync Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage Supabase bookings, Google Calendar events, and Apple Calendar iCal subscriptions.
            </p>
          </div>

          {/* Sync Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={createSampleBooking}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Add Demo Quote</span>
            </button>
            <button
              onClick={copyICalFeed}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            >
              {copiedFeed ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedFeed ? "iCal Link Copied!" : "Copy Apple Feed (.ics)"}</span>
            </button>
            <button
              onClick={fetchBookings}
              className="inline-flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 font-medium text-xs px-4 py-2.5 rounded-xl border border-green-200 transition-all active:scale-95"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Schedule</span>
            </button>
          </div>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl text-xs font-semibold flex justify-between items-center">
            <span>{message}</span>
            <button onClick={() => setMessage(null)} className="text-green-600 hover:underline">Dismiss</button>
          </div>
        )}

        {/* Sync Guidance Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-sm">
                iCal
              </div>
              <h2 className="text-base font-bold text-slate-900">Apple Calendar (iOS / macOS) Sync</h2>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              To sync scheduled cleans with Apple Calendar on iPhone or Mac, open Calendar &gt; File &gt; New Calendar Subscription, and paste the URL:
            </p>
            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700 text-xs font-mono break-all flex items-center justify-between">
              <span>{icalUrl}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 bg-green-50 rounded-xl flex items-center justify-center text-green-600 font-bold text-sm">
                G
              </div>
              <h2 className="text-base font-bold text-slate-900">Google Calendar Integration</h2>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed mb-4">
              Bookings automatically sync with your official Google Calendar service account. You can also view events in Google Calendar web or app.
            </p>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700 hover:underline"
            >
              <span>Open Google Calendar</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter Status:</span>
            {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  filter === st
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Showing {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-green-500" />
              Loading schedule...
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-sm">
              No bookings found for the selected status. Click <strong>Add Demo Quote</strong> above to test!
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Left: Info */}
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                        {booking.reference}
                      </span>
                      <span className="font-bold text-slate-900 text-base">
                        {booking.customer_name}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                          booking.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : booking.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : booking.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <p className="text-slate-600 text-sm">
                      <strong className="text-slate-800">{booking.service_type}</strong> • {booking.postcode} {booking.address ? `(${booking.address})` : ""}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span><strong>Phone:</strong> {booking.phone}</span>
                      <span><strong>Email:</strong> {booking.email}</span>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                      <span>
                        Scheduled: {formatDate(booking.scheduled_start)}
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {booking.status !== "confirmed" && (
                      <button
                        onClick={() => handleStatusChange(booking.id, "confirmed")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Confirm</span>
                      </button>
                    )}

                    {booking.status !== "completed" && (
                      <button
                        onClick={() => handleStatusChange(booking.id, "completed")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition-colors"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Complete</span>
                      </button>
                    )}

                    {booking.status !== "cancelled" && (
                      <button
                        onClick={() => handleStatusChange(booking.id, "cancelled")}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
