import { useState, useEffect } from 'react';
import { toast } from 'sonner';

const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  Stockholm: { lat: 59.3293, lng: 18.0686 },
  Göteborg: { lat: 57.7089, lng: 11.9746 },
  Malmö: { lat: 55.6050, lng: 13.0038 },
};

function getCityFromCoordinates(lat: number, lng: number): string {
  let closestCity = 'Stockholm';
  let minDistance = Infinity;

  for (const [city, coords] of Object.entries(CITY_COORDINATES)) {
    const distance = Math.sqrt(
      Math.pow(lat - coords.lat, 2) + Math.pow(lng - coords.lng, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestCity = city;
    }
  }

  return closestCity;
}

export function useLocation() {
  const [userCity, setUserCity] = useState<string>('Stockholm');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setUserCity('Stockholm');
      setIsLoadingLocation(false);
      setLocationError('Geolokalisering stöds inte i din webbläsare');
      setHasPermission(false);
      toast.info('Använder Stockholm som standardplats');
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const detectedCity = getCityFromCoordinates(latitude, longitude);
        setUserCity(detectedCity);
        setIsLoadingLocation(false);
        setHasPermission(true);
        setLocationError(null);
        toast.success(`Plats upptäckt: ${detectedCity}`);
      },
      (error) => {
        let errorMessage = 'Kunde inte hämta din plats';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Platstillstånd nekades';
            setHasPermission(false);
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Platsinformation är inte tillgänglig';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tidsgräns för platsförfrågan överskreds';
            break;
        }
        
        setUserCity('Stockholm');
        setIsLoadingLocation(false);
        setLocationError(errorMessage);
        setHasPermission(false);
        toast.info('Använder Stockholm som standardplats');
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // Cache position for 5 minutes
      }
    );
  }, []);

  return {
    userCity,
    isLoadingLocation,
    locationError,
    hasPermission,
  };
}
