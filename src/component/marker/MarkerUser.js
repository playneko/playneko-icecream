import React from 'react';

const MarkerUser = (props) => {
    const colorList = [
        "#ff4c6d", "#3d5afe", "#66bb6a", "#ff8a80",
        "#bdbdbd", "#ef5350", "#ec407a", "#26a69a",
        "#66bb6a", "#2979ff", "#26c6da", "#ffee58",
        "#ffca28", "#9ccc65", "#d4e157", "#8d6e63",
        "#bdbdbd", "#ffa726", "#ff7043", "#82b1ff"
    ];
    const { idx, name, avatar } = props;

    return (
        <div>
            <div
                className="pin_popup"
                style={{
                    backgroundColor: colorList[idx]
                }}
            >{name}</div>
            <div
                className="pin bounce"
                style={{
                    backgroundColor: colorList[idx],
                    cursor: 'pointer'
                }}
                title={name}
            >
                <div
                    className="pin_avatar"
                    style={{
                        backgroundImage: `url(${avatar})`
                    }}
                />
            </div>
            <div className="pulse" />
        </div>
    );
};

export default MarkerUser;