import validator from "validator";
import { searchCategory } from "./searchCategories";

export const isValid = (request, source) => {
  // Grab the input values from user request
  switch (source) {
    case "new-experience":
      // check if category, to and from values are all valid options
      if (!searchCategory(request.category, request.from, request.to)) {
        return false;
      }

      if (validator.isEmpty(JSON.parse(request.story).blocks[0].text)) {
        return false;
      }

      if (Object.values(request).find((e) => e === false || e === null)) {
        return false;
      }

      return true;

    case "new-user":
      if (
        validator.isEmpty(request.occupation) ||
        validator.isEmpty(request.location) ||
        validator.isEmpty(request.comes_from)
      ) {
        return false;
      }

      return true;

    default:
      return false;
  }
};
