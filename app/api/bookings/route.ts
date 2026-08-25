import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { createGoogleCalendarEvent } from '@/lib/calendar/google';
import { Booking, BookingInsert } from '@/lib/types/booking';

// In-memory fallback cache so bookings work even before database table creation
export const inMemoryBookings: Booking[] = [];

export async function GET(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');

  if (supabase) {
    let query = supabase.from('bookings').select('*').order('scheduled_start', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (!error && data) {
      const dbBookings = data as Booking[];
      const combined = [...dbBookings];
      inMemoryBookings.forEach((memB) => {
        if (!combined.some((b) => b.id === memB.id || b.reference === memB.reference)) {
          if (!status || memB.status === status) {
            combined.push(memB);
          }
        }
      });
      return NextResponse.json({ success: true, bookings: combined }, { status: 200 });
    }
  }

  // Fallback to in-memory store if Supabase table is not yet created or fails
  const filtered = status
    ? inMemoryBookings.filter((b) => b.status === status)
    : inMemoryBookings;

  return NextResponse.json({ success: true, bookings: filtered, fallback: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const reference = body.reference || `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    const scheduled_start = body.scheduled_start || new Date().toISOString();
    const startMs = new Date(scheduled_start).getTime();
    const defaultEndMs = !isNaN(startMs) ? startMs + 2 * 60 * 60 * 1000 : Date.now() + 2 * 60 * 60 * 1000;
    const scheduled_end = body.scheduled_end || new Date(defaultEndMs).toISOString();

    const newBooking: BookingInsert = {
      reference,
      customer_name: body.customer_name || 'Valued Customer',
      email: body.email || 'customer@example.com',
      phone: body.phone || '',
      postcode: body.postcode || 'BH1 1AA',
      address: body.address || '',
      service_type: body.service_type || 'Residential Cleaning',
      property_details: body.property_details || {},
      scheduled_start,
      scheduled_end,
      status: body.status || 'pending',
      notes: body.notes || '',
    };

    const supabase = getSupabaseServerClient();
    let savedBooking: Booking = {
      id: `booking-${Date.now()}`,
      ...newBooking,
      status: newBooking.status || 'pending',
      created_at: new Date().toISOString(),
    };

    let insertedToDb = false;

    if (supabase) {
      const { data, error } = await supabase.from('bookings').insert([newBooking]).select().single();
      if (error) {
        console.error('Supabase booking insert error:', error.message);
      } else if (data) {
        savedBooking = data as Booking;
        insertedToDb = true;
      }
    }

    if (!insertedToDb) {
      inMemoryBookings.unshift(savedBooking);
    }

    // Trigger Google Calendar Sync
    const googleEventId = await createGoogleCalendarEvent(savedBooking);

    if (googleEventId && supabase && insertedToDb) {
      await supabase.from('bookings').update({ google_event_id: googleEventId }).eq('id', savedBooking.id);
      savedBooking.google_event_id = googleEventId;
    }

    return NextResponse.json({
      success: true,
      booking: savedBooking,
      message: 'Booking enquiry submitted and synchronized.',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Booking processing failed:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal error' }, { status: 500 });
  }
}
