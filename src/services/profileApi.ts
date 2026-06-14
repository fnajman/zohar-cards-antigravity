const XANO_AUTH_URL = "https://api.najman.app/api:Iz7gaLUa";

export interface PersonalInfo {
  gender?: string;
  birthDate?: string;
  childrenCount?: number | string;
  profession?: string;
  maritalStatus?: string;
  freeText?: string;
}

export interface UserProfileParams {
  appLanguage: string;
  drawStyle: string;
  hebrewFont: string;
  aiModel?: string;
}

export interface UserProfileRecord {
  id: number;
  user_id: number;
  param: UserProfileParams | null;
  perso: PersonalInfo | null;
  bonuscode: string[] | null;
  credit?: number;
}

export async function fetchProfile(authToken: string, userId: number): Promise<UserProfileRecord | null> {
  const res = await fetch(`${XANO_AUTH_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    }
  });

  if (!res.ok) {
    console.error("Failed to fetch profile", await res.text());
    return null;
  }

  const data = await res.json();
  if (Array.isArray(data) && data.length > 0) {
    const p = data.find((d: any) => d.user_id === userId);
    return p || null;
  }
  return null;
}

export async function createProfile(authToken: string, userId: number, param: UserProfileParams, bonuscode?: string[], perso?: PersonalInfo, credit?: number): Promise<UserProfileRecord | null> {
  const res = await fetch(`${XANO_AUTH_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    },
    body: JSON.stringify({ user_id: userId, param, bonuscode: bonuscode || [], perso: perso || {}, credit })
  });

  if (!res.ok) {
    console.error("Failed to create profile", await res.text());
    return null;
  }

  return await res.json();
}

export async function updateProfile(authToken: string, profileId: number, userId: number, param: UserProfileParams, bonuscode?: string[], perso?: PersonalInfo, credit?: number): Promise<UserProfileRecord | null> {
  const res = await fetch(`${XANO_AUTH_URL}/profile/${profileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    },
    body: JSON.stringify({ user_id: userId, param, bonuscode, perso, credit })
  });

  if (!res.ok) {
    console.error("Failed to update profile", await res.text());
    return null;
  }

  return await res.json();
}
