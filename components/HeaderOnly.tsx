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

interface Props {
  title: string;
}


export default function Header({ title }: Props): JSX.Element {

  const classes = useStyles();
  const [state] = React.useContext(UserContext);

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
