import { NextRequest, NextResponse } from "next/server";
import { MCP_BASE_URL, DESCOPE_AGENT_BEARER } from "@/lib/config";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${MCP_BASE_URL}/api/creative`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DESCOPE_AGENT_BEARER}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
