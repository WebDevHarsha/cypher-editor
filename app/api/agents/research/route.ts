import { NextRequest, NextResponse } from "next/server";
import { MCP_BASE_URL, DESCOPE_AGENT_BEARER } from "@/lib/config";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic") || "technology";

  const upstream = `${MCP_BASE_URL}/api/research?topic=${encodeURIComponent(
    topic
  )}`;

  const res = await fetch(upstream, {
    headers: { Authorization: `Bearer ${DESCOPE_AGENT_BEARER}` }
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
