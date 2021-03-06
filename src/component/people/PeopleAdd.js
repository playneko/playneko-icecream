import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import PersonAdd from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// 컴포넌트
// 로그인 체크
import CheckLogin from "../common/CheckLogin";
// Firebase
import firebase from '../Firebase';
// Header
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const ListRender = (paramData) => {
  const auth = paramData.children.auth;
  const search = paramData.children.search;
  const lists = paramData.children.friends.data;
  const setPeopleAddFlg = paramData.children.setPeopleAddFlg;

  const handleOnPeopleAdd = (auth, uuid) => {
    let db = firebase.database();
    let ref = db.ref("/icecream_friends").child(auth.uid).child(uuid);

    ref.set({
      uuid: uuid,
      tracking: 0
    });

    setPeopleAddFlg(true);
  };

  return (
    <>
    {
      lists != null ?
        Object.keys(lists).map((item, idx) => (
          lists[item].name === search ?
            <ListItem key={idx} button>
              <ListItemAvatar>
                <Avatar
                  alt={lists[item].name}
                  src={lists[item].image}
                />
              </ListItemAvatar>
              <ListItemText id={idx} primary={lists[item].name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <PersonAdd onClick={() => handleOnPeopleAdd(auth, item)} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          : ""
        ))
      : ""
    }
    </>
  );
}

const PeopleAdd = (props) => {
  const classes = useStyles();
  const [search, setSearch] = React.useState(null);
  const [friends, setFriends] = React.useState(null);
  const { account, setPeopleAddFlg } = props;
  const paramData = {
    auth: account,
    search: search,
    friends: friends,
    setPeopleAddFlg: setPeopleAddFlg
  };

  // 로그인 체크
  CheckLogin(account);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSearch(event.target.name.value);

    let db = firebase.database();
    let ref = db.ref("/users");
  
    ref
    .orderByKey()
    .on("value", snapshot => {
      setFriends({
        data: snapshot.val()
      });
    });
  }

  return (
    <>
      <Header />
      <div className="people-add_div">
        <form onSubmit={handleOnSubmit}>
        <TextField
          className={classes.margin}
          name="name"
          id="input-with-icon-textfield"
          label="ユーザ名を入力して下さい。"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        </form>
      </div>
      <List dense className={classes.root}>
      {friends != null ? <ListRender>{paramData}</ListRender> : ""}
      </List>
    </>
  );
};

export default PeopleAdd;