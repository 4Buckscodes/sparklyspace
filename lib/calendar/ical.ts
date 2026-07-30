import ical, { ICalCalendarMethod } from 'ical-generator';
import { Booking } from '@/lib/types/booking';

export function generateICalFeed(bookings: Booking[]): string {
  const calendar = ical({
    name: 'Sparkly Space Cleaning Schedule',
    prodId: '//Sparkly Space//Cleaning Services Schedule//EN',
    timezone: 'Europe/London',
    method: ICalCalendarMethod.PUBLISH,
  });

  bookings.forEach((booking) => {
    if (booking.status === 'cancelled') return;

    calendar.createEvent({
      id: booking.id,
      start: new Date(booking.scheduled_start),
      end: new Date(booking.scheduled_end),
      summary: `Sparkly Space: ${booking.service_type} - ${booking.customer_name}`,
      description: `Reference: ${booking.reference}\nCustomer: ${booking.customer_name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nStatus: ${booking.status}\nNotes: ${booking.notes || 'None'}`,
      location: `${booking.address ? booking.address + ', ' : ''}${booking.postcode}`,
      url: 'https://sparklyspace.co.uk',
      organizer: {
        name: 'Sparkly Space Cleaning Services',
        email: 'info@sparklyspace.co.uk',
      },
    });
  });

  return calendar.toString();
}
