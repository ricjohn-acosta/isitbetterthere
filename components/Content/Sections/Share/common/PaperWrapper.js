import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

{
  /* <Paper style={{ margin: "0 10% 0 10%", padding: "5% 10% 10% 10%" }}> */
}

const StyledPaper = styled(Paper)`
  margin: 0 10% 0 10%;
  padding: 5% 10% 10% 10%;
`;

const PaperWrapper = ({ children }) => {
  return <StyledPaper>{children}</StyledPaper>;
};

export default PaperWrapper;
