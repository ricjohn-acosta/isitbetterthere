import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Charts from "./Charts";
import Grid from "@material-ui/core/Grid";

const Wrapper = styled.div`
  min-height: 80vh;
  padding: 0 50px 0 50px;
`;

const Container = styled(Grid)`
  padding: 0 5% 0 5%;
`;

const GridItems = styled(Grid)`
  padding: 0 50px 50px 50px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const TransitionQualities = styled.span`
  color: grey;
`;

const Test = styled.div`
  width: 70%;
  margin-left: 16%;
  margin-right: 16%;
`

const OverviewSection = () => {
  const [expanded, setExpanded] = React.useState(true);
  return (
    <>
      <Wrapper>
        <Container container direction="row">
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="fulfillment.png" />
            <TransitionQualities>
              12% found this transition fulfilling
            </TransitionQualities>
          </GridItems>
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="easeoftransition.png" />
            <TransitionQualities>
              35% people consider this an easy transition{" "}
            </TransitionQualities>
          </GridItems>
          <GridItems item xs={12} sm={12} md={4} align="center">
            <StyledImage src="regret.png" />
            <TransitionQualities>
              1% regret undertaking this transition{" "}
            </TransitionQualities>
          </GridItems>
        </Container>
        <Test>
          <ExpansionPanel
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{expanded ? "Hide data" : "Show data"}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Charts />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Test>
        
      </Wrapper>
    </>
  );
};

export default OverviewSection;
