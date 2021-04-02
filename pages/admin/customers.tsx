import Head from "next/head";
import Header from "../../components/Header";
import React, {FormEvent} from "react";
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
} from "@material-ui/core";
import Image from "next/image";
import { UserContext } from "components/UserState";
import InfoCard from "components/InfoCard";

interface Data {
  name: string;
}

export default function Login(): JSX.Element {
  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      if (!state) {
        return;
      }

      const resp = await fetch("/api/admin/customers", {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`,
        },
        method: "GET",
      });

      const data = await resp.json();

      setData(data.result);
    }

    fetchData();
  }, [state]);

  const handleDivisionQuery = async (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();
    const resp = await fetch("/api/customers", {
      headers: {},
      method: "GET",
    });

    const data = await resp.json();
    console.log({ resp, data });

    printResults(data);
  };

  const printResults = (data: Array<Data>) => {
    const nodeToDelete = document.getElementById("paragraphNode");

    if (nodeToDelete) {
      nodeToDelete.remove();
    }

    const paragraphNode = document.createElement("P");
    paragraphNode.id = "paragraphNode";

    if (!data.length) {
      const textNodeNoResults = document.createTextNode(
        `No customers have ordered packages using all the couriers`
      );
      paragraphNode.appendChild(textNodeNoResults);
    } else {
      const descriptionNode = document.createTextNode(
        `customers have ordered packages using all the couriers:`
      );
      paragraphNode.appendChild(descriptionNode);
      paragraphNode.appendChild(document.createElement("P"));

      for (let i = 0; i < data.length; i++) {
        let node = document.createTextNode(`${data[i].name}`);
        paragraphNode.appendChild(node);
        paragraphNode.appendChild(document.createElement("P"));
      }
    }

    document.getElementById("print_results").appendChild(paragraphNode);
    document.getElementById("print_results").style.display = "block";
  };

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Customers)" loading={!data}>
        <Grid
          container
          style={{
            height: "30vh",
          }}
          justify="center"
          alignContent="center"
          direction="row"
        >
          <Grid item xs={6}>
            <Grid
              container
              style={{
                backgroundColor: "white",
                height: "30vh"              }}
              justify="flex-start"
              alignContent="center"
              direction="column"
            >
              <h2>Using all couriers</h2>
              <p>
                Find recipients who have ordered packages that in total have
                been shipped using all the couriers.
              </p>
              <form
                style={{ width: "60%" }}
                onSubmit={handleDivisionQuery}
              >
                <div style={{ padding: "10px" }} />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Search
                </Button>
              </form>
              <div style={{ padding: "40px" }} />
              <div id="print_results" style={{ display: "none" }}></div>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          {data && (
            <>
              <p>Note: To add a new customer, register a new account</p>
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
                        <TableCell align="right">
                          {row.registration_date}
                        </TableCell>
                        <TableCell align="right">
                          {row.is_blacklisted ? "Yes" : "No"}
                        </TableCell>
                        <TableCell align="right">
                          {row.shipped_packages}
                        </TableCell>
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
