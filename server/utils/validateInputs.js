export const isValid = (request, source) => {
    
  // Grab the input values from user request
  switch (source) {
    case "new-experience":
      const fields = Object.values(request).find(
        (e) => e === false || e === ""
      );
      return fields ? false : true;

    case "new-user":
      const { occupation, location, comes_from } = request;
      occupation === "" || location === "" || comes_from === "" ? true : false;

    default:
      break;
  }
};
