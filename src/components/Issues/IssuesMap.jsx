import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router';
import L from 'leaflet';

// Fix for default marker icon in leaflet not loading correctly with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const IssuesMap = ({ issues }) => {
  // Center map on a default location (e.g., center of standard viewing area) or the first issue
  // Assuming 0,0 if no issues exist. In a real app, you might use the user's current location.
  const centerPosition = issues && issues.length > 0 && issues[0].lat && issues[0].lng
    ? [issues[0].lat, issues[0].lng]
    : [23.8103, 90.4125]; // Default to Dhaka, Bangladesh as an example, adjust as needed.

  const mapIssues = issues ? issues.filter(issue => issue.lat && issue.lng) : [];

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg border border-base-300 relative z-0">
      <MapContainer 
        center={centerPosition} 
        zoom={12} 
        scrollWheelZoom={true} 
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {mapIssues.map((issue) => (
          <Marker 
            key={issue._id} 
            position={[issue.lat, issue.lng]}
          >
            <Popup className="font-['Satoshi']">
              <div className="p-1">
                <img 
                  src={issue.photoURL} 
                  alt={issue.title} 
                  className="w-full h-24 object-cover rounded-md mb-2" 
                />
                <h3 className="font-bold text-base mb-1">{issue.title}</h3>
                <p className="text-xs text-base-content/70 mb-2 truncate max-w-[200px]">{issue.location}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase
                    ${issue.status === 'pending' ? 'bg-warning/20 text-warning' : ''}
                    ${issue.status === 'in-progress' ? 'bg-info/20 text-info' : ''}
                    ${issue.status === 'resolved' ? 'bg-success/20 text-success' : ''}
                  `}>
                    {issue.status}
                  </span>
                  <Link 
                    to={`/issue/${issue._id}`}
                    className="text-primary text-xs font-semibold hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IssuesMap;
