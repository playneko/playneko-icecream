import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PersonAdd from '@material-ui/icons/PersonAdd';

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
  const page = props.children;

  // 친구목록 헤더
  const People = () => {
    return (
      <>
        <Typography variant="h6" className={classes.title}>
          ともだち
        </Typography>
        <div className="header-people_add">
          <IconButton
            aria-label="友達追加"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOnPeopleAdd}
          >
            <PersonAdd />
          </IconButton>
        </div>
      </>
    );
  }

  // 친구추가 헤더
  const PeopleAdd = () => {
    return (
      <>
        <div className="header-people_back">
          <IconButton edge="end" aria-label="comments" color="inherit" onClick={handleOnBack}>
            <Close />
          </IconButton>
        </div>
        <Typography variant="h6" className={classes.title}>
          ともだち追加
        </Typography>
      </>
    );
  }

  // 친구추가 페이지
  const handleOnPeopleAdd = () => {
    history.push("/people/add");
  }

  // 이전 페이지로 이동
  const handleOnBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root + " header"}>
      <AppBar position="static">
        <Toolbar>
        {
          page === "add" ?
            <PeopleAdd />
          :
            <People />
        }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;