import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

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

const Header = () => {
  let history = useHistory();
  const classes = useStyles();

  // 이전 페이지로 이동
  const handleOnBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root + " header"}>
      <AppBar position="static">
        <Toolbar>
          <div className="header-people_back">
            <IconButton edge="end" aria-label="comments" color="inherit" onClick={handleOnBack}>
              <Close />
            </IconButton>
          </div>
          <Typography variant="h6" className={classes.title}>
            ともだち追加
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;