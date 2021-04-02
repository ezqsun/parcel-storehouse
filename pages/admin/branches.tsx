import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';
import { CircularProgress, Divider, FormControl, Grid, InputLabel, LinearProgress, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Image from 'next/image';
import { UserContext } from 'components/UserState';
import InfoCard from 'components/InfoCard';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  }
}));

export default function Login(): JSX.Element {

  const classes = useStyles();

  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null);

  const [cust, setCust] = React.useState(null);
  const [bid, setBid] = React.useState(-1);

  React.useEffect(() => {

    async function fetchData() {

      if (!state) {
        return;
      }

      const resp = await fetch('/api/admin/branches', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`
        },
        method: 'GET'
      });

      const data = await resp.json();
      setData(data.result);

      const custResp = await fetch('/api/admin/branch-cust', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`,
          bid: bid.toString()
        },
        method: 'GET'
      });
      const custData = await custResp.json();
      setCust(custData.result);
    }

    fetchData();

  }, [state, bid]);

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Branches)" loading={!data}>
        <Grid>
          {
            data &&
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Branch ID (bid)</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Phone Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.bid}
                        </TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.phone_number}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          }
          <br />
          <Divider />
          <br />
          <Divider />
          <br />
          <p>
            Branch customers
          </p>
          {
            cust &&
            <>
              <Grid container>

              <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="branch-select-outlined-label">Filter by branch</InputLabel>
                  <Select
                    labelId="branch"
                    id="branch-select"
                    value={bid}
                    onChange={(e) => setBid(e.target.value as number)}
                    label="Filter by branch"
                  >

                    <MenuItem value={-1}>No Filter</MenuItem>
                    {
                      data.map(cust => <MenuItem value={cust.bid}>({cust.bid}) Branch</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Customer ID (cid)</TableCell>
                      <TableCell>Branch ID (bid)</TableCell>
                      <TableCell align="right">Customer Name</TableCell>
                      <TableCell align="right">Customer Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cust.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.cid}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.bid}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
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
