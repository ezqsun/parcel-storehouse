import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';
import { Box, CircularProgress, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import Image from 'next/image';
import { UserContext } from 'components/UserState';
import InfoCard from 'components/InfoCard';

export default function Login(): JSX.Element {

  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null)
  const [filter, setFilter] = React.useState('');

  React.useEffect(() => {

    async function fetchData() {

      if (!state) {
        return;
      }

      const resp = await fetch('/api/admin/customers', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`,
          points: filter
        },
        method: 'GET'
      });

      const data = await resp.json();

      setData(data.result);
    }

    fetchData();

  }, [state, filter]);

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Customers)" loading={!data}>
        <Grid container>
          {
            data &&
            <>
              <Grid style={{ width: '100%' }}>
                <p>
                  Note: To add a new customer, register a new account
                </p>
                <Box style={{ display: 'flex' }}>
                  <TextField
                      label="Filter by number of points (points >= value)"
                      variant="outlined"
                      style={{ flex: 1 }}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)} />
                </Box>
              </Grid>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer ID (cid)</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right">Phone Number</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Points</TableCell>
                      <TableCell align="right">Registration Date</TableCell>
                      <TableCell align="right">Is banned</TableCell>
                      <TableCell align="right"># of shipped packages</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.cid}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.phone_number}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                        <TableCell align="right">{row.registration_date}</TableCell>
                        <TableCell align="right">{row.is_blacklisted ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="right">{row.shipped_packages}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          }
        </Grid>
      </Header>
    </>
  );
}
