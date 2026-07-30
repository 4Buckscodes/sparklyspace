import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { updateGoogleCalendarEvent, deleteGoogleCalendarEvent } from '@/lib/calendar/google';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return NextResponse.json({ success: true, message: 'Mock update' });
    }

    const { data: existingBooking } = await supabase.from('bookings').select('*').eq('id', id).single();

    if (!existingBooking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    const { data: updatedBooking, error } = await supabase
      .from('bookings')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (existingBooking.google_event_id) {
      if (body.status === 'cancelled') {
        await deleteGoogleCalendarEvent(existingBooking.google_event_id);
      } else {
        await updateGoogleCalendarEvent(existingBooking.google_event_id, updatedBooking);
      }
    }

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
