import Head from "next/head";
import Header from "../components/Header";
import { UserContext } from "components/UserState";
import React, { FormEvent } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { BookOutlined, StarRateRounded } from "@material-ui/icons";

interface Data {
  recipient_name: string;
}

export default class Shipments extends React.Component<{}> {
  private handleAverageWeight = async (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();
    const resp = await fetch("api/packages/shipments", {
      headers: {},
      method: "GET",
    });

    const data = await resp.json();
    console.log({ resp, data });

    this.printResults(data);
  };

  private printResults = (data: Array<Data>) => {
    const paragraphNode = document.createElement("P");


    if (!data.length) {
      const textNodeNoResults = document.createTextNode(` No recipients receive packages with an average weight equal to the
      overall average weight of all shipments`);
      paragraphNode.appendChild(textNodeNoResults);
    } else {
      const descriptionNode = document.createTextNode(`The following recipients receive packages with an average weight equal to the
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

  public render() {
    return (
      <>
        <Head>
          <title>CPSC 304 Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header title="Shipment Packages" />
        <Grid
          container
          style={{
            height: "100vh",
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
                height: "calc(100vh - 64px)",
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
                onSubmit={this.handleAverageWeight}
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
      </>
    );
  }
}
