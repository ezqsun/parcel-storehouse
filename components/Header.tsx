import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { UserContext } from './UserState';
import React from 'react';
import { deepOrange } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
}));


export default function Header({ title }): JSX.Element {
  
  const classes = useStyles();
  const [ state, dispatch ] = React.useContext(UserContext);
  

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(state);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          { title }
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
                  <Avatar style={{backgroundColor: deepOrange[500]}}>H</Avatar>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={() => dispatch({type: 'LOGOUT'})}>Logout</MenuItem>
                </Menu>
            </>
        }
      </Toolbar>
    </AppBar>
  );
}
