import React from 'react'
import { useEffect } from 'react';

// 컴포넌트
// 좌표 취득
import Geolocation from "../Geolocation";

const ReloadCounter = (setMyLocation) => {
    const [count, setCount] = React.useState(3);

    useEffect(() => {
        let id = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        return () => clearInterval(id);
    });
    useEffect(() => {
        if (count < 0) {
            setCount(3);
            // 현재 좌표 취득
            Geolocation(setMyLocation);
        }
    }, [count]);
}

export default ReloadCounter;