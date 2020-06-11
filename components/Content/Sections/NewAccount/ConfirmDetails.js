import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Wrapper = styled.div`
  min-height: 15vh;
  margin: 5vh 10vw 2.5vh 2.5vw;
`;

const ConfirmDetails = () => {
  return (
    <Wrapper>
      <Typography variant="h5">
        How did you find out about this website?
      </Typography>
      <br />
      <Select fullWidth variant="outlined">
        <MenuItem value="Word of mouth">Word of mouth</MenuItem>
        <MenuItem value="Instagram">Instagram</MenuItem>
        <MenuItem value="LinkedIn">LinkedIn</MenuItem>
      </Select>
    </Wrapper>
  );
};

export default ConfirmDetails;
