import { Card } from '#components/ui/card.jsx';
import { Map, MapControls } from '#components/ui/map.jsx';
import React from 'react';
function App() {
  return (
    <div className="App w-100 h-100">
       <Card className="h-80 p-0 overflow-hidden">
      <Map center={[-74.006, 40.7128]} zoom={11}>
        <MapControls />
      </Map>
    </Card>
    </div>
  );
}

export default App;