import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import type { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import { ListItemIcon } from '@material-ui/core';

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
      <Link passHref href="/docs">
        <ListItem component="a">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>

          <ListItemText primary={'Docs'} />
        </ListItem>
      </Link>
      <Divider />

      <Link passHref href="/">
        <ListItem component="a">
          <ListItemText primary={'Demo'} />
        </ListItem>
      </Link>
      <Link passHref href="/readonly">
        <ListItem component="a">
          <ListItemText primary={'Read only'} />
        </ListItem>
      </Link>
      <Link passHref href="/empty">
        <ListItem component="a">
          <ListItemText primary={'Empty editor'} />
        </ListItem>
      </Link>

      <Link passHref href="/examples/reactadmin">
        <ListItem component="a">
          <ListItemText primary={'React Admin example'} />
        </ListItem>
      </Link>

      <Divider />
      <List>
        <Link passHref href="/old/demo">
          <ListItem component="a">
            <ListItemText primary={'Old demo (v0)'} />
          </ListItem>
        </Link>
        <Link passHref href="/old/fromhtml">
          <ListItem component="a">
            <ListItemText primary={'Old import-from-html-Demo'} />
          </ListItem>
        </Link>
      </List>
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
