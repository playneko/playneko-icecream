import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const TrackingList = (props) => {
  const { account } = props;

  return (
    <>
      <p className="notfound-color_red">
        <span className="notfound-title_style">ERROR</span>
      </p>
      <div>
        <Avatar src="/character/000.jpg" className="notfound-list_avatar"/>
        <div className="notfound-avatar_content">
          <p>시스템의 오류로 인해 지도 데이터를 작성에 실패 했습니다.</p>
          <p>잠시후 다시 시도해 주시기 바랍니다.</p>
        </div>
      </div>
    </>
  );
}

export default TrackingList;