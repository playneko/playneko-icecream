import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function Navibar(props) {
  const { account } = props;

  return (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="" />
      </ListItem>
    </List>
  );
}