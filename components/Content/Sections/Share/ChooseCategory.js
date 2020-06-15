import styled from "styled-components";
import CategoryForm from "../Home/CategoryForm";
import {
  careersCategory,
  tertiaryEducationCategory,
  jobCategory,
  uniCategory,
  countryCategory,
  cultureCategory,
  lifeCategory,
  secondaryEducationCategory,
} from "../../../../lib/categories";

const Wrapper = styled.div`
  margin: 5%;
`;

const ChooseCategory = () => {
  const [categories, setCategory] = React.useState(careersCategory);
  const [currentCategory, setCurrentCategory] = React.useState("careers");
  const [toValue, setToValue] = React.useState(null);
  const [toInputValue, setToInputValue] = React.useState("");
  const [fromValue, setFromValue] = React.useState(null);
  const [fromInputValue, setFromInputValue] = React.useState("");
  const [isSelected, setSelected] = React.useState(false);
  const [isSwapping, setSwapping] = React.useState(false);
  const [isEmptyField, setEmptyFields] = React.useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    if (fromValue === null || toValue === null) {
      setEmptyFields(true);
      return console.log("ERROR");
    } else {
      Router.push({
        pathname: "/transition",
        query: {
          category: currentCategory,
          from: fromInputValue,
          to: toInputValue,
        },
      });
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
    <Wrapper>
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
    </Wrapper>
  );
};

export default ChooseCategory;
