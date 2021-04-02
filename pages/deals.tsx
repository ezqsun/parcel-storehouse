
import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
//import { UserContext } from '../components/UserState';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  }
}));

export default function Deals(): JSX.Element {

  const classes = useStyles();

  const [data, setData] = React.useState(null);

  const [couriers, setCouriers] = React.useState([]);

  const [nid, setNid] = React.useState(-1);
  const [discount, setDiscount] = React.useState('1.0');

  React.useEffect(() => {

    async function fetchData() {

      const resp = await fetch('/api/deals', {
        headers: {
          nid: nid.toString(),
          discount: discount
        },
        method: 'GET'
      });
      const data = await resp.json();
      console.log('updated');
      setData(data.result);
    }
    fetchData();
  }, [nid, discount]);


  React.useEffect(() => {

    async function fetchData() {
      const resp = await fetch('/api/courier', {
        method: 'GET'
      });

      const data = await resp.json();

      setCouriers(data.result);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Deal Finder">
        <Grid>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="nid-select-outlined-label">Filter by courier</InputLabel>
            <Select
              labelId="nid"
              id="nid-select"
              value={nid}
              onChange={(e) => setNid(e.target.value as number)}
              label="Filter by courier"
            >

              <MenuItem value={-1}>No Filter</MenuItem>
              {
                couriers.map(cust => <MenuItem value={cust.nid}>({cust.nid}) {cust.name}</MenuItem>)
              }
            </Select>
          </FormControl>
          <TextField 
            id="bal-amount" 
            className={classes.formControl} 
            label="Deal filter (discount > input)" 
            variant="outlined" 
            value={discount} 
            onChange={(e) => setDiscount(e.target.value)} />
          {
            data && couriers.length > 0 &&
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Courier ID (nid)</TableCell>
                      <TableCell>Courier Name</TableCell>
                      <TableCell>Discount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.nid}
                        </TableCell>
                        <TableCell>
                          { couriers.find(x => x.nid == row.nid).name }
                        </TableCell>
                        <TableCell>{row.discount_per_lb}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          }
        </Grid>
      </Header>
    </div>
  );
}
