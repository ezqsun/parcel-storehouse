import {
  AppBar,
  Avatar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { UserContext } from './UserState';
import React from 'react';
import { deepOrange } from '@material-ui/core/colors';
import clsx from 'clsx';

import DashbaordIcon from '@material-ui/icons/Dashboard';
import ShipIcon from '@material-ui/icons/FlightTakeoff';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


export default function Header({ title, children }): JSX.Element {

  const classes = useStyles();
  const [state, dispatch] = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerState] = React.useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(state);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={(e) => setDrawerState(!drawerOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {
            !state &&
            <>
              <Link href="/packages">
                <Button color="inherit">Packages</Button>
              </Link>
              <Link href="/auth/register">
                <Button color="inherit">Register</Button>
              </Link>
              <Link href="/auth/login">
                <Button color="inherit">Login</Button>
              </Link>
            </>
          }
          {
            state &&
            <>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Avatar style={{ backgroundColor: deepOrange[500] }}>{state.user_data.name[0]}</Avatar>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem style={{ width: '200px' }} disabled>Hi {state.user_data.name}!</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</MenuItem>
              </Menu>
            </>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={drawerOpen}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {
              state && state.user_data.role === 'admin' &&
              <>

                <Link href="/admin">
                  <ListItem button>
                    <ListItemIcon><DashbaordIcon /></ListItemIcon>
                    <ListItemText primary="Admin Dashboard" />
                  </ListItem>
                </Link>
                <Divider />
              </>
            }
            <Link href="/">
              <ListItem button>
                <ListItemIcon><DashbaordIcon /></ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <Link href="/ship">
              <ListItem button>
                <ListItemIcon><ShipIcon /></ListItemIcon>
                <ListItemText primary="Ship" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: !drawerOpen,
        })}
      >
        {children}
      </main>
    </>
  );
}
