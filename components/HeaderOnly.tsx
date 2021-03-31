import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { UserContext } from './UserState';
import React from 'react';


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
  }
}));


export default function Header({ title }): JSX.Element {

  const classes = useStyles();
  const [state, dispatch] = React.useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(state);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {
            !state &&
            <>
              <Link href="/auth/register">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          }
        </Toolbar>
      </AppBar>
    </>
  );
}
