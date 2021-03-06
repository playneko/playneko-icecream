import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const TrackingView = (props) => {
  const classes = useStyles();
  const { account, trackingData, setTrackingView, setTrackingData } = props;

  const handleOnClose = () => {
    setTrackingView(false);
    setTrackingData(null);
  };

  return (
    <Card className={classes.root + " tracking-view"}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleOnClose}>
            <Close />
          </IconButton>
        }
        title={trackingData.title}
        subheader={trackingData.regdate}
      />
      { trackingData.image && <CardMedia
        className={classes.media}
        image={trackingData.image}
        title={trackingData.title}
      /> }
      <CardContent className="tracking-view_content">
        <Typography variant="body2" color="textSecondary" component="p">
        {
          trackingData.comment && trackingData.comment.split('\n').map((line) => {
            return (<span>{line}<br/></span>)
          })
        }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TrackingView;