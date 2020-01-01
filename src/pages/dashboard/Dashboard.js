import React, { useState, useEffect } from "react";
import {
  Grid,
} from "@material-ui/core";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Table from "./components/Table/Table";

import DashboardService from '../../services/Dashboard'


const Dashboard = () => {
  var classes = useStyles();

  const [dashboard, setDashboard] = useState({inventory:[]});
  //Initialized
  useEffect(() => {
    const fetchData = async () => {
      const result = await DashboardService.info();
      setDashboard(result.data);
    };

    fetchData();
  }, []);


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
                {dashboard.sales}
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
                {dashboard.product}
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
                {dashboard.outlet}
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
                {dashboard.employee}
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
            title="Low Stock Inventories"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={dashboard.inventory} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
