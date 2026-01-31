import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapPicker = ({ location, setLocation }) => {
  const styles = {
    map: { height: '100%', width: '100%', borderRadius: '12px' }
  };

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  return (
    <MapContainer 
      center={[location.lat, location.lng]} 
      zoom={15} 
      style={styles.map}
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
  );
};

export default MapPicker;