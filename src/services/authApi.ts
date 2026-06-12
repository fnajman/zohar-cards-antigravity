import { UserProfile } from "@/data/types";

const XANO_AUTH_URL = "https://api.najman.app/api:Iz7gaLUa";

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${XANO_AUTH_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Invalid credentials");
  }

  const data = await res.json();
  return data.authToken;
}

export async function signup(name: string, email: string, password: string): Promise<string> {
  const res = await fetch(`${XANO_AUTH_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to create account");
  }

  const data = await res.json();
  return data.authToken;
}

export async function getMe(authToken: string): Promise<UserProfile> {
  const res = await fetch(`${XANO_AUTH_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    }
  });

  if (!res.ok) {
    throw new Error("Invalid token");
  }

  const data = await res.json();
  return data;
}
