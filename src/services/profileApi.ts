const XANO_AUTH_URL = "https://api.najman.app/api:Iz7gaLUa";

export interface UserProfileParams {
  appLanguage: string;
  drawStyle: string;
  hebrewFont: string;
}

export interface UserProfileRecord {
  id: number;
  user_id: number;
  param: UserProfileParams | null;
  perso: any;
}

export async function fetchProfile(authToken: string): Promise<UserProfileRecord | null> {
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
    return data[0];
  }
  return null;
}

export async function createProfile(authToken: string, userId: number, param: UserProfileParams): Promise<UserProfileRecord | null> {
  const res = await fetch(`${XANO_AUTH_URL}/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    },
    body: JSON.stringify({ user_id: userId, param })
  });

  if (!res.ok) {
    console.error("Failed to create profile", await res.text());
    return null;
  }

  return await res.json();
}

export async function updateProfile(authToken: string, profileId: number, param: UserProfileParams): Promise<UserProfileRecord | null> {
  // Let's try PATCH first, then PUT if it fails or if PATCH is standard. The API spec said both are available.
  const res = await fetch(`${XANO_AUTH_URL}/profile/${profileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    },
    body: JSON.stringify({ param })
  });

  if (!res.ok) {
    console.error("Failed to update profile", await res.text());
    return null;
  }

  return await res.json();
}
