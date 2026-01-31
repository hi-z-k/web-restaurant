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
    wrapper: { 
      position: 'relative', 
      height: '100%', 
      width: '100%' 
    },
    map: { 
      height: '100%', 
      width: '100%', 
      borderRadius: '12px' 
    },
    coordsBox: {
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      zIndex: 1000,
      background: 'rgba(10, 10, 26, 0.85)',
      padding: '10px 15px',
      borderRadius: '8px',
      border: '1px solid var(--main-color)',
      color: '#fff',
      fontSize: '0.85rem',
      fontFamily: 'monospace',
      backdropFilter: 'blur(5px)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
      pointerEvents: 'none'
    },
    label: {
      color: 'var(--main-color)',
      marginRight: '5px',
      fontWeight: 'bold'
    }
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
    <div style={styles.wrapper}>
      <div style={styles.coordsBox}>
        <div><span style={styles.label}>LAT:</span> {location.lat.toFixed(6)}</div>
        <div><span style={styles.label}>LNG:</span> {location.lng.toFixed(6)}</div>
      </div>

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
    </div>
  );
};

export default MapPicker;