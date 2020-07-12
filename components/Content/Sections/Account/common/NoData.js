import styled, { keyframes } from "styled-components";
import { Typography } from "@material-ui/core";

const StyledTypography = styled(Typography)`
display: flex;
justify-content: center;
align-items: center;
margin-top: 5vh;
  font-style: italic;
  color: #C8C8C8;
`;
const NoData = ({ children }) => {
  return <StyledTypography variant="h6">{children}</StyledTypography>;
};

export default NoData;
