import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import firebase from "firebase";

// 컴포넌트
// Header
import Header from "./component/Header";
// 로그인
import Login from "./component/Login";
// 맵 데이터 처리
import Maps from "./component/Maps";
// 친구등록
import PeopleAdd from "./component/PeopleAdd";
// 친구목록
import PeopleList from "./component/PeopleList";
// 내가 남긴 흔적
import TraceList from "./component/TraceList";
// 404 NotFound
import NotFound from "./component/NotFound";
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
      name: snapshot.val().name,
      image: snapshot.val().image,
      lat: snapshot.val().lat,
      lng: snapshot.val().lng,
      user: true
    });
  });
}

function App() {
  const classes = useStyles();
  const [myTheme, setMyTheme] = React.useState(colorTheme);
  const [account, setAccount] = React.useState({
    auth: false,
    uid: "",
    email: "",
    image: "",
    lat: 0,
    lng: 0,
    user: false
  });

  // 로그인 유무를 체크후 헤더에 넘겨주기
  const handleAuth = (e) => {
    setAccount(e);
    if (e.auth && !account.user) {
      // 유저 정보 취득
      UserData(e, setAccount);
    }
  };

  return (
    <Router>
      <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
        <main
          className={account.auth ? classes.content : ""}
        >
          <div className={classes.drawerHeader} />
          {
            account.auth ?
              <>
                <CssBaseline />
                <Header params={account} />
              </>
            : ""
          }
          <Switch>
          {
            account.auth && account.user ?
              <Route exact path="/" render={() => <Maps>{{account: account, setAccount: setAccount}}</Maps>} /> :
              <Route exact path="/" render={() => <Login params={handleAuth} />} />
          }
          <Route path="/people/add" render={() => <PeopleAdd>{account}</PeopleAdd>} />
          <Route path="/people/list" render={() => <PeopleList>{account}</PeopleList>} />
          <Route path="/trace/list" render={() => <TraceList>{account}</TraceList>} />
          <Route path="/404" render={() => <NotFound />} />
          </Switch>
        </main>
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;