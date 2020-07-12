import styled, { keyframes } from "styled-components";
import moment from "moment";
import draftToHtml from "draftjs-to-html";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import ContributionExperienceModal from "./ContributionExperienceModal";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { connect } from "react-redux";
import { deleteExperience } from "../../../../store/actions/experiences";
const HtmlToReactParser = require("html-to-react").Parser;
const htmlToReactParser = new HtmlToReactParser();

const Wrapper = styled(Paper)``;
const RightGrid = styled(Grid)`
  text-align: right;
  background-color: #F0F0F0;
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
  from,
  to,
  story,
  datePosted,
  helpfulRating,
  contributions,
  setContributions,
  deleteExperience
}) => {
  const [modalView, setModalView] = React.useState(false);
  const [storyPreview, setStoryPreview] = React.useState(htmlToReactParser.parse(draftToHtml(JSON.parse(story))))

  const handleView = () => {
    setModalView(true);
  };

  const handleDelete = (id) => {
    setContributions(contributions.filter(experience => experience.experience_id !== id))
    deleteExperience({experience_id: id})
  }

  return (
    <Wrapper variant="outlined">
      <Grid container direction="row">
        <LeftGrid item xs={12} sm={9}>
          <Typography variant="h5">
            {from} <ArrowForwardIcon fontSize="small"/> {to}{" "}
          </Typography>
        </LeftGrid>
        <RightGrid item xs={12} sm={3}>
          <ContributionDetails>
            <Typography variant="body2">{moment(datePosted).format("DD MMM YYYY")}</Typography>
            <Typography variant="body2"><b>{helpfulRating}</b> {helpfulRating === 1 ? "user" : "users"} found this helpful</Typography>
            <br />
            <Button color="primary" variant="contained" size="small" onClick={() => handleDelete(experienceId)}>Delete</Button>&nbsp;
            <Button color="primary" variant="contained" size="small" onClick={handleView}>
              READ
            </Button>
          </ContributionDetails>
        </RightGrid>
      </Grid>
      <ContributionExperienceModal
        experienceId={experienceId}
        modalView={modalView}
        setModalView={setModalView}
        storyPreview={storyPreview}
        setStoryPreview={setStoryPreview}
        rawStoryPreview={story}
      />
    </Wrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteExperience: (experienceId) => dispatch(deleteExperience(experienceId)),
  };
};

export default connect(null, mapDispatchToProps)(Contribution);
