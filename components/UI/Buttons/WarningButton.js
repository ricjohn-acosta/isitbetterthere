import React from 'react';
import {Button} from "@material-ui/core";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background: firebrick;
  color: white;
`;

const WarningButton = (props) => {
    const {children, ...muiButtonProps} = props


    return (
        <StyledButton {...muiButtonProps}>
            {children}
        </StyledButton>
    );
};

export default WarningButton;