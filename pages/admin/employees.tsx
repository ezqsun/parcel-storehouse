import Head from "next/head";
import Header from "../../components/Header";
import React from "react";
import {
  Button, 
  CircularProgress,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@material-ui/core";
import Image from "next/image";
import { UserContext } from "components/UserState";
import InfoCard from "components/InfoCard";

interface FormControlEvent extends React.FormEvent<HTMLInputElement> {
  currentTarget: HTMLInputElement;
}

export default function Login(): JSX.Element {
  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      if (!state) {
        return;
      }

      const resp = await fetch("/api/admin/employees", {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`,
        },
        method: "GET",
      });

      const data = await resp.json();

      setData(data);
    }

    fetchData();
  }, [state]);

  const handleDeleteEmployee = async (e: FormControlEvent) => {
    e.preventDefault();
    const eid = (e.target as any).elements.deleteEid.value;

    const deleteEmployee = {
      deleteEid: eid,
    };
    console.log(deleteEmployee);
    console.log(`/api/employees/${eid}`);
    console.log(JSON.stringify(deleteEmployee));

    const resp = await fetch(`/api/employees/${eid}`, {
      body: JSON.stringify(deleteEmployee),
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    const data = await resp.json();
    console.log({ resp, data });
  };

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Employees)" loading={!data}>
        <Grid item xs={4}>
          <Grid
            container
            style={{
              backgroundColor: "white",
              height: "calc(30vh)",
            }}
            justify="flex-start"
            alignContent="center"
            direction="column"
          >
            <h2>Delete existing employee</h2>
            <form style={{ width: "60%" }} onSubmit={handleDeleteEmployee}>
              <TextField
                id="deleteEid"
                name="deleteEid"
                label="EID"
                variant="outlined"
                fullWidth={true}
              />
              <div style={{ padding: "10px" }} />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Delete
              </Button>
            </form>
          </Grid>
        </Grid>
        <Grid container>
          {data && (
            <>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee ID (eid)</TableCell>
                      <TableCell align="right">Address</TableCell>
                      <TableCell align="right">Position</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Phone Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.result.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.eid}
                        </TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.position}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.phone_number}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
      </Header>
    </>
  );
}
