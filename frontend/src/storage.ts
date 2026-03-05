const AGENTS_KEY = "ap_agents";
const API_KEY_STORAGE = "ap_apikey";

export interface AgentRecord {
  id: string;
  name: string;
  description: string;
  api_key: string;
  created_at: string;
}

function safeParseAgents(raw: string | null): AgentRecord[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is AgentRecord =>
        x &&
        typeof x === "object" &&
        typeof (x as AgentRecord).id === "string" &&
        typeof (x as AgentRecord).name === "string" &&
        typeof (x as AgentRecord).description === "string" &&
        typeof (x as AgentRecord).api_key === "string" &&
        typeof (x as AgentRecord).created_at === "string"
    );
  } catch {
    return [];
  }
}

export function getAgents(): AgentRecord[] {
  if (typeof window === "undefined") return [];
  return safeParseAgents(window.localStorage.getItem(AGENTS_KEY));
}

export function saveAgents(agents: AgentRecord[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(AGENTS_KEY, JSON.stringify(agents));
}

export function addAgent(agent: AgentRecord): void {
  const agents = getAgents();
  agents.unshift(agent);
  saveAgents(agents);
}

export function getStoredApiKey(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(API_KEY_STORAGE) ?? "";
}

export function setStoredApiKey(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(API_KEY_STORAGE, key);
}

export function generateLocalApiKey(): string {
  return `ap_local_${Math.random().toString(36).slice(2, 18)}${Date.now().toString(36)}`;
}
