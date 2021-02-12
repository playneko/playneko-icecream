import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Person from '@material-ui/icons/Person';
import Explore from '@material-ui/icons/Explore';
import GpsFixed from '@material-ui/icons/GpsFixed';
import PersonAdd from '@material-ui/icons/PersonAdd';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import LibraryBooks from '@material-ui/icons/LibraryBooks';

// 컴포넌트
// 흔적 남기기
import Tracking from "./Tracking";

const useStyles = makeStyles((theme) => ({
  fabButton: {
    zIndex: 1,
    left: 0,
    right: 0,
    margin: '0 auto',
    position: 'absolute',
    bottom: theme.spacing(2),
  },
  absolute1: {
    position: 'absolute',
    bottom: theme.spacing(9),
    right: theme.spacing(2),
  },
  absolute2: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Footer = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const { account, gpsFlg, setGpsFlg } = props;
  const [addopen, setAddopen] = React.useState(false);
  const [tracking, setTracking] = React.useState(false);

  const handleOnGps = () => {
    setGpsFlg(9);
  }
  const handleOnExplore = () => {
    if (gpsFlg === 1) {
      setGpsFlg(0);
    } else {
      setGpsFlg(1);
    }
  }
  const handleOnAddForm = () => {
    addopen ? setAddopen(false) : setAddopen(true);
  }

  // 흔적 남기기
  const handleOnTracking = () => {
    setAddopen(false);
    setTracking(true);
  }

  // 링크 페이지로 이동
  const handleOnLink = (link) => {
    history.push(link);
  };

  return (
    <>
      <div
        className="footer-tracking_form"
        style={tracking ? {display: "block"} : {display: "none"}}
      >
        <Tracking account={account} setTracking={setTracking} />
      </div>
      <div
        className="footer-add_form"
        style={addopen ? {display: "block"} : {display: "none"}}
      >
        <Button variant="contained" color="primary" type="button" onClick={() => handleOnLink("/people/add")}>
          <PersonAdd />
          친구등록
        </Button>{' '}
        <Button variant="contained" color="primary" type="button" onClick={() => handleOnLink("/people/list")}>
          <Person />
          친구목록
        </Button>{' '}
        <Button variant="contained" color="primary" type="button" className="footer-button_library_add" onClick={() => handleOnTracking()}>
          <LibraryAdd />
          흔적 남기기
        </Button>{' '}
        <Button variant="contained" color="primary" type="button" className="footer-button_library_books" onClick={() => handleOnLink("/trace/list")}>
          <LibraryBooks />
          내가 남긴 흔적
        </Button>
      </div>
      {
        tracking ?
          "" :
          <Fab color="secondary" className={classes.fabButton + " footer-fab_add"} onClick={() => handleOnAddForm()}>
            <AddIcon />
          </Fab>
      }
      {
        gpsFlg < 1 ?
          <Fab color="secondary" className={classes.absolute1 + " footer-fab_gps"} onClick={() => handleOnGps()}>
            <GpsFixed />
          </Fab>
        : ""
      }
      {
        gpsFlg < 1 || gpsFlg === 1 ?
          <Fab color="secondary" className={gpsFlg < 1 ? classes.absolute2 + " footer-fab_explore_open" : classes.absolute2 + " footer-fab_explore_close"} onClick={() => handleOnExplore()}>
            <Explore />
          </Fab>
        : ""
      }
    </>
  );
}

export default Footer;