const XANO_URL = "https://api.najman.app/api:hyEJD2He";

export async function createRemoteDraw(
  token: string,
  user_id: number,
  profile_id: number,
  combination_id: number,
  aiModel: string
): Promise<number | null> {
  try {
    const payload = {
      user_id,
      profile_id,
      combination_id,
      llm_history: [
        {
          role: "system",
          content: `Model used: ${aiModel}`
        }
      ]
    };

    const res = await fetch(`${XANO_URL}/draw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error("Failed to create remote draw:", await res.text());
      return null;
    }

    const data = await res.json();
    return data.id;
  } catch (error) {
    console.error("Error creating remote draw:", error);
    return null;
  }
}

export async function updateDrawHistory(
  token: string,
  draw_id: number,
  user_id: number,
  profile_id: number,
  llm_history: any[]
): Promise<boolean> {
  try {
    const payload = {
      user_id,
      profile_id,
      llm_history
    };

    const res = await fetch(`${XANO_URL}/draw/${draw_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      console.error("Failed to update remote draw history:", await res.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error updating remote draw history:", error);
    return false;
  }
}
