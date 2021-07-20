import React from 'react';
import {Paper, Grid, Typography} from "@material-ui/core";
import styled from "styled-components";
import convertStoryBlockToRaw from "../../../lib/utils/converStoryBlockToRaw";
import moment from "moment";
import StyledHr from "../../UI/Dividers/StyledHr";

const Wrapper = styled.div`
  margin: 2.5% 15% 2.5% 15%;
`;

const StyledDiv = styled.div`
`;

const StoryCard = (props) => {

    const {
        title,
        name,
        story,
        eid,
        uid,
        helpfulCount,
        from,
        to,
        hideName,
        datePosted,
    } = props

    return (
        <Wrapper>
            <StyledDiv>
                <Grid item container direction={'column'} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle1'}>
                            <b>{from}</b> to <b>{to}</b>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={'h5'}>
                            {title}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            {convertStoryBlockToRaw(story)}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={'subtitle2'}>
                            {moment.unix(datePosted).format("DD MMM YYYY")} · {helpfulCount} {helpfulCount === 1 ? "person" : "people"} found this helpful
                        </Typography>
                    </Grid>
                </Grid>
            </StyledDiv>
            <StyledHr/>
        </Wrapper>
    );
};

export default StoryCard