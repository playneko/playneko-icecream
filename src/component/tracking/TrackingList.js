import React from 'react';

// 컴포넌트
// 로그인 체크
import CheckLogin from "../common/CheckLogin";
// Header
import Header from "./Header";

const TrackingList = (props) => {
  const { account } = props;

  // 로그인 체크
  CheckLogin(account);

  return (
    <>
      <Header />
    </>
  );
}

export default TrackingList;