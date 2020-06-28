import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Link from "@material-ui/core/Link";
import { useRouter } from "next/router";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const StyledBrand = styled(Typography)`
  color: #484848;
  margin-right: 1.5vw;
  margin-top: 1.5vh;
  font-weight: bold;
`;

const BrandLogo = () => {
  const router = useRouter();
  const down1347 = useMediaQuery("(max-width:1374px)");
  const down959 = useMediaQuery("(max-width:959px)");
  return (
    <>
      <StyledBrand
        variant={down1347 && !down959 ? "h5" : "h4"}
        component={Link}
        href="/"
        underline="none"
      >
        IsItBetterThere
      </StyledBrand>
    </>
  );
};

export default BrandLogo;
