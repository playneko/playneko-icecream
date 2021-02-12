import { useEffect } from 'react';
import axios from 'axios'

const TrackingGetModel = ({update, myLocation, setTracking, setError, setLoading}) => {
    const fetchDatas = async () => {
        try {
            // 요청이 시작 할때에는 error를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // POST 전송
            let response = await axios.post('/api/tracking/get', myLocation)
            .catch(function (error) {
                setError({error:error});
            });

            // 데이터는 response.data 안에 들어있습니다.
            setTracking(response.data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (myLocation != null && myLocation.lat > 0 && myLocation.lng > 0) {
            fetchDatas();
        }
    }, [update, myLocation]);
}

export default TrackingGetModel;
