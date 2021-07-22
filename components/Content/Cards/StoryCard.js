import React from 'react';
import {Paper, Grid, Typography, Box} from "@material-ui/core";
import styled from "styled-components";
import convertStoryBlockToRaw from "../../../lib/utils/converStoryBlockToRaw";
import moment from "moment";
import StyledHr from "../../UI/Dividers/StyledHr";
import SeeMore from "../../UI/Typography/SeeMore";
import {useRouter} from "next/router";
import {Button} from "@material-ui/core";
import {useSession} from "next-auth/client";
import WarningButton from "../../UI/Buttons/WarningButton";

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

    const [session, loading] = useSession();

    const showAuthenticatedButtons = () => {
        return <>
            <Button variant={'contained'} color={'primary'} size={'small'} disableElevation>Edit</Button>
            &nbsp;
            <WarningButton variant={'contained'} size={'small'} disableElevation>Delete</WarningButton>
        </>
    }

    const showUnAuthenticateduttons = () => {
        return <>
            <Button variant={'contained'} size={'small'} color={'primary'} disableElevation>See more stories like
                this</Button>
        </>
    }

    return (
        <Wrapper>
            <StyledDiv>
                <Grid item container direction={'column'} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant={'subtitle1'}>
                            <Box fontWeight={300}>
                                <b>{from}</b> to <b>{to}</b>
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={'h5'}>
                            <Box fontWeight={'fontWeightBold'}>
                                {title}
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant={'body1'}>
                            <SeeMore userId={uid} experienceId={eid}>
                                {story && convertStoryBlockToRaw(story)}
                            </SeeMore>
                        </Typography>
                    </Grid>

                    <Grid style={{display: 'flex', alignItems: 'center'}} item container xs={12} direction={'row'}>
                        <Typography variant={'subtitle2'}>
                            <Box fontWeight={'fontWeightLight'}>
                                {moment.unix(datePosted).format("DD MMM YYYY")} · {helpfulCount} {helpfulCount === 1 ? "person" : "people"} found
                                this helpful
                            </Box>
                        </Typography>
                        &nbsp;
                        ·
                        &nbsp;
                        {session && session.id === uid ? showAuthenticatedButtons() : showUnAuthenticateduttons()}
                    </Grid>
                </Grid>
            </StyledDiv>
            <StyledHr/>
        </Wrapper>
    );
};

export default StoryCard