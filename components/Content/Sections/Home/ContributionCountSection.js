import styled from "styled-components";
import {Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {getTotalNumberOfExperiences} from "../../../../store/actions/api/experiences";
import {useEffect, useState} from "react";

const Wrapper = styled.div`
  padding: 1%;
  background-color: #33cccc;
  color: #f8f8f8;
`;

const StyledTypography = styled(Typography)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 1.5rem;
  }

  ${(props) => props.theme.breakpoints.down(662)} {
    font-size: 1rem;
  }
  ${(props) => props.theme.breakpoints.down(441)} {
    font-size: 11.5px;
  }
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const ContributionCountSection = () => {
  const dispatch = useDispatch()
  const [numberOfExperienceContributed, setNumberOfExperienceContributed] = useState()


  useEffect(() => {
    dispatch(getTotalNumberOfExperiences()).then(res => {
      setNumberOfExperienceContributed(res.data)
    })
  }, [])

  return (
    <Wrapper>
      <StyledTypography variant="h4">
        <b>{numberOfExperienceContributed}</b>&nbsp;stories have been contributed so far!
        &nbsp;
        <StyledLink href="/share">Share your story!</StyledLink>
      </StyledTypography>
    </Wrapper>
  );
};

export default ContributionCountSection;
