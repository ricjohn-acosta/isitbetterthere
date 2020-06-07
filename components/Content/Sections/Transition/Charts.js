import { Pie } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const data = {
  labels: ["Fulfilled", "Not fulfilled", "Mixed"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const Charts = () => {
  return (
    <Grid container direction="column" spacing={10}>
      <Grid item container direction="row">
        <Grid
          item
          style={{ display: "flex", alignItems: "center" }}
          xs={12}
          sm={12} md={6}
        >
          <Typography variant="h4" component="span">
            How many people found this transition fulfilling?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Pie data={data} />
        </Grid>
      </Grid>

      <Grid item container direction="row">
        <Grid
          item
          style={{ display: "flex", alignItems: "center" }}
          xs={12}
          sm={12} md={6}
        >
          <Typography variant="h4" component="span">
            How many people thought this transition was a challenging task?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Pie data={data} />
        </Grid>
      </Grid>

      <Grid item container direction="row">
        <Grid
          style={{ display: "flex", alignItems: "center" }}
          item
          xs={12}
          sm={12} md={6}
        >
          <Typography variant="h4" component="span">
            How many people wish they had not done the transition?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Pie data={data} />
        </Grid>
      </Grid>

      <Grid item container direction="row">
        <Grid
          style={{ display: "flex", alignItems: "center" }}
          item
          xs={12}
          sm={12} md={6}
        >
          <Typography variant="h4" component="span">
            Where is everyone from?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Pie data={data} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Charts;
