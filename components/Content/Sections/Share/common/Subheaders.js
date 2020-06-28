import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const Wrapper = styled.div`
  display: inline-flex;
  margin-top: 2.5vh;
`;
const StyledTypography = styled(Typography)`
  font-weight: bold;
  padding-top: 25px;
`;

const Icon = styled.img`
  height: auto;
  width: auto;
  max-width: 40px;
  max-height: 40px;
  margin-top: 25px;
  margin-right: 10px;
`;

const Subheaders = ({ icon, children }) => {
  return (
    <Wrapper>
      <Icon src={icon} />
      <StyledTypography component="span" variant="h4">
        {children}
      </StyledTypography>
    </Wrapper>
  );
};

export default Subheaders;
