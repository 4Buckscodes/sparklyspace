import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { updateGoogleCalendarEvent, deleteGoogleCalendarEvent } from '@/lib/calendar/google';
import { inMemoryBookings } from '../route';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supabase = getSupabaseServerClient();

    // Check in-memory first
    const memIndex = inMemoryBookings.findIndex((b) => b.id === id);
    if (memIndex !== -1) {
      inMemoryBookings[memIndex] = {
        ...inMemoryBookings[memIndex],
        ...body,
        updated_at: new Date().toISOString(),
      };
      const updated = inMemoryBookings[memIndex];
      if (updated.google_event_id) {
        if (body.status === 'cancelled') {
          await deleteGoogleCalendarEvent(updated.google_event_id);
        } else {
          await updateGoogleCalendarEvent(updated.google_event_id, updated);
        }
      }
      return NextResponse.json({ success: true, booking: updated });
    }

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
