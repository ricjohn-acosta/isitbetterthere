import validator from 'validator';

export const isValid = (request, source) => {

  // Grab the input values from user request
  switch (source) {
    case "new-experience":
      
      // check if category, to and from values are all valid options

      if(validator.isEmpty(JSON.parse(request.story).blocks[0].text)) {
        console.log("json")
        return false
      }

      if(Object.values(request).find((e) => e === false || e === null)) {
        console.log("request")
        return false
      }

      return true;

    case "new-user":
      // check if location, occupation, site source are all valid options
      const { occupation, location, comes_from } = request;
      occupation === "" || location === "" || comes_from === "" ? true : false;

    default:
      break;
  }
};
