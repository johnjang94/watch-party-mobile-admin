const apiBaseUrl = process.env.EXPO_PUBLIC_CONTROL_URL ?? "http://127.0.0.1:3010";

async function getJson(path) {
  const response = await fetch(`${apiBaseUrl}${path}`, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Request failed.");
  }
  return data;
}

export async function authenticateAdmin(firstName, phoneNumber) {
  const response = await fetch(`${apiBaseUrl}/api/admin/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, phoneNumber }),
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.error ?? "Authentication failed.");
  }

  return data.session;
}

export async function fetchUsers(days) {
  const suffix = Number.isFinite(days) ? `?days=${days}` : "";
  const data = await getJson(`/api/admin/users${suffix}`);
  return data.users ?? [];
}

export async function fetchInquiries() {
  const data = await getJson("/api/admin/inquiries");
  return data.inquiries ?? [];
}
