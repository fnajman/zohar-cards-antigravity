const XANO_BONUS_API_URL = "https://api.najman.app/api:ST5QxeS-";

export interface CouponResponse {
  id: number;
  created_at: number;
  expiration_date: string;
  campaign_name: string;
  coupon_code: string;
  credit: number;
}

export async function checkCoupon(authToken: string, code: string): Promise<CouponResponse | null> {
  const res = await fetch(`${XANO_BONUS_API_URL}/bonus/coupon/${encodeURIComponent(code)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    }
  });

  if (!res.ok) {
    // 404 or 400 means invalid or not found
    return null;
  }

  return await res.json();
}
