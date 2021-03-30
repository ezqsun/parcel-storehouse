import Head from "next/head";
import Header from "../components/Header";
import { UserContext } from "components/UserState";
import React, { FormEvent } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import db from "../lib/db" ;

export default function Packages(): JSX.Element {
  const [state, dispatch] = React.useContext(UserContext);

  const handleInsertPackage = async (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();
    const resp = await fetch("/api/auth/login", {
      body: "{}",
      headers: {
        username: e.target.elements.email.value,
        password: e.target.elements.pass.value,
      },
      method: "POST",
    });




  };

  return (
    <>
      <Head>
        <title>CPSC 304 Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title="Packages" />
      <Grid container>
        <Grid item xs={4}>
          <Grid
            container
            style={{ backgroundColor: "white", height: "calc(100vh - 64px)" }}
            justify="center"
            alignContent="center"
            direction="column"
          >
            <form style={{ width: "60%" }} onSubmit={handleInsertPackage}>
              <TextField
                id="customer"
                name="customer"
                label="Customer name"
                variant="outlined"
                fullWidth={true}
              />
              <div style={{ padding: "10px" }} />
              <TextField
                id="trackingNumber"
                name="trackingNumber"
                label="Tracking Number"
                variant="outlined"
                fullWidth={true}
              />
              <TextField
                id="orderedDate"
                name="orderedDate"
                label="Ordered Date"
                variant="outlined"
                fullWidth={true}
              />
              <TextField
                id="processedDate"
                name="processedDate"
                label="Processed Date"
                variant="outlined"
                fullWidth={true}
              />
              <TextField
                id="courier"
                name="courier"
                label="Courier"
                variant="outlined"
                fullWidth={true}
              />
              <TextField
                id="branch"
                name="branch"
                label="Branch"
                variant="outlined"
                fullWidth={true}
              />
              <TextField
                id="employee"
                name="employee"
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
                Login
              </Button>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
