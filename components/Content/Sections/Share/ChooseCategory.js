import styled from "styled-components";
import CategoryForm from "../Home/CategoryForm";
import {
    tertiaryEducationCategory,
    jobCategory,
    uniCategory,
    countryCategory,
    cultureCategory,
    lifeCategory,
    secondaryEducationCategory, careersCategory,
} from "../../../../lib/categories";
import Typography from "@material-ui/core/Typography";
import Subheaders from "./common/Subheaders";
import PaperWrapper from "./common/PaperWrapper";
import HeaderDivider from "./common/HeaderDivider";
import Header from "../../../Navigation/Header";
import {useSession} from "next-auth/client";
import {useDispatch} from "react-redux";

const Wrapper = styled.div`
  margin: 5%;
`;

const StyledDiv = styled.div`
  margin-top: 5vh;
`;

const ChooseCategory = ({
                            stories,
                            categories,
                            setCategory,
                            currentCategory,
                            setCurrentCategory,
                            toValue,
                            setToValue,
                            toInputValue,
                            setToInputValue,
                            fromValue,
                            setFromValue,
                            fromInputValue,
                            setFromInputValue,
                            setSelected,
                            isSwapping,
                            setSwapping,
                            isEmptyField,
                            setEmptyFields,
                        }) => {

    const [session, loading] = useSession();
    const dispatch = useDispatch()

    const handleForm = (fieldStore) => {
        // e.preventDefault();
        // if (fromValue === null || toValue === null) {
        //     setEmptyFields(true);

        //     return console.log("ERROR");
        // } else {
        //     setEmptyFields(false);
        //     return console.log("NO ERROR");
        // }

        console.log(fieldStore)
    };

    const handleCategories = (value) => {
        switch (value) {
            case "secondaryEducation":
                setCategory(secondaryEducationCategory);
                setCurrentCategory(value);
                return;

            case "tertiaryEducation":
                setCategory(tertiaryEducationCategory);
                setCurrentCategory(value);
                return;

            case "universities":
                setCategory(uniCategory);
                setCurrentCategory(value);
                return;

            case "careers":
                setCategory(careersCategory);
                setCurrentCategory(value);
                return;

            case "jobs":
                setCategory(jobCategory);
                setCurrentCategory(value);
                return;

            case "countries":
                setCategory(countryCategory);
                setCurrentCategory(value);
                return;

            case "cultures":
                setCategory(cultureCategory);
                setCurrentCategory(value);
                return;

            case "life":
                setCategory(lifeCategory);
                setCurrentCategory(value);
                return;

            default:
                break;
        }
    };

    return (
        <PaperWrapper>
            <Subheaders icon={"/swap.png"}>
                What transition would you like to talk about?
            </Subheaders>
            <HeaderDivider/>
            <Wrapper>
                <StyledDiv>
                    {/*{console.log('session', session)}*/}
                    <CategoryForm
                        // experiences={session ? session.userData.userExperiences : {}}
                        experiences={stories}
                        categories={categories}
                        currentCategory={currentCategory}
                        handleCategories={handleCategories}
                        handleForm={handleForm}
                        setCategory={setCategory}
                        setToValue={setToValue}
                        setToInputValue={setToInputValue}
                        setFromValue={setFromValue}
                        setFromInputValue={setFromInputValue}
                        setSelected={setSelected}
                        setSwapping={setSwapping}
                        toValue={toValue}
                        toInputValue={toInputValue}
                        fromValue={fromValue}
                        fromInputValue={fromInputValue}
                        isSwapping={isSwapping}
                        isEmptyField={isEmptyField}
                        source={"ChooseCategory"}
                    />
                </StyledDiv>
            </Wrapper>
        </PaperWrapper>
    );
};

export default ChooseCategory;
