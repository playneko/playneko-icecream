import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
}));

const Header = (props) => {
  let history = useHistory();
  const classes = useStyles();

  // 이전 페이지로 이동
  const handleOnBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root + " header-chat_room"}>
      <AppBar position="static">
        <Toolbar>
          <div className="header-people_back">
            <IconButton edge="end" aria-label="comments" color="inherit" onClick={handleOnBack}>
              <ArrowBackIos />
            </IconButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            トーク
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;