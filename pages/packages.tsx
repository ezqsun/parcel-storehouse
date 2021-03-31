import Head from "next/head";
import Header from "../components/Header";
import { UserContext } from "components/UserState";
import React, { FormEvent } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { Courier } from "../lib/models/couriers";
import { Package } from "../lib/models/packages";
import { StarRateRounded } from "@material-ui/icons";

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

    const resp = await fetch("/api/profile/packages", {
      body: JSON.stringify(this.state),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

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

        <Header title="Admin">
          <Grid container>
            <Grid item xs={4}>
              <Grid
                container
                style={{ backgroundColor: "white", height: "calc(100vh - 64px)" }}
                justify="center"
                alignContent="center"
                direction="column"
              >
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
          </Grid>
        </Header>
      </>
    );
  }
}
