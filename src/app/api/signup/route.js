import { NextResponse } from "next/server";

const DEFAULT_SIGNUP_URL = "https://bwbsxgjvuxuedejxusnv.supabase.co/functions/v1/marketing-crm-signup";
const DEFAULT_WEBHOOK_URL = "https://bwbsxgjvuxuedejxusnv.supabase.co/functions/v1/website-lead-capture";

const SIGNUP_URL = process.env.FISHIN_LEADS_MARKETING_SIGNUP_URL || DEFAULT_SIGNUP_URL;
const WEBHOOK_URL = process.env.FISHIN_LEADS_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;

function normalizeValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeIntegration(integration) {
  return {
    name: normalizeValue(integration?.name) || "Website Form",
    source_label: normalizeValue(integration?.source_label) || "Website",
    default_status: normalizeValue(integration?.default_status) || "New",
  };
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const signupPayload = {
    first_name: normalizeValue(payload.first_name),
    last_name: normalizeValue(payload.last_name),
    phone: normalizeValue(payload.phone),
    company_name: normalizeValue(payload.company_name),
    industry: normalizeValue(payload.industry),
    company_size: normalizeValue(payload.company_size),
    website: normalizeValue(payload.website),
    tier: normalizeValue(payload.tier),
    email: normalizeValue(payload.email),
    password: normalizeValue(payload.password),
    integration: normalizeIntegration(payload.integration),
  };

  const requiredFields = [
    "first_name",
    "last_name",
    "phone",
    "company_name",
    "industry",
    "company_size",
    "tier",
    "email",
    "password",
  ];

  const missingFields = requiredFields.filter((key) => !signupPayload[key]);

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 },
    );
  }

  try {
    const upstreamResponse = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupPayload),
      cache: "no-store",
    });

    const rawResponseBody = await upstreamResponse.text();
    let upstreamJson = null;

    try {
      upstreamJson = rawResponseBody ? JSON.parse(rawResponseBody) : null;
    } catch {
      upstreamJson = null;
    }

    if (!upstreamResponse.ok) {
      return NextResponse.json(
        {
          error:
            upstreamJson?.message ||
            upstreamJson?.error ||
            rawResponseBody ||
            `Upstream request failed with status ${upstreamResponse.status}.`,
        },
        { status: upstreamResponse.status || 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      user_id: upstreamJson?.user_id || "",
      integration_id: upstreamJson?.integration_id || "",
      api_key: upstreamJson?.api_key || "",
      webhook_url: upstreamJson?.webhook_url || WEBHOOK_URL,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach CRM signup service." },
      { status: 502 },
    );
  }
}
