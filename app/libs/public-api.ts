const serverApiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:4000";

export const publicApiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export async function getPublicApiData<T>(path: string): Promise<T> {
  const response = await fetch(`${serverApiBaseUrl}${path}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Public API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
