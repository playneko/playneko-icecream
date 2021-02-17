import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// 컴포넌트
// 공통 처리
import IsEmpty from "./common/IsEmpty";

export default function Navibar(props) {
  const { account, setPeopleLocation, setUpdatePeople, peopleDataArray } = props;

  const handleOnPeopleMove = (lat, lng) => {
    setUpdatePeople(true);
    setPeopleLocation({
      lat: IsEmpty(lat) ? 0 : lat,
      lng: IsEmpty(lng) ? 0 : lng
    });
  };

  return (
    <List>
    {
      peopleDataArray && peopleDataArray.map((item) => {
        return (
          <ListItem button component={Link} onClick={() => handleOnPeopleMove(item.lat, item.lng)}>
            <ListItemAvatar>
              <Avatar
                alt={item.name}
                src={item.image}
              />
            </ListItemAvatar>
            <ListItemText primary={item.name} />
          </ListItem>
        );
      })
    }
    </List>
  );
}