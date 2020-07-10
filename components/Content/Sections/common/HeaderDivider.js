import styled from "styled-components";

const StyledHr = styled.hr`
  border: 0;
  height: 1px;
  background: rgb(207,203,203);
  background: radial-gradient(circle, rgba(207,203,203,1) 50%, rgba(255,255,255,1) 100%);
`;
const HeaderDivider = () => {
    return (
        <StyledHr/>
    );
};

export default HeaderDivider;