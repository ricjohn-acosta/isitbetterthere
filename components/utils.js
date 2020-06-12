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
      const firstLetter = option.field.toUpperCase();
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


