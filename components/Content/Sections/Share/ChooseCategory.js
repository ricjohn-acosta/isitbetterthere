import styled from "styled-components";
import CategoryForm from "../Home/CategoryForm";
import {
  tertiaryEducationCategory,
  jobCategory,
  uniCategory,
  countryCategory,
  cultureCategory,
  lifeCategory,
  secondaryEducationCategory,
} from "../../../../lib/categories";
import Typography from "@material-ui/core/Typography";
import Subheaders from "./common/Subheaders";

const Wrapper = styled.div`
  margin: 5%;
`;

const StyledDiv = styled.div`
  margin-top: 5vh;
`;

const ChooseCategory = ({
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
  const handleForm = (e) => {
    e.preventDefault();
    if (fromValue === null || toValue === null) {
      setEmptyFields(true);
      return console.log("ERROR");
    } else {
      setEmptyFields(false);
      return console.log("NO ERROR");
    }
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
    <>
      <Subheaders icon={"/swap.png"}>What transition would you like to talk about?</Subheaders>
      <hr/>
      <Wrapper>
        <StyledDiv>
          <CategoryForm
            categories={categories}
            currentCategory={currentCategory}
            handleCategories={handleCategories}
            handleForm={handleForm}
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
    </>
  );
};

export default ChooseCategory;
