import React from 'react'
import GoogleMapReact from 'google-map-react';
import CssBaseline from '@material-ui/core/CssBaseline';

// 컴포넌트
// 공통 처리
import IsEmpty from "../common/IsEmpty";
// 좌표 취득
import Geolocation from "../common/Geolocation";
// Header
import Header from "../Header";
// Footer
import Footer from "../Footer";
// 마커
import MarkerUser from "../marker/MarkerUser";
// 흔적
import MarkerTracking from "../marker/MarkerTracking";
// 흔적 보기
import TrackingView from "../tracking/TrackingView";
// 모델
import UpdateUserInfoFire from "../../models/UpdateUserInfoFire";
import TrackingGetModel from "../../models/TrackingGetModel";

// 좌표값 비교후 갱신
const DiffLocation = (myLocation, account, update, setAccount, setUpdate) => {
    if (update === false && !IsEmpty(myLocation.lat) && !IsEmpty(myLocation.lng) 
        && myLocation.lat > 0 && myLocation.lng > 0 && (account.lat !== myLocation.lat || account.lng !== myLocation.lng)) {
        setAccount({
            ...account,
            lat: myLocation.lat,
            lng: myLocation.lng
        });
    }

    if (update === true && !IsEmpty(account.lat) && !IsEmpty(account.lng)
        && (account.lat === myLocation.lat && account.lng === myLocation.lng)
        && (account.lat > 0 && account.lng > 0)) {
        // 좌표 갱신처리
        UpdateUserInfoFire(account, setUpdate);
    }
}

const Maps = (props) => {
    const { account, setAccount, peopleDataArray } = props;
    // 맵 데이터
    const [myLocation, setMyLocation] = React.useState({
        lat: IsEmpty(account.lat) ? 0 : account.lat,
        lng: IsEmpty(account.lng) ? 0 : account.lng
    });
    // 친구 좌표 데이터
    const [peopleLocation, setPeopleLocation] = React.useState({lat: 0, lng: 0});
    // 에러
    const [error, setError] = React.useState(null);
    // 로딩
    const [loading, setLoading] = React.useState(true);
    // 흔적 데이터
    const [tracking, setTracking] = React.useState(null);
    // 좌표 갱신
    const [update, setUpdate] = React.useState(false);
    // 친구 좌표로 이동
    const [updatePeople, setUpdatePeople] = React.useState(false);
    // 좌표 취득 플래그
    const [gpsFlg, setGpsFlg] = React.useState(myLocation.lat < 1 || myLocation.lng < 1 ? 1 : 0);
    // 흔적 보기
    const [trackingView, setTrackingView] = React.useState(false);
    // 흔적 데이터
    const [trackingData, setTrackingData] = React.useState(null);

    if (gpsFlg === 1) {
        // 좌표 계속 취득
        Geolocation(setMyLocation);
    } else if (gpsFlg === 9) {
        // 현재 좌표 이동
        Geolocation(setMyLocation);
        setUpdatePeople(false);
        setUpdate(true);
        setGpsFlg(0);
    }

    // 흔적 데이터 취득
    TrackingGetModel({update, myLocation, setTracking, setError, setLoading});

    // 현재 좌표 갱신
    DiffLocation(myLocation, account, update, setAccount, setUpdate);

    // 흔적 데이터 표시
    const markerTracking = !IsEmpty(tracking) && tracking.map((item) => {
        return (<MarkerTracking
            item={item}
            lat={item.latitude}
            lng={item.longitude}
            setTrackingView={setTrackingView}
            setTrackingData={setTrackingData}
        />);
    });

    // 친구 데이터 표시
    const markerPeople = !IsEmpty(peopleDataArray) && peopleDataArray.map((item, idx) => {
        return (<MarkerUser
            item={item}
            lat={item.lat}
            lng={item.lng}
            idx={idx}
            name={item.name}
            avatar={item.image}
        />);
    });

    return (
        <>
            <CssBaseline />
            { !loading && <Header account={account} setPeopleLocation={setPeopleLocation} setUpdatePeople={setUpdatePeople} peopleDataArray={peopleDataArray} /> }
            <div style={{ height: 'calc(100vh - 13vh)', width: '100%' }}>
            {
                loading ? <></> :
                <>
                    <GoogleMapReact
                        options={{
                            zoomControl: false,
                            streetViewControl: false,
                            fullscreenControl: false
                        }}
                        defaultZoom={16}
                        defaultCenter={myLocation}
                        center={updatePeople ? [peopleLocation.lat, peopleLocation.lng] : [myLocation.lat, myLocation.lng]}
                        bootstrapURLKeys={{ key: 'AIzaSyDBa3kj6nwgmiUdCCNA1fhWHRttnpFTpww' }}
                    >
                        <MarkerUser
                            lat={myLocation.lat}
                            lng={myLocation.lng}
                            idx="0"
                            name={account.name}
                            avatar={account.image}
                        />
                        {markerPeople}
                        {markerTracking}
                    </GoogleMapReact>
                    <Footer
                        account={account}
                        gpsFlg={gpsFlg}
                        setGpsFlg={setGpsFlg}
                        setTrackingView={setTrackingView}
                    />
                    { trackingView && <TrackingView
                        account={account}
                        trackingData={trackingData}
                        setTrackingView={setTrackingView}
                        setTrackingData={setTrackingData}
                    /> }
                </>
            }
            </div>
        </>
    );
}

export default Maps;