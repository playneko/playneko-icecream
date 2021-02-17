import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import firebase from "firebase";

// 컴포넌트
// 마일 누적 처리
import MileCounter from "./component/common/MileCounter";
// 로그인
import Login from "./component/user/Login";
// 맵 데이터 처리
import Maps from "./component/map/Maps";
// 친구등록
import PeopleAdd from "./component/people/PeopleAdd";
// 친구목록
import PeopleList from "./component/people/PeopleList";
// 내가 남긴 흔적
import TrackingList from "./component/tracking/TrackingList";
// 404 NotFound
import NotFound from "./component/NotFound";
// 모델
import UpdateUserInfoFire from "./models/UpdateUserInfoFire";
import GetPeopleDataFire from "./models/GetPeopleDataFire";
// CSS
import './styles/App.css';
import './styles/Marker.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ffffff',
    }
  },
});

const UserData = (auth, setAuthInfo) => {
  let db = firebase.database();
  let ref = db.ref("/users/" + auth.uid);

  ref
  .on("value", snapshot => {
    setAuthInfo({
      ...auth,
      name: snapshot.val().name ? snapshot.val().name : "",
      image: snapshot.val().image ? snapshot.val().image : "",
      lat: snapshot.val().lat ? snapshot.val().lat : 0,
      lng: snapshot.val().lng ? snapshot.val().lng : 0,
      mile: snapshot.val().mile ? snapshot.val().mile : 0,
      user: true
    });
  });
}

function App() {
  const classes = useStyles();
  const [myTheme, setMyTheme] = React.useState(colorTheme);
  const [update, setUpdate] = React.useState(false);
  const [account, setAccount] = React.useState({
    auth: false,
    uid: "",
    name: "",
    email: "",
    image: "",
    lat: 0,
    lng: 0,
    mile: 0,
    user: false
  });
  // 친구 데이터
  const [peopleData, setPeopleData] = React.useState([]);
  const [peopleAddFlg, setPeopleAddFlg] = React.useState(true);
  let peopleDataArray = [];

  // 로그인 유무를 체크후 헤더에 넘겨주기
  const handleAuth = (e) => {
    setAccount(e);
    if (e.auth && !account.user) {
      // 유저 정보 취득
      UserData(e, setAccount);
    }
  };

  // 마일 누적 처리
  MileCounter(account, setAccount, setUpdate);

  if (account != null && account.auth === true && update) {
    // 마일 갱신처리
    UpdateUserInfoFire(account, setUpdate);
  }
  if (account != null && account.auth === true && peopleAddFlg) {
    // 친구들 데이터 취득
    GetPeopleDataFire(account, peopleData, setPeopleData, setPeopleAddFlg);
  }
  if (account != null && account.auth === true && !peopleAddFlg) {
    // 중복 삭제
    let values = [];
    peopleDataArray = peopleData.filter(data => {
        if (values.indexOf(data["uid"]) === -1) {
            values.push(data["uid"]);
            return data;
        }
    });
  }

  return (
    <Router>
      <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
        <main
          className={account.auth ? classes.content : ""}
        >
          <Switch>
          {
            account.auth && account.user ?
              <Route exact path="/" render={() => <Maps account={account} setAccount={setAccount} peopleDataArray={peopleDataArray} />} /> :
              <Route exact path="/" render={() => <Login params={handleAuth} />} />
          }
          <Route path="/people/add" render={() => <PeopleAdd account={account} setPeopleAddFlg={setPeopleAddFlg} />} />
          <Route path="/people/list" render={() => <PeopleList account={account} peopleDataArray={peopleDataArray} />} />
          <Route path="/tracking/list" render={() => <TrackingList account={account} />} />
          <Route path="/404" render={() => <NotFound />} />
          </Switch>
        </main>
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;