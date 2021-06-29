import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Charts from "./Charts";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { getExperiences } from "../../../../store/actions/api/experiences";
import { connect } from "react-redux";
import NoData from "./common/NoData";

const useStyles = makeStyles({
  expansionPanelSummaryContent: {
    display: "flex",
    justifyContent: "center",
  },
});

const Wrapper = styled.div`
  min-height: 10vh;
  padding: 0 50px 0 50px;
`;

const Container = styled(Grid)`
  padding: 0 5% 0 5%;
`;

const GridItems = styled(Grid)`
  padding: 0 50px 50px 50px;

  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0 30px 50px 30px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const TransitionQualities = styled.span`
  color: grey;
  font-size: 1rem;
`;

const ExpansionContainer = styled.div`
  // width: 70%;
  // margin-left: 16%;
  // margin-right: 16%;
`;

const ExpansionPanelDetailsContainer = styled(ExpansionPanelDetails)`
  padding: 0 200px 5vh 200px;

  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
  }
`;

const OverviewSection = ({ from, to, getExperiences, allExperiences }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const getPercentages = (quality) => {
    switch (quality) {
      case "fulfillment":
        let numFulfilled = 0;
        allExperiences.forEach((e) => {
          if (e.fulfillment === "Fulfilled") {
            numFulfilled++;
          }
        });
        return numFulfilled !== 0
          ? Math.floor((100 - numFulfilled / 3).toFixed(0))
          : 0;

      case "ease":
        let numEase = 0;
        allExperiences.forEach((e) => {
          if (e.ease_of_transition === "Easy") {
            numEase++;
          }
        });
        return numEase !== 0 ? Math.floor((100 - numEase / 3).toFixed(0)) : 0;

      case "regret":
        let numRegret = 0;
        allExperiences.forEach((e) => {
          if (e.regret === "Did regret") {
            numRegret++;
          }
        });
        return numRegret !== 0 ? 100 - (100 - numRegret / 2).toFixed(1) : 0;
      default:
        break;
    }
  };
  return (
    <>
      <Wrapper>
        {console.log(allExperiences)}

        <Container container direction="row">
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="fulfillment.png" />
            <TransitionQualities>
              {getPercentages("fulfillment") +
                "% found this transition fulfilling"}
            </TransitionQualities>
          </GridItems>
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="easeoftransition.png" />
            <TransitionQualities>
              {getPercentages("ease") + "% consider this an easy transition"}
            </TransitionQualities>
          </GridItems>
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="regret.png" />
            <TransitionQualities>
              {getPercentages("regret") +
                "% regret going through this transition"}
            </TransitionQualities>
          </GridItems>
        </Container>
        <ExpansionContainer>
          <ExpansionPanel
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
          >
            <ExpansionPanelSummary
              classes={{ content: classes.expansionPanelSummaryContent }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div style={{ textAlign: "center" }}>
                <Typography style={{fontWeight: "bold"}}>
                  {expanded ? "Hide details" : "Show details"}
                </Typography>
              </div>
            </ExpansionPanelSummary>
            {allExperiences.length !== 0 ? (
              <ExpansionPanelDetailsContainer>
                <Charts allExperiences={allExperiences} />
              </ExpansionPanelDetailsContainer>
            ) : (
              <NoData />
            )}
          </ExpansionPanel>
        </ExpansionContainer>
      </Wrapper>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExperiences: (from, to) => dispatch(getExperiences(from, to)),
  };
};

export default connect(null, mapDispatchToProps)(OverviewSection);
