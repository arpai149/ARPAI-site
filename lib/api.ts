export interface LeadFormPayload {
  name: string;
  email: string;
  phone: string;
  vehicle_of_interest: string;
  message?: string;
}

interface ApiOptions {
  backendUrl: string;
  apiKey?: string;
}

const request = async <T>(url: string, body: unknown, apiKey?: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { 'x-api-key': apiKey } : {})
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg = typeof payload?.message === 'string' ? payload.message : `Request failed (${response.status})`;
    throw new Error(msg);
  }

  return payload as T;
};

export const submitLeadFlow = async (payload: LeadFormPayload, options: ApiOptions) => {
  const source = 'website';

  const intake = await request<{ lead: { id?: string }; duplicate?: boolean }>(
    `${options.backendUrl}/api/lead/intake`,
    {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      vehicle: payload.vehicle_of_interest,
      source
    },
    options.apiKey
  );

  const leadId = intake.lead?.id;

  const classify = await request<{ intent: string; urgency: string; buyer_stage: string; confidence: number }>(
    `${options.backendUrl}/api/lead/classify`,
    {
      message: payload.message?.trim() || `Interested in ${payload.vehicle_of_interest}. Please help with availability and next steps.`,
      lead_id: leadId
    },
    options.apiKey
  );

  const respond = await request<{ sms_message: string; email_message: string }>(
    `${options.backendUrl}/api/lead/respond`,
    {
      lead_message: payload.message?.trim() || `Please share details for ${payload.vehicle_of_interest}`,
      vehicle: payload.vehicle_of_interest,
      customer_name: payload.name,
      safe_to_share_pricing: false
    },
    options.apiKey
  );

  const route = leadId
    ? await request<{ assigned_rep: string; conflict_prevented: boolean }>(
      `${options.backendUrl}/api/lead/route`,
      {
        lead_id: leadId,
        intent: classify.intent,
        ai_contact_sent: true,
        human_contact_sent: false
      },
      options.apiKey
    )
    : { assigned_rep: 'Unassigned', conflict_prevented: false };

  console.log('[ARPAI FLOW] intake', intake);
  console.log('[ARPAI FLOW] classify', classify);
  console.log('[ARPAI FLOW] respond', respond);
  console.log('[ARPAI FLOW] route', route);

  return {
    intake,
    classify,
    respond,
    route
  };
};
