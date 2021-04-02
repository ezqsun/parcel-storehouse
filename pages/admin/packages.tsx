import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';
import { FormControl, FormControlLabel, FormGroup, Grid, InputLabel, makeStyles, MenuItem, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
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
  const [custData, setCustData] = React.useState([]);

  const [year, setYear] = React.useState(0);
  const [cust, setCust] = React.useState(-1);
  const [showBanned, setShowBanned] = React.useState(true)

  React.useEffect(() => {

    async function fetchData() {
      if (!state) {
        return;
      }
      const resp = await fetch('/api/admin/packages', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`,
          year: year.toString(),
          cid: cust.toString(),
          showbanned: showBanned ? 'yes' : 'no'
        },
        method: 'GET'
      });
      const data = await resp.json();
      console.log('updated');
      setData(data.result);

      if (custData.length != 0) {
        return;
      }


      const custResp = await fetch('/api/admin/customers', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`
        },
        method: 'GET'
      });
      const custDataTemp = await custResp.json();
      setCustData(custDataTemp.result);
    }
    fetchData();
  }, [state, year, cust, showBanned]);
  
  
  const years = [];

  for (let i = 2010; i <= 2021; i++) {
    years.push(i);
  }

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Packages)" loading={!data}>
        <Grid container>
          {
            data &&
            <>
              <p>
                Filters
              </p>

              <Grid container>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="year-select-outlined-label">Filter by year</InputLabel>
                  <Select
                    labelId="year"
                    id="year-select"
                    value={year}
                    onChange={(e) => setYear(e.target.value as number)}
                    label="Filter by year"
                  >

                    <MenuItem value={0}>No Filter</MenuItem>
                    {
                      years.map(year => <MenuItem key={year} value={year}>{year}</MenuItem>)
                    }
                  </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="customer-select-outlined-label">Filter by customer</InputLabel>
                  <Select
                    labelId="cust"
                    id="customer-select"
                    value={cust}
                    onChange={(e) => setCust(e.target.value as number)}
                    label="Filter by customer"
                  >

                    <MenuItem value={-1}>No Filter</MenuItem>
                    {
                      custData.map(cust => <MenuItem value={cust.cid}>({cust.cid}) {cust.name}</MenuItem>)
                    }
                  </Select>
                </FormControl>

                <FormGroup row>
                  <FormControlLabel
                    control={<Switch name="view-banned" checked={showBanned} onChange={() => setShowBanned(!showBanned)}/>}
                    label="View disabled accounts"
                  />
                </FormGroup>
              </Grid>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Package ID (pid)</TableCell>
                      <TableCell>Customer ID (pid)</TableCell>
                      <TableCell align="right">Customer Name</TableCell>
                      <TableCell align="right">Processed Date</TableCell>
                      <TableCell align="right">Tracking Number</TableCell>
                      <TableCell align="right">Ordered Date</TableCell>
                      <TableCell align="right">Courier</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.pid}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.cid}
                        </TableCell>
                        <TableCell align="right">{row.customer_name}</TableCell>
                        <TableCell align="right">{row.processed_date}</TableCell>
                        <TableCell align="right">{row.tracking_number}</TableCell>
                        <TableCell align="right">{row.ordered_date}</TableCell>
                        <TableCell align="right">{row.courier_name}</TableCell>
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
