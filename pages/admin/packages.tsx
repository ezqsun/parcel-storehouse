import Head from "next/head";
import Header from "../../components/Header";
import React, { FormEvent } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import Image from "next/image";
import { UserContext } from "components/UserState";
import InfoCard from "components/InfoCard";

interface Data {
  recipient_name: string;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default function Login(): JSX.Element {
  const classes = useStyles();

  const [state] = React.useContext(UserContext);
  const [data, setData] = React.useState(null);
  const [custData, setCustData] = React.useState([]);

  const [year, setYear] = React.useState(0);
  const [cust, setCust] = React.useState(-1);
  const [showBanned, setShowBanned] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      if (!state) {
        return;
      }
      const resp = await fetch("/api/admin/packages", {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`,
          year: year.toString(),
          cid: cust.toString(),
          showbanned: showBanned ? "yes" : "no",
        },
        method: "GET",
      });
      const data = await resp.json();
      console.log("updated");
      setData(data.result);

      if (custData.length != 0) {
        return;
      }

      const custResp = await fetch("/api/admin/customers", {
        headers: {
          Authorization: `${state.token_type} ${state.access_token}`,
        },
        method: "GET",
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

  const handleAverageWeight = async (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();
    const operator = (e.target as any).elements.comparison_operator.value;

    if (operator === "<" || operator === ">" || operator === "=") {
      const resp = await fetch("/api/packages/shipments", {
        headers: {
          operator: operator,
        },
        method: "GET",
      });

      const data = await resp.json();
      console.log({ resp, data });

      printResults(data, operator);
    } else {
      alert("Please enter a valid comparison operator: <, >, =");
    }
    (document.getElementById("avgForm") as any).reset();
  };

  const printResults = (data: Array<Data>, operator: any) => {
    const nodeToDelete = document.getElementById("paragraphNode");

    if (nodeToDelete) {
      nodeToDelete.remove();
    }

    const paragraphNode = document.createElement("P");
    paragraphNode.id = "paragraphNode";

    if (!data.length) {
      const textNodeNoResults = document.createTextNode(` No recipients receive packages with an average weight ${operator} to the
      overall average weight of all shipments`);
      paragraphNode.appendChild(textNodeNoResults);
    } else {
      const descriptionNode = document.createTextNode(`The following recipients receive packages with an average weight ${operator} to the
      overall average weight of all shipments:`);
      paragraphNode.appendChild(descriptionNode);
      paragraphNode.appendChild(document.createElement("P"));

      for (let i = 0; i < data.length; i++) {
        let node = document.createTextNode(`${data[i].recipient_name}`);
        paragraphNode.appendChild(node);
        paragraphNode.appendChild(document.createElement("P"));
      }
    }

    document.getElementById("print_results").appendChild(paragraphNode);
    document.getElementById("print_results").style.display = "block";
  };

  const handleInsertPackage = async (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();
    const newPackage = (e.target as any).elements;

    const resp = await fetch("/api/packages", {
      body: JSON.stringify({
        cid: newPackage.cid.value,
        bid: newPackage.bid.value,
        eid: newPackage.eid.value,
        nid: newPackage.nid.value,
        tracking_number: newPackage.tracking_number.value,
        processed_date: newPackage.processed_date.value,
        ordered_date: newPackage.ordered_date.value,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const data = await resp.json();
    console.log({ resp, data });
    (document.getElementById("insertForm") as any).reset();
    alert("Successfully added new package!");
  };

  const handleDeletePackage = async (e: FormEvent) => {
    e.preventDefault();
    const pid = (e.target as any).elements.deletePid.value;
    const deletePackage = {
      deletePid: pid,
    };
    console.log(deletePackage);
    console.log(`/api/packages/${pid}`);
    console.log(JSON.stringify(deletePackage));

    const resp = await fetch(`/api/packages/${pid}`, {
      body: JSON.stringify(deletePackage),
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
    const data = await resp.json();
    console.log({ resp, data });
    (document.getElementById("deleteForm") as any).reset();
    alert("Successfully deleted package!");
  };

  const handlePickup = async (e: FormEvent) => {
    e.preventDefault();
    const isPickedUp = (e.target as any).elements.isPickedUp.value;
    console.log(isPickedUp);
    console.log(`/api/packages/${(e.target as any).elements.pickupPid.value}`);
    const resp = await fetch(
      `/api/packages/${(e.target as any).elements.pickupPid.value}`,
      {
        body: JSON.stringify({
          isPickedUp: isPickedUp,
        }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      }
    );
    const data = await resp.json();
    console.log({ resp, data });
    (document.getElementById("updateForm") as any).reset();
    alert("Successfully updated package pickup status!");
  };

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Admin (Packages)" loading={!data}>
        <Grid container>
          {data && (
            <>
              <p>Filters</p>

              <Grid container>
                <FormControl variant="outlined" className={classes.formControl}>
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
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="customer-select-outlined-label">
                    Filter by customer
                  </InputLabel>
                  <Select
                    labelId="cust"
                    id="customer-select"
                    value={cust}
                    onChange={(e) => setCust(e.target.value as number)}
                    label="Filter by customer"
                  >
                    <MenuItem value={-1}>No Filter</MenuItem>
                    {custData.map((cust) => (
                      <MenuItem value={cust.cid}>
                        ({cust.cid}) {cust.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        name="view-banned"
                        checked={showBanned}
                        onChange={() => setShowBanned(!showBanned)}
                      />
                    }
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
                        <TableCell align="right">
                          {row.processed_date}
                        </TableCell>
                        <TableCell align="right">
                          {row.tracking_number}
                        </TableCell>
                        <TableCell align="right">{row.ordered_date}</TableCell>
                        <TableCell align="right">{row.courier_name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Grid>
        <div style={{ padding: "30px" }} />

        <Grid container>
          <Grid item xs={4}>
            <Grid
              container
              style={{
                backgroundColor: "white",
                height: "calc(100vh - 64px)",
              }}
              justify="flex-start"
              alignContent="center"
              direction="column"
            >
              <h2>Add new package</h2>
              <form
                style={{ width: "80%" }}
                onSubmit={handleInsertPackage}
                id="insertForm"
              >
                <TextField
                  id="cid"
                  name="cid"
                  label="Customer CID"
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />
                <TextField
                  id="tracking_number"
                  name="tracking_number"
                  label="Tracking Number"
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="ordered_date"
                  name="ordered_date"
                  label="Ordered Date"
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="processed_date"
                  name="processed_date"
                  label="Processed Date"
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="nid"
                  name="nid"
                  label="Courier"
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="bid"
                  name="bid"
                  label="Branch"
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="eid"
                  name="eid"
                  label="Employee"
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
                  Add
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              style={{
                backgroundColor: "white",
                height: "calc(100vh - 64px)",
              }}
              justify="flex-start"
              alignContent="center"
              direction="column"
            >
              <h2>Delete existing package</h2>
              <form
                id="deleteForm"
                style={{ width: "80%" }}
                onSubmit={handleDeletePackage}
              >
                <TextField
                  id="deletePid"
                  name="deletePid"
                  label="PID"
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
          <Grid item xs={4}>
            <Grid
              container
              style={{
                backgroundColor: "white",
                height: "calc(100vh - 64px)",
              }}
              justify="flex-start"
              alignContent="center"
              direction="column"
            >
              <h2>Update pick-up status</h2>
              <form
                style={{ width: "80%" }}
                onSubmit={handlePickup}
                id="updateForm"
              >
                <TextField
                  id="pickupPid"
                  name="pickupPid"
                  label="PID"
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="isPickedUp"
                  name="isPickedUp"
                  label="Picked up: true or false"
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
                  Update
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              style={{
                backgroundColor: "white",
              }}
              justify="flex-start"
              alignContent="center"
              direction="column"
            >
              <h2>Shipment packages</h2>
              <p>
                Find recipients who receive shipment packages with an average
                weight that is equal to the average weight of all shipped
                packages.
              </p>
              <form
                style={{ width: "60%" }}
                onSubmit={handleAverageWeight}
                id="avgForm"
              >
                <TextField
                  id="comparison_operator"
                  name="comparison_operator"
                  label="Operator: <, >, ="
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
                  Search
                </Button>
              </form>
              <div style={{ padding: "20px" }} />
              <div id="print_results" style={{ display: "none" }}></div>
            </Grid>
          </Grid>
        </Grid>
      </Header>
    </>
  );
}
