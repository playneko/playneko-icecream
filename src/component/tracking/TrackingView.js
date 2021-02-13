import React from 'react';
import { useParams } from "react-router-dom";

// 컴포넌트
// 로그인 체크
import CheckLogin from "../common/CheckLogin";
// Header
import Header from "./Header";

const TrackingView = (props) => {
  let { id } = useParams();
  const { account } = props;

  // 로그인 체크
  CheckLogin(account);

  return (
    <>
      <Header />
    </>
  );
}

export default TrackingView;