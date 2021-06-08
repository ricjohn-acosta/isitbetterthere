import styled, {keyframes} from "styled-components";
import {Typography} from "@material-ui/core";
import HelpfulStory from "./HelpfulStory";
import NoData from "./common/NoData"
import {useSelector} from "react-redux";

const Wrapper = styled.div`
  padding: 5%;
`;

const HelpfulStoriesTab = () => {
    const userData = useSelector((state) => state.users.user)

    // console.log(helpfulContributions && helpfulContributions.hide_email)
    // if (!helpfulContributions) return null
    console.log(userData && userData.helpful_stories)
    return (
        <Wrapper>
            <Typography variant="h5">Stories you found helpful</Typography>
            <br/>
            {userData ? userData.helpful_stories.map(e => (
                <>
                    <HelpfulStory
                        name={e.author}
                        story={e.story}
                        from={e.from}
                        to={e.to}
                        helpfulCount={e.helpful}
                        hideName={e.hide_name}
                    />
                    <br/>
                </>
            )) : <NoData>YOU HAVEN'T FOUND ANY HELPFUL STORIES YET...</NoData>}
        </Wrapper>
    );
};

export default HelpfulStoriesTab;
