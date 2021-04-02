import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Header from '../../components/Header';
import { UserContext } from 'components/UserState';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { date } from 'faker';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    flex: 1
  }
}));

var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function beautifulDate(input: Date) {
  return month[input.getMonth()] + ' ' + input.getDate() + ' ' + input.getFullYear()
}





export default function Home(): JSX.Element {

  const classes = useStyles();

  const [state, dispatch] = React.useContext(UserContext);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {

    async function fetchData() {

      if (!state) {
        return;
      }
      const resp = await fetch('/api/profile', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`
        },
        method: 'GET'
      });

      const data = await resp.json();
      setData(data.result);
    }
    fetchData();
  }, [state]);

  async function updateUser() {
  
    if (!state) {
      return;
    }

    const updateUser = await fetch('/api/profile', {
      body: JSON.stringify(data),
      headers: {
        Authorization: `${state.token_type} ${state.access_token}`
      },
      method: 'PUT'
    });
    const updateUserResp = await updateUser.json();
    console.log({ updateUser, updateUserResp });
    
    const updateState = await fetch('/api/auth/refresh', {
      body: '{}',
      headers: {
        'refresh_token': state.refresh_token
      },
      method: 'POST'
    });
  
    const newState = await updateState.json();
  
    if (updateState.status === 200) {
      dispatch({
        type: 'UPDATE_AUTH',
        authResult: newState
      });
    }
  }

  return (
    <div>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Profile" loading={!state}>
        {
          data &&
          <>

            <Grid>
              <h1>
                Hi {state.user_data.name}!
              </h1>
              <h3>
                Thank you for being a loyal customer since {beautifulDate(new Date(data.registration_date))}
              </h3>
              <p>
                You currently have { data.points } points.
              </p>
              <p>
                If your information has changed, you can update it here.
              </p>
            </Grid>

            <Grid>
              <Box display="flex">
                <TextField
                  className={classes.formControl}
                  label="Address"
                  variant="outlined"
                  value={data.address}
                  onChange={(e) => setData({ ...data, address: e.target.value})} />
              </Box>
              <Box display="flex">
                <TextField
                  className={classes.formControl}
                  label="Name"
                  variant="outlined"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value})} />

                <TextField
                  className={classes.formControl}
                  label="Email"
                  variant="outlined"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value})} />
              </Box>
              <Box display="flex">
                <TextField
                  className={classes.formControl}
                  label="Phone Number"
                  variant="outlined"
                  value={data.phone_number}
                  onChange={(e) => setData({ ...data, phone_number: e.target.value})} />
              </Box>
              <Button variant="contained" color="primary" onClick={() => updateUser() }>Update</Button>
            </Grid>
          </>
        }
      </Header>
    </div>
  );
}
