import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import EmojiEmotionsRounded from '@material-ui/icons/EmojiEmotionsRounded';
import firebase from "firebase";

// 컴포넌트
// 유니크키 생성
import ChildByAutoId from "../common/ChildByAutoId";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100vw - 1vw)',
    height: '40px',
    margin: '0 auto',
    marginTop: '2px',
    borderBottom: '0px',
    backgroundColor: '#545454',
  },
  input: {
    marginLeft: theme.spacing(1),
    backgroundColor: '#545454',
    width: 'calc(100vw)',
    height: '35px',
    border: '0px',
    flex: 1,
  },
  iconButton: {
    padding: 10,
    color: '#cccccc',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SendProcessMessage = (childByAutoId, chatid, paramData) => {
  let db = firebase.database();
  let ref = db.ref("/message").child(chatid).child(childByAutoId);
  ref.set(paramData);
}

const SendMessage = (sendMessage) => {
  const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const chatid = sendMessage.chatid;
  const auth = sendMessage.auth;
  const emoji = sendMessage.emoji;
  const message = sendMessage.message;

  if (chatid != null && emoji != null && emoji.length > 0) {
    const paramData = {
      uuid: auth.uid,
      name: auth.name,
      image: auth.image,
      emoji: emoji,
      datetime : nowTime
    };
    const childByAutoId = ChildByAutoId("message", chatid);
    SendProcessMessage(childByAutoId, chatid, paramData);
  }
  if (chatid != null && message != null && message.length > 0) {
    const paramData = {
      uuid: auth.uid,
      name: auth.name,
      image: auth.image,
      message: message,
      datetime : nowTime
    };
    const childByAutoId = ChildByAutoId("message", chatid);
    SendProcessMessage(childByAutoId, chatid, paramData);
  }
}

const Footer = (props) => {
  const classes = useStyles();
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const targetMessage = event.target.chat_message.value;
    const sendMessage = {
      message: targetMessage,
      auth: props.paramData.auth,
      chatid: props.paramData.chatid
    };

    props.paramMsg(sendMessage);
    SendMessage(sendMessage);
  }

  return (
    <>
      <div className="footer-chat_room">
          <Paper component="form" className={classes.root + " footer-chat_room_fieldset"} onSubmit={handleOnSubmit}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={1}
              type="text"
              name="chat_message"
              variant="outlined"
              className={classes.input}
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions" type="submit">
              <DirectionsIcon />
            </IconButton>
          </Paper>
        </div>
    </>
  );
}

export default Footer;