import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

{
  /* <Paper style={{ margin: "0 10% 0 10%", padding: "5% 10% 10% 10%" }}> */
}

const StyledPaper = styled(Paper)`
  display: inline-block;
  padding: 0 10% 10% 10%;
  width: 100%;

  ${(props) => props.theme.breakpoints.down(441)} {
    margin: 0; 
    padding: 0 10% 10% 10%;
  }
`;

const PaperWrapper = ({ children }) => {
  return <><StyledPaper>{children}</StyledPaper><br/></>;
};

export default PaperWrapper;
