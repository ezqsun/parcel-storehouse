import Head from "next/head";
import Header from "../components/Header";
import { UserContext } from "components/UserState";
import React, { FormEvent } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { Courier } from "../lib/models/couriers";
import { Package } from "../lib/models/packages";
import { BookOutlined, StarRateRounded } from "@material-ui/icons";

export default class Packages extends React.Component<{}, Package> {
  public state = {
    cid: null,
    bid: null,
    eid: null,
    nid: null,
    tracking_number: "",
    processed_date: "",
    ordered_date: "",
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    this.setState({
      ...this.state,
      [name]: value,
    });
    console.log(this.state);
  };

  private handleInsertPackage = async (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();
    console.log(JSON.stringify(this.state));

    const resp = await fetch("/api/packages", {
      body: JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const data = await resp.json();
    console.log({ resp, data });
  };

  private handleDeletePackage = async (e: FormEvent) => {
    e.preventDefault();
    const pid = e.target.elements.deletePid.value;
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
  };

  private handlePickup = async (e: FormEvent) => {
    e.preventDefault();
    const isPickedUp = e.target.elements.isPickedUp.value;
    console.log(isPickedUp);
    console.log(`/api/packages/${e.target.elements.pickupPid.value}`);
    const resp = await fetch(
      `/api/packages/${e.target.elements.pickupPid.value}`,
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
  };

  // //load couriers in dropdown
  // let couriers = await query<Couriers>("SELECT name FROM couriers", [])
  public render() {
    return (
      <>
        <Head>
          <title>CPSC 304 Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header title="Packages" />
        <div style={{ padding: "20px" }} />
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
                style={{ width: "60%" }}
                onSubmit={this.handleInsertPackage}
              >
                <TextField
                  id="cid"
                  name="cid"
                  label="Customer name"
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />
                <TextField
                  id="tracking_number"
                  name="tracking_number"
                  label="Tracking Number"
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="ordered_date"
                  name="ordered_date"
                  label="Ordered Date"
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="processed_date"
                  name="processed_date"
                  label="Processed Date"
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="nid"
                  name="nid"
                  label="Courier"
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="bid"
                  name="bid"
                  label="Branch"
                  onChange={this.onChange}
                  variant="outlined"
                  fullWidth={true}
                />
                <div style={{ padding: "5px" }} />

                <TextField
                  id="eid"
                  name="eid"
                  label="Employee"
                  onChange={this.onChange}
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
                style={{ width: "60%" }}
                onSubmit={this.handleDeletePackage}
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
              <form style={{ width: "60%" }} onSubmit={this.handlePickup}>
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
                  label="Picked up"
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
        </Grid>
      </>
    );
  }
}
