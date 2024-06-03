import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';

import { HOME_ROUTE, TODO_ROUTE } from '../../routes';

import { useMenuOpened } from './useMenuOpened';

export const Header = () => {
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
          <List
            component="nav"
            aria-label="Navigation menu"
            sx={{ minWidth: 250 }}
          >
            <ListItemButton component={Link} to={HOME_ROUTE} onClick={closeMenu}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to={TODO_ROUTE} onClick={closeMenu}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Todo" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
