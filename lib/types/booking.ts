export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface PropertyDetails {
  bedrooms?: number;
  bathrooms?: number;
  frequency?: string;
  extras?: string[];
  notes?: string;
}

export interface Booking {
  id: string;
  reference: string;
  customer_name: string;
  email: string;
  phone: string;
  postcode: string;
  address?: string;
  service_type: string;
  property_details?: PropertyDetails;
  scheduled_start: string;
  scheduled_end: string;
  status: BookingStatus;
  notes?: string;
  google_event_id?: string;
  created_at: string;
  updated_at?: string;
}

export interface BookingInsert {
  reference: string;
  customer_name: string;
  email: string;
  phone: string;
  postcode: string;
  address?: string;
  service_type: string;
  property_details?: PropertyDetails;
  scheduled_start: string;
  scheduled_end: string;
  status?: BookingStatus;
  notes?: string;
}
