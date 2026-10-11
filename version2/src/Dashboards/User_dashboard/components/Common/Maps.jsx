import { Card } from '@/components/ui/card.jsx';
import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from '@/components/ui/map.jsx';
import React from 'react';
import { MapPin } from 'lucide-react';
import { Live_Location } from '@/hooks/Live_Location.js';
function Maps() {
  const location = {
    lng: 75.7873,
    lat: 26.9124
  };
  return (
    <div className="App">
      <Card className="h-80 p-0 overflow-hidden rounded-t-none rounded-b-3xl">
        <Map center={[location.lng, location.lat]} zoom={11}>
          <MapControls
            position='top-right'
            showLocate
            showCompass
            showZoom={false}
            showFullscreen />
          <MapMarker
            longitude={location.lng}
            latitude={location.lat}
          >
            <MarkerContent>
              <div className="" >
                <MapPin size={30} fill='green' color='white' />
              </div>
            </MarkerContent>

            <MarkerPopup>
              <div>
                <p className="font-medium">
                  Test Location
                </p>

                <p className="text-sm text-muted-foreground">
                  {location.lat}, {location.lng}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        </Map>
      </Card>
    </div>
  );
}

export default Maps;