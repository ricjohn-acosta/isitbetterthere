import { Pie } from "react-chartjs-2";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { getChartData } from "./utils/getChartData";

const Charts = ({ experiences }) => {
  return (
    <Grid container direction="column" spacing={10}>
      {console.log(getChartData("fulfillment", experiences))}
      <Grid item container direction="row">
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          xs={12}
          sm={12}
          md={6}
        >
          <Typography variant="h4" component="span">
            How many people found this transition fulfilling?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Pie data={getChartData("fulfillment", experiences)} />
        </Grid>
      </Grid>

      <Grid item container direction="row">
        <Grid
          item
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          xs={12}
          sm={12}
          md={6}
        >
          <Typography variant="h4" component="span">
            How many people thought this transition was a challenging task?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Pie data={getChartData("ease", experiences)} />
        </Grid>
      </Grid>

      <Grid item container direction="row">
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          item
          xs={12}
          sm={12}
          md={6}
        >
          <Typography variant="h4" component="span">
            How many people wish they had not done the transition?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Pie data={getChartData("regret", experiences)} />
        </Grid>
      </Grid>

      <Grid item container direction="row">
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          item
          xs={12}
          sm={12}
          md={6}
        >
          <Typography variant="h4" component="span">
            Where is everyone from?
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Pie data={getChartData("fulfillment", experiences)} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Charts;
