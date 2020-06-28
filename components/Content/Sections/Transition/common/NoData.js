import styled from "styled-components";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const Message = styled.div`
  display: flex;
  justify-content: center;
  margin: 25%;
  font-style: italic;
  color: grey;
`;

const NoData = () => {
  return (
    <Message>
      <Typography
        variant="h6"
        component={Link}
        underline="always"
        href="/share"
      >
        BE THE FIRST TO CONTRIBUTE!
      </Typography>
    </Message>
  );
};

export default NoData;
