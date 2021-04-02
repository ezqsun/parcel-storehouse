import Head from 'next/head';
import Header from '../../components/Header';
import React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Image from 'next/image';
import { UserContext } from 'components/UserState';
import dynamic from 'next/dynamic'

const ChartComponent = dynamic(() => import('components/Chart'), {
  ssr: false
})


export default function Login(): JSX.Element {

  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null)
  const [chartData, setChartData] = React.useState([]);

  const [year, setYear] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      if (!state) {
        return;
      }

      const resp = await fetch('/api/admin/bundle', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`
        },
        method: 'GET'
      });

      const data = await resp.json();
      setData(data.result);

      const chartResp = await fetch('/api/admin/weightvis', {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`,
          year: year.toString()
        },
        method: 'GET'
      });

      const chartDataTemp = await chartResp.json();

      console.log(chartDataTemp)

      setChartData(chartDataTemp.result);
    }
    fetchData();

  }, [state, year]);

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

      <Header title="Admin (Shipment Bundles)" loading={!data}>
        <Grid container>
          {
            data &&
            <>
              <div style={{ display: 'flex', width: '100%' }}>

                <FormControl variant="outlined" style={{ flex: 1 }}>
                  <InputLabel id="year-select-outlined-label">
                    Filter by year
                  </InputLabel>
                  <Select
                    labelId="year"
                    id="year-select"
                    value={year}
                    onChange={(e) => setYear(e.target.value as number)}
                    label="Filter by year"
                  >
                    <MenuItem value={0}>No Filter</MenuItem>
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <ChartComponent title="Total weight of all shipment bundles shipped on a given date"
                x={chartData.map(x => x['shipping_date'])}
                y={chartData.map(y => y['total_weight'])} />
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Bundle ID (sbid)</TableCell>
                      <TableCell>Customer ID (cid)</TableCell>
                      <TableCell align="right">recipient_name</TableCell>
                      <TableCell align="right">weight</TableCell>
                      <TableCell align="right">shipping_date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.sbid}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.cid}
                        </TableCell>
                        <TableCell align="right">{row.recipient_name}</TableCell>
                        <TableCell align="right">{row.weight}</TableCell>
                        <TableCell align="right">{row.shipping_date}</TableCell>
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
