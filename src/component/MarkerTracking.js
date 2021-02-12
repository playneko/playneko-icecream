import React from 'react';
import StarsIcon from '@material-ui/icons/Stars';

const MarkerTracking = (props) => {
    const { idx, item } = props;

    return (
        <div>
            <div
                className="pin_tracking bounce"
                style={{
                    cursor: 'pointer'
                }}
                title={item.title}
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