// lib/location.ts

// Calculate distance between two points (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Get location from browser (client-side)
export async function getCurrentLocation(): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        resolve(null);
      }
    );
  });
}

// Algerian cities with coordinates
export const ALGERIAN_CITIES = [
  { name: 'Algiers', state: 'Algiers', latitude: 36.7538, longitude: 3.0588 },
  { name: 'Oran', state: 'Oran', latitude: 35.6969, longitude: -0.6331 },
  { name: 'Constantine', state: 'Constantine', latitude: 36.3650, longitude: 6.6147 },
  { name: 'Annaba', state: 'Annaba', latitude: 36.9000, longitude: 7.7667 },
  { name: 'Blida', state: 'Blida', latitude: 36.4811, longitude: 2.8278 },
  { name: 'Batna', state: 'Batna', latitude: 35.5559, longitude: 6.1743 },
  { name: 'Sétif', state: 'Sétif', latitude: 36.1905, longitude: 5.4103 },
  { name: 'Sidi Bel Abbès', state: 'Sidi Bel Abbès', latitude: 35.1906, longitude: -0.6389 },
  { name: 'Biskra', state: 'Biskra', latitude: 34.8514, longitude: 5.7248 },
  { name: 'Tébessa', state: 'Tébessa', latitude: 35.4042, longitude: 8.1242 },
  { name: 'Tiaret', state: 'Tiaret', latitude: 35.3711, longitude: 1.3228 },
  { name: 'Béjaïa', state: 'Béjaïa', latitude: 36.7511, longitude: 5.0564 },
  { name: 'Tlemcen', state: 'Tlemcen', latitude: 34.8778, longitude: -1.3153 },
  { name: 'Béchar', state: 'Béchar', latitude: 31.6239, longitude: -2.2162 },
  { name: 'Mostaganem', state: 'Mostaganem', latitude: 35.9378, longitude: 0.0890 },
];