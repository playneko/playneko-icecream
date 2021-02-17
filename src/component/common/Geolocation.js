const Geolocation = (setMyLocation) => {
    navigator.geolocation.getCurrentPosition(function(position) {
        setMyLocation({
            lat: Math.round(position.coords.latitude * 10000000) / 10000000.0,
            lng: Math.round(position.coords.longitude * 10000000) / 10000000.0,
            peopleLat: 0,
            peopleLng: 0
        });
    });
};

export default Geolocation;