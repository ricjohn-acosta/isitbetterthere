import styled, { keyframes } from "styled-components";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import ViewExperienceModal from "./ContributionExperienceModal";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Wrapper = styled(Paper)``;
const RightGrid = styled(Grid)`
  text-align: right;
  background-color: #ccffff;
`;

const LeftGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContributionDetails = styled.div`
  padding: 2.5%;
`;

const Contribution = ({
  experienceId,
  category,
  from,
  to,
  story,
  datePosted,
  helpfulRating,
}) => {
  const router = useRouter();
  const [modalView, setModalView] = React.useState(false);
  const storyPreview = htmlToReactParser.parse(draftToHtml(JSON.parse(story)));

  const handleView = () => {
    setModalView(true);
  };

  return (
    <Wrapper variant="outlined">
      <Grid container direction="row">
        <LeftGrid item xs={12} sm={9}>
          <Typography variant="h5">
            {from} to {to}{" "}
          </Typography>
        </LeftGrid>
        <RightGrid item xs={12} sm={3}>
          <ContributionDetails>
            <Typography variant="body2">{datePosted}</Typography>
            <Typography variant="body2">{helpfulRating} users found this helpful</Typography>
            <br />
            <Button variant="outlined">Delete</Button>&nbsp;
            <Button variant="outlined" onClick={handleView}>
              View
            </Button>
          </ContributionDetails>
        </RightGrid>
      </Grid>
      <ViewExperienceModal
        modalView={modalView}
        setModalView={setModalView}
        storyPreview={storyPreview}
      />
    </Wrapper>
  );
};

export default Contribution;
