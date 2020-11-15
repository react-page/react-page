import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
  })
);
const Navigation: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Link passHref href="/">
        <ListItem component="a">
          <ListItemText primary={'Home'} />
        </ListItem>
      </Link>
      <Link passHref href="/empty">
        <ListItem component="a">
          <ListItemText primary={'Empty editor'} />
        </ListItem>
      </Link>
      <Divider />
      <List>
        <ListItem component="a" href={'https://react-page.github.io/'}>
          <ListItemText primary={'Latest version'} />
        </ListItem>
        <ListItem component="a" href={'https://react-page.github.io/beta'}>
          <ListItemText primary={'beta version'} />
        </ListItem>
      </List>
    </div>
  );
};

export default Navigation;
