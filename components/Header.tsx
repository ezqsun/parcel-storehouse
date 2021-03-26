import Head from 'next/head';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { useSession } from 'next-auth/client';


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
  const [session, loading] = useSession();
  
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
            !session &&
            <>
                <Link href="/auth/register">
                    <Button color="inherit">Register</Button>
                </Link>
                <Link href="/api/auth/signin">
                    <Button color="inherit">Login</Button>
                </Link>
            </>
        }
        {
            session &&
            <>
                <Link href="/auth/register">
                    <Button color="inherit">Logout</Button>
                </Link>
                <Link href="/auth/login">
                    <Button color="inherit">Profile</Button>
                </Link>
            </>
        }
      </Toolbar>
    </AppBar>
  );
}
