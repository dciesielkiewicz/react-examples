import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';

import { TODO_ROUTE, WELCOME_ROUTE } from 'routes';

import { useMenuOpened } from './useMenuOpened';

const useStyles = makeStyles(() => ({
  menu: {
    minWidth: 250,
  },
}));

export const Header = () => {
  const classes = useStyles();
  const { closeMenu, isMenuOpened, openMenu } = useMenuOpened();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Toggle menu" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isMenuOpened} onClose={closeMenu}>
        <Box pt={2}>
          <List component="nav" aria-label="Navigation menu" className={classes.menu}>
            <ListItem button component={Link} to={WELCOME_ROUTE} onClick={closeMenu}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to={TODO_ROUTE} onClick={closeMenu}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Todo" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
