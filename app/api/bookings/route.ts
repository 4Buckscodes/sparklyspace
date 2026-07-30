import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { createGoogleCalendarEvent } from '@/lib/calendar/google';
import { Booking, BookingInsert } from '@/lib/types/booking';

export async function GET(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');

  if (!supabase) {
    return NextResponse.json({ success: true, bookings: [], mock: true }, { status: 200 });
  }

  let query = supabase.from('bookings').select('*').order('scheduled_start', { ascending: true });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, bookings: data }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const reference = body.reference || `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    const scheduled_start = body.scheduled_start || new Date().toISOString();
    const scheduled_end = body.scheduled_end || new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

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
      id: `mock-${Date.now()}`,
      ...newBooking,
      status: newBooking.status || 'pending',
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase.from('bookings').insert([newBooking]).select().single();
      if (error) {
        console.error('Supabase booking insert error:', error);
      } else if (data) {
        savedBooking = data as Booking;
      }
    }

    // Trigger Google Calendar Sync
    const googleEventId = await createGoogleCalendarEvent(savedBooking);

    if (googleEventId && supabase) {
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
