import {
    careersCategory,
    tertiaryEducationCategory,
    jobCategory,
    uniCategory,
    countryCategory,
    cultureCategory,
    lifeCategory,
    secondaryEducationCategory,
  } from "../lib/categories";


export const options = (categories) => {
 return categories.map((option) => {
    if (categories == careersCategory) {
      const firstLetter = option.category[0].toUpperCase();
      return {
        firstLetter:
          /[0-9]/.test(firstLetter) ||
          option.category === "Unemployed / Graduate"
            ? ""
            : firstLetter,
        ...option,
      };
    }

    if (categories == jobCategory) {
      const firstLetter = option.field.toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "" : firstLetter,
        ...option,
      };
    }

    if (categories == uniCategory) {
      const firstLetter = option.category[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "" : firstLetter,
        ...option,
      };
    }

    if (categories == secondaryEducationCategory) {
      const firstLetter = option.field.toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    }

    if (categories == tertiaryEducationCategory) {
      const firstLetter = option.field.toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    }

    if (categories == countryCategory) {
      const firstLetter = option.category[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    }

    if (categories == cultureCategory) {
      const firstLetter = option.field.toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    }

    if (categories == lifeCategory) {
      const firstLetter = option.field.toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    }
  });
}

export const uniDirectionFrom = (option, fromInputValue) => {
  console.log(option);
  if (fromInputValue === "YEAR 10" && fromInputValue !== "") {
    return option.level <= 10;
  }

  if (fromInputValue === "YEAR 11" && fromInputValue !== "") {
    return option.level < 11;
  }

  if (fromInputValue === "YEAR 12" && fromInputValue !== "") {
    return option.level < 12;
  }

  if (fromInputValue === "YEAR 13" && fromInputValue !== "") {
    return option.level < 13;
  }

  if (
    fromInputValue === "University" ||
    (fromInputValue === "Trades" && fromInputValue !== "")
  ) {
    return option.level < 14;
  }
};

export const uniDirectionTo = (option, toInputValue) => {
  console.log(option);
  if (toInputValue === "YEAR 10" && toInputValue !== "") {
    return option.level > 10;
  }

  if (toInputValue === "YEAR 11" && toInputValue !== "") {
    return option.level > 11;
  }

  if (toInputValue === "YEAR 12" && toInputValue !== "") {
    return option.level > 12;
  }

  if (toInputValue === "YEAR 13" && toInputValue !== "") {
    return option.level > 13;
  }

  if (
    toInputValue === "University" ||
    (toInputValue === "Trades" && toInputValue !== "")
  ) {
    return option.level < 14;
  }
};




