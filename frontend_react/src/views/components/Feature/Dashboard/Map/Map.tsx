

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString(),
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString(),
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString(),
});

export const Map = () => {
    const [position, setPosition] = useState<[number, number]>([51.505, -0.09]); // Default position
    const [, setError] = useState<string | null>(null); // Error state
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPosition([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            setError(error.message || "An unknown error occurred.");
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    }, []);
  
    return (
      <MapContainer center={[position[0], position[1]]} zoom={13}  className="map-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[position[0], position[1]]}>
          <Popup>
            You are here: {position[0]}, {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
    );
  };
  