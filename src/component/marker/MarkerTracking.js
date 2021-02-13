import React from 'react';
import { useHistory } from "react-router-dom";
import StarsIcon from '@material-ui/icons/Stars';

const MarkerTracking = (props) => {
    let history = useHistory();
    const { idx, item } = props;

    const handleOnTrackingView = () => {
        history.push("/tracking/view/" + item.no);
    };

    return (
        <div>
            <div
                className="pin_tracking bounce"
                style={{
                    cursor: 'pointer'
                }}
                title={item.title}
                onClick={() => handleOnTrackingView()}
            >
            {
                item.image ?
                <div className="pin_avatar" style={{ backgroundImage: `url(${item.image})` }} />
                : <div className="pin_tracking_icon"><StarsIcon /></div>
            }
            </div>
            <div className="pulse_tracking" />
        </div>
    );
};

export default MarkerTracking;