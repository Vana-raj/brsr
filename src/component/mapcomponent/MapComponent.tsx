import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.scss';

interface MapProps {
  location: string;
}
const MapComponent: React.FC<MapProps> = ({ location }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null | any>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [51.505, -0.09],
        zoom: 13,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      const address = location;
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
        .then(response => response.json())
        .then(data => {
          if (data?.[0]) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            mapInstance?.current.setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(mapInstance.current)
              .bindPopup(`<b>${address}</b>`)
              .openPopup();
          }
        })
        .catch(error => {
          console.error("Error geocoding the address:", error);
        });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [location]);

  return (
    <div ref={mapRef} className='map-img'></div>
  );
};

export default MapComponent;
