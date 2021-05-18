import styled, {keyframes} from "styled-components";
import {Typography} from "@material-ui/core";
import Contribution from "./Contribution";
import NoData from "./common/NoData";
import {useSelector} from "react-redux";

const Wrapper = styled.div`
  padding: 5%;
`;

const ContributionTab = ({userContributions}) => {
    const [contributions, setContributions] = React.useState(userContributions);
    const userContributionsTest = useSelector((state) => state.users)

    console.log('user contributions', userContributionsTest)
    return (
        <Wrapper>
            <Typography variant="h5">Your stories</Typography>
            <br/>
            {contributions.length !== 0 ? (
                contributions.map((e, i) => (
                    <>
                        <Contribution
                            key={i}
                            experienceId={e.id}
                            from={e.from}
                            to={e.to}
                            story={e.story}
                            datePosted={e.date_posted}
                            helpfulRating={e.helpful}
                            contributions={contributions}
                            setContributions={setContributions}
                        />
                        <br/>
                    </>
                ))
            ) : (
                <NoData>YOU HAVEN'T CONTRIBUTED YET...</NoData>
            )}
        </Wrapper>
    );
};

export default ContributionTab;
