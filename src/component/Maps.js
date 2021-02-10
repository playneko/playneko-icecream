import React from 'react'
import GoogleMapReact from 'google-map-react';
import firebase from "firebase";

// 컴포넌트
// 공통 처리
import IsEmpty from "./common/IsEmpty";
// Footer
import Footer from "./Footer";
// 마커
import Marker from "./Marker";
// 좌표 취득
import Geolocation from "./Geolocation";

const UpdateUserInfo = (uid, authInfo, setUpdate) => {
    let db = firebase.database();
    let ref = db.ref("/users").child(uid);
    ref.set(authInfo);
    setUpdate(false);
}

// 좌표값 비교후 갱신
const DiffLocation = (myLocation, account, update, setAccount, setUpdate) => {
    if (update === false && !IsEmpty(myLocation.lat) && !IsEmpty(myLocation.lng) 
        && myLocation.lat > 0 && myLocation.lng > 0 && (account.lat !== myLocation.lat || account.lng !== myLocation.lng)) {
        setAccount({
            ...account,
            lat: myLocation.lat,
            lng: myLocation.lng
        });
        setUpdate(true);
    }

    if (update === true && !IsEmpty(account.lat) && !IsEmpty(account.lng)
        && (account.lat === myLocation.lat && account.lng === myLocation.lng)) {
        // 좌표 갱신처리
        UpdateUserInfo(account.uid, account, setUpdate);
    }
}

const Maps = (props) => {
    const account = props.children.account;
    const setAccount = props.children.setAccount;
    // 맵 데이터
    const [myLocation, setMyLocation] = React.useState({
        lat: IsEmpty(account.lat) ? 0 : account.lat,
        lng: IsEmpty(account.lng) ? 0 : account.lng
    });
    // 좌표 갱신
    const [update, setUpdate] = React.useState(false);
    // 좌표 취득 플래그
    const [gpsFlg, setGpsFlg] = React.useState(myLocation.lat < 1 || myLocation.lng < 1 ? 1 : 0);

    if (gpsFlg === 1) {
        // 좌표 계속 취득
        Geolocation(setMyLocation);
    } else if (gpsFlg === 9) {
        // 현재 좌표 이동
        Geolocation(setMyLocation);
        setGpsFlg(0);
    }

    // 현재 좌표 갱신
    DiffLocation(myLocation, account, update, setAccount, setUpdate);

    return (
        <div style={{ height: 'calc(100vh - 13vh)', width: '100%' }}>
            <GoogleMapReact
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    fullscreenControl: false
                }}
                defaultZoom={16}
                defaultCenter={myLocation}
                center={[myLocation.lat, myLocation.lng]}
                bootstrapURLKeys={{ key: 'AIzaSyDBa3kj6nwgmiUdCCNA1fhWHRttnpFTpww' }}
            >
                <Marker
                    lat={myLocation.lat}
                    lng={myLocation.lng}
                    idx="0"
                    name={account.name}
                    avatar={account.image}
                />
                <Marker
                    lat="35.7023391"
                    lng="139.8187216"
                    idx="1"
                    name="MyMarkertesttesttesttest"
                    avatar={account.image}
                />
                <Marker
                    lat="35.7253048"
                    lng="139.7378776"
                    idx="2"
                    name="MyMarkertesttesttesttest"
                    avatar={account.image}
                />
            </GoogleMapReact>
            <Footer
                account={account}
                gpsFlg={gpsFlg}
                setGpsFlg={setGpsFlg}
            />
        </div>
    );
}

export default Maps;