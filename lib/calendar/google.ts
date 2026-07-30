import { google } from 'googleapis';
import { Booking } from '@/lib/types/booking';

const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

export const isGoogleCalendarConfigured = (): boolean => {
  return Boolean(serviceAccountEmail && privateKey);
};

function getGoogleCalendarClient() {
  if (!isGoogleCalendarConfigured()) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

export async function createGoogleCalendarEvent(booking: Booking): Promise<string | null> {
  const calendar = getGoogleCalendarClient();
  if (!calendar) {
    console.info(`[Google Calendar Sync Skipped] Environment credentials not set. Event for ${booking.reference} would be created.`);
    return null;
  }

  try {
    const response = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Sparkly Space Clean: ${booking.service_type} - ${booking.customer_name}`,
        description: `Reference: ${booking.reference}\nCustomer: ${booking.customer_name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nPostcode: ${booking.postcode}\nAddress: ${booking.address || 'N/A'}\nService: ${booking.service_type}\nNotes: ${booking.notes || 'None'}`,
        location: `${booking.address ? booking.address + ', ' : ''}${booking.postcode}`,
        start: {
          dateTime: new Date(booking.scheduled_start).toISOString(),
          timeZone: 'Europe/London',
        },
        end: {
          dateTime: new Date(booking.scheduled_end).toISOString(),
          timeZone: 'Europe/London',
        },
        status: booking.status === 'cancelled' ? 'cancelled' : 'confirmed',
      },
    });

    return response.data.id || null;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    return null;
  }
}

export async function updateGoogleCalendarEvent(eventId: string, booking: Partial<Booking>): Promise<boolean> {
  const calendar = getGoogleCalendarClient();
  if (!calendar) {
    return false;
  }

  try {
    await calendar.events.patch({
      calendarId,
      eventId,
      requestBody: {
        ...(booking.customer_name && { summary: `Sparkly Space Clean: ${booking.service_type || ''} - ${booking.customer_name}` }),
        ...(booking.scheduled_start && {
          start: { dateTime: new Date(booking.scheduled_start).toISOString(), timeZone: 'Europe/London' },
        }),
        ...(booking.scheduled_end && {
          end: { dateTime: new Date(booking.scheduled_end).toISOString(), timeZone: 'Europe/London' },
        }),
        ...(booking.status && { status: booking.status === 'cancelled' ? 'cancelled' : 'confirmed' }),
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating Google Calendar event:', error);
    return false;
  }
}

export async function deleteGoogleCalendarEvent(eventId: string): Promise<boolean> {
  const calendar = getGoogleCalendarClient();
  if (!calendar) {
    return false;
  }

  try {
    await calendar.events.delete({
      calendarId,
      eventId,
    });
    return true;
  } catch (error) {
    console.error('Error deleting Google Calendar event:', error);
    return false;
  }
}
