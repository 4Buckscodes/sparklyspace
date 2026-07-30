import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { generateICalFeed } from '@/lib/calendar/ical';
import { Booking } from '@/lib/types/booking';

export async function GET() {
  const supabase = getSupabaseServerClient();
  let bookings: Booking[] = [];

  if (supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .neq('status', 'cancelled')
      .order('scheduled_start', { ascending: true });

    if (!error && data) {
      bookings = data as Booking[];
    }
  }

  const icalContent = generateICalFeed(bookings);

  return new NextResponse(icalContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'inline; filename="sparkly-space-schedule.ics"',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
