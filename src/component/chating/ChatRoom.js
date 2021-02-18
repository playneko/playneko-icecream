import React, { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import firebase from "firebase";

// 컴포넌트
// 공통 처리
import IsEmpty from "../common/IsEmpty";
// 로그인 체크
import CheckLogin from "../common/CheckLogin";
// Header
import Header from "./Header";
// Footer
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const ScrollMoveBottom = (chatrooms, messagesRef) => {
  useEffect(() => {
    messagesRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
  }, [chatrooms]);
}

const ChatRooms = (message, id, setChatRooms) => {
  let db = firebase.database();
  let ref = db.ref("/icecream_message").child(id);

  useEffect(() => {
    ref
    .limitToLast(20)
    .on("value", snapshot => {
      setChatRooms({
        data: snapshot.val()
      });
    });
  }, [message]);
}

const EmojiRender = (item) => {
  return (
    <img src={"/emoji/" + item.emoji + ".png"} />
  );
}

const ListRender = (props) => {
  const { account, id, chatrooms } = props;

  return (
    <>
    {
      Object.keys(chatrooms).map((item, idx) => (
        item.uuid !== account.uid ?
          <ListItem key={idx} button>
            <ListItemAvatar className="chat-room_bubble_avatar">
              <Avatar
                alt={item.name}
                src={item.image}
              />
            </ListItemAvatar>
            <div>
              <div className="chat-room_bubble_name_left">{item.name}</div>
              <div className={item.emoji != null ? "chat-room_emoji_left" : "chat-room_bubble_left"}>{item.emoji != null ? <EmojiRender emoji={item.emoji} /> : item.message}</div>
            </div>
            <div className="chat-room_bubble_time_left">{item.datetime != null ? item.datetime.split(" ")[1].substring(0,5) : ""}</div>
          </ListItem>
        :
          <ListItem key={idx} button>
            <div className="chat-room_bubble_time_right">{item.datetime != null ? item.datetime.split(" ")[1].substring(0,5) : ""}</div>
            <div className={item.emoji != null ? "chat-room_emoji_right" : "chat-room_bubble_right"}>{item.emoji != null ? <EmojiRender emoji={item.emoji} /> : item.message}</div>
          </ListItem>
      ))
    }
    </>
  );
}

const ChatRoom = (props) => {
  const { account } = props;
  const { id } = useParams();
  const classes = useStyles();
  const messagesRef = useRef();
  const [message, setMessage] = React.useState(null);
  const [chatrooms, setChatRooms] = React.useState(null);

  // 로그인 체크
  // CheckLogin(props);

  // 채팅목록 취득
  ChatRooms(message, id, setChatRooms);

  // 스크롤 하단으로 이동
  ScrollMoveBottom(chatrooms, messagesRef);

  return (
    <>
      <Header />
      <List dense className={classes.root + " chat-room-list_bottom"} ref={messagesRef}>
      {!IsEmpty(id) && !IsEmpty(chatrooms) && !IsEmpty(chatrooms.data) ? <ListRender account={account} id={id} chatrooms={chatrooms} /> : ""}
      </List>
      <Footer account={account} id={id} chatrooms={chatrooms} paramMsg={setMessage} />
    </>
  );
}

export default ChatRoom;