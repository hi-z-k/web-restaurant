import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import '../styles/MapPicker.css';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapPicker = ({ location, setLocation }) => {
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <div className="map-picker-wrapper">
      <div className="coords-overlay">
        <div><span className="coords-label">LAT:</span> {location.lat.toFixed(6)}</div>
        <div><span className="coords-label">LNG:</span> {location.lng.toFixed(6)}</div>
      </div>

      <MapContainer 
        center={[location.lat, location.lng]} 
        zoom={15} 
        className="map-picker-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents />
        <Marker 
          position={[location.lat, location.lng]} 
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const coords = e.target.getLatLng();
              setLocation({ lat: coords.lat, lng: coords.lng });
            }
          }}
        />
      </MapContainer>
    </div>
  );
};

export default MapPicker;