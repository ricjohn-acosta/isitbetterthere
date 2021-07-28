import styled from "styled-components";
import {default as MuiLink} from "@material-ui/core/Link";
import {useRouter} from "next/router";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {default as NextLink} from 'next/link'
import React from 'react';

const StyledBrand = styled(MuiLink)`
  color: #484848;
  margin-right: 1.5vw;
  margin-top: 1.6vh;
  font-weight: bold;
`;

const BrandLogo = () => {
    const router = useRouter();
    const down1347 = useMediaQuery("(max-width:1374px)");
    const down959 = useMediaQuery("(max-width:959px)");

    return (
        <React.Fragment>
            <NextLink href={'/'} passHref>
                <StyledBrand
                    variant={down1347 && !down959 ? "h5" : "h4"}
                    underline="none"
                >
                    IsItBetterThere
                </StyledBrand>
            </NextLink>
        </React.Fragment>
    );
};

export default BrandLogo;
