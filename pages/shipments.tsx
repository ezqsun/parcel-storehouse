import Head from "next/head";
import Header from "../components/Header";
import { UserContext } from "components/UserState";
import React, { FormEvent } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

interface Data {
  recipient_name: string;
}

export default class Shipments extends React.Component<{}> {
  private handleAverageWeight = async (e: FormEvent) => {
    //Prevent page from reloading
    e.preventDefault();
    const operator = (e.target as any).elements.comparison_operator.value;

    if(operator === "<" ||operator === ">"||operator === "="){
      const resp = await fetch("api/packages/shipments", {
        headers: {
          operator: operator
        },
        method: "GET",
      });
  
      const data = await resp.json();
      console.log({ resp, data });
  
      this.printResults(data, operator);

    }else{
      alert('Please enter a valid comparison operator: <, >, =');
    }

  };

  private printResults = (data: Array<Data>, operator: any) => {
    const nodeToDelete = document.getElementById("paragraphNode")

    if(nodeToDelete){
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

  public render() {
    return (
      <>
        <Head>
          <title>CPSC 304 Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header title="Admin" loading={false}>
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
                  <TextField
                    id="comparison_operator"
                    name="comparison_operator"
                    label="Operator: <, >, ="
                    variant="outlined"
                    fullWidth={true}
                  />
                  <div style={{ padding: "5px" }} />
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
        </Header>
      </>
    );
  }
}
