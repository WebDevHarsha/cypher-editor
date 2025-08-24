export const MCP_BASE_URL = process.env.MCP_BASE_URL!;
export const DESCOPE_AGENT_BEARER = process.env.DESCOPE_AGENT_BEARER!;
if (!MCP_BASE_URL || !DESCOPE_AGENT_BEARER) {
  // Fail fast in dev builds
  console.warn(
    "[cypher-editor] Missing MCP_BASE_URL or DESCOPE_AGENT_BEARER in env."
  );
}
