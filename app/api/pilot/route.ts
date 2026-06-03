import { NextResponse } from 'next/server';

type PilotPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  role?: string;
  industry?: string;
  biggestBottleneck?: string;
};

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function scoreLead(payload: PilotPayload) {
  let score = 30;
  if (clean(payload.phone)) score += 10;
  if (clean(payload.role)) score += 10;
  if (clean(payload.industry)) score += 10;
  if (clean(payload.biggestBottleneck).length > 24) score += 25;
  const email = clean(payload.email).toLowerCase();
  if (email && !email.includes('@gmail.com') && !email.includes('@yahoo.com') && !email.includes('@icloud.com')) score += 15;
  return Math.min(score, 100);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as PilotPayload;
    const name = clean(payload.name);
    const company = clean(payload.company);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const role = clean(payload.role);
    const industry = clean(payload.industry) || 'Automotive';
    const biggestBottleneck = clean(payload.biggestBottleneck);

    if (!name || !company || !email || !email.includes('@')) {
      return NextResponse.json({ error: 'Name, company, and a valid email are required.' }, { status: 400 });
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    const lead = {
      name,
      company,
      email,
      phone,
      industry,
      biggest_bottleneck: biggestBottleneck,
      source: 'arpai.co/dealership-pilot',
      status: 'new',
      score: scoreLead({ ...payload, name, company, email, phone, role, industry, biggestBottleneck }),
      metadata: {
        role,
        user_agent: request.headers.get('user-agent'),
        referrer: request.headers.get('referer'),
        captured_at: new Date().toISOString()
      }
    };

    if (supabaseUrl && serviceRoleKey) {
      const response = await fetch(`${supabaseUrl}/rest/v1/pilot_leads`, {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify(lead)
      });

      if (!response.ok) {
        const detail = await response.text();
        console.error('Pilot lead insert failed:', detail);
        return NextResponse.json({ error: 'Lead capture is temporarily unavailable.' }, { status: 502 });
      }
    } else {
      console.warn('Pilot lead received without Supabase server env configured:', lead);
    }

    return NextResponse.json({ ok: true, score: lead.score });
  } catch (error) {
    console.error('Pilot intake error:', error);
    return NextResponse.json({ error: 'Unexpected pilot intake error.' }, { status: 500 });
  }
}
