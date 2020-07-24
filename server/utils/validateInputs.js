import validator from 'validator';

export const isValid = (request, source) => {

  // Grab the input values from user request
  switch (source) {
    case "new-experience":
      
      if

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
      const { occupation, location, comes_from } = request;
      occupation === "" || location === "" || comes_from === "" ? true : false;

    default:
      break;
  }
};
