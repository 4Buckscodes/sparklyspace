-- Supabase Migration: Create bookings table for Sparkly Space

CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    address TEXT,
    service_type VARCHAR(100) NOT NULL,
    property_details JSONB DEFAULT '{}'::jsonb,
    scheduled_start TIMESTAMPTZ NOT NULL,
    scheduled_end TIMESTAMPTZ NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, confirmed, completed, cancelled
    notes TEXT,
    google_event_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for date queries and status filtering
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled_start ON public.bookings(scheduled_start);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON public.bookings(reference);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public service role or anon access to insert booking enquiries
CREATE POLICY "Allow public booking creation" ON public.bookings
    FOR INSERT TO anon, authenticated
    WITH CHECK (true);

-- Allow authenticated users / service role full read/write access
CREATE POLICY "Allow service role full access" ON public.bookings
    FOR ALL TO service_role
    USING (true);
