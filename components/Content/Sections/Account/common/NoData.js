import styled from "styled-components";
import {Typography} from "@material-ui/core";

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) =>
    props.source === "HelpfulStory" ? "2.5vh;" : "5vh;"}
  margin-bottom: ${(props) =>
    props.source === "HelpfulStory" ? "2.5vh;" : "5vh;"}
  font-style: italic;
  color: #c8c8c8;
`;
const NoData = ({ children, source }) => {
  return (
    <StyledTypography variant="h6" source={source}>
      {children}
    </StyledTypography>
  );
};

export default NoData;
