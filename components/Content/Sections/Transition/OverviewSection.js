import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Charts from "./Charts";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  expansionPanelSummaryContent: {
    display: "flex",
    justifyContent:"center"
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
    padding: 0 30px 30px 30px;
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
  padding: 0 200px 0 200px;

  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0;
  }
`;

const OverviewSection = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      <Wrapper>
        <Container container direction="row">
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="fulfillment.png" />
            <TransitionQualities>
              79% found this transition fulfilling
            </TransitionQualities>
          </GridItems>
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="easeoftransition.png" />
            <TransitionQualities>
              48% consider this an easy transition{" "}
            </TransitionQualities>
          </GridItems>
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="regret.png" />
            <TransitionQualities>
              1% regret going through this transition{" "}
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
                <Typography>
                  {expanded ? "Hide details" : "Show details"}
                </Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetailsContainer>
              <Charts />
            </ExpansionPanelDetailsContainer>
          </ExpansionPanel>
        </ExpansionContainer>
      </Wrapper>
    </>
  );
};

export default OverviewSection;
