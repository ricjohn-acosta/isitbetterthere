import {
  tertiaryEducationCategory,
  jobCategory,
  uniCategory,
  countryCategory,
  cultureCategory,
  lifeCategory,
  secondaryEducationCategory,
  careersCategory,
} from "../../lib/categories";

export const searchCategory = (category, to, from) => {
  switch (category) {
    case "secondaryEducation":
      return (
        secondaryEducationCategory.find((e) => e.category === from) &&
        secondaryEducationCategory.find((e) => e.category === to)
      );

    case "tertiaryEducation":
      return (
        tertiaryEducationCategory.find((e) => e.category === from) &&
        tertiaryEducationCategory.find((e) => e.category === to)
      );

    case "universities":
      return (
        uniCategory.find((e) => e.category === from) &&
        uniCategory.find((e) => e.category === to)
      );

    case "careers":
      return (
        careersCategory.find((e) => e.category === from) &&
        careersCategory.find((e) => e.category === to)
      );

    case "jobs":
      return (
        jobCategory.find((e) => e.category === from) &&
        jobCategory.find((e) => e.category === to)
      );

    case "countries":
      return (
        countryCategory.find((e) => e.category === from) &&
        countryCategory.find((e) => e.category === to)
      );

    case "cultures":
      return (
        cultureCategory.find((e) => e.category === from) &&
        cultureCategory.find((e) => e.category === to)
      );

    case "life":
      return (
        lifeCategory.find((e) => e.category === from) &&
        lifeCategory.find((e) => e.category === to)
      );

    default:
      return false;
  }
};
