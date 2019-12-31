import React, { useState } from "react";
import {
  Grid,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Table from "./components/Table/Table";


export default function Dashboard() {
  var classes = useStyles();

  return (
    <>
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={3} xs={12}>
          <Widget
            title="Total Sales"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                12, 678
              </Typography>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={3} xs={12}>
          <Widget
            title="Total Product"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                12, 678
              </Typography>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={3} xs={12}>
          <Widget
            title="Total Outlet"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                12, 678
              </Typography>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
            </Grid>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={3} xs={12}>
          <Widget
            title="Total Employee"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                12, 678
              </Typography>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
            </Grid>
          </Widget>
        </Grid>

        <Grid item xs={12}>
          <Widget
            title="Inventory Lists"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
