import { useEffect, useState } from 'react';
import { socket } from '../socket';

export function Live_Location() {
    const [locations, setLocations] = useState({}); // { socketId: { latitude, longitude } }

    useEffect(() => {
        // Emit this browser's own location
        let watchId;
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    socket.emit('send-location', { latitude, longitude });
                },
                (err) => console.log(err),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        }

        // Listen for everyone's broadcasted locations
        const handleRec = (data) => {
            setLocations((prev) => ({
                ...prev,
                [data.id]: { latitude: data.latitude, longitude: data.longitude }
            }));
        };
        socket.on('rec', handleRec);

        const handleUserGone = (id) => {
            setLocations((prev) => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });
        };
        socket.on('user-gone', handleUserGone);

        // Cleanup: stop watching GPS and remove listeners on unmount
        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
            socket.off('rec', handleRec);
            socket.off('user-gone', handleUserGone);
        };
    }, []);

    return locations[socket.id] || { lat: 0, lng: 0 }; // e.g. { "abc123": { latitude: 26.9, longitude: 75.8 }, ... }
}