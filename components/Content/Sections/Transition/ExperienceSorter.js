import React from "react";

const sortNewest = (a, b) => {
  console.log("SORT NEWEST ", a);
  return a.props.children.props.date_posted > b.props.children.props.date_posted
    ? -1
    : 0;
};

const sortOldest = (a, b) => {
  return a.props.children.props.date_posted < b.props.children.props.date_posted
    ? -1
    : 0;
};

const sortMostHelpful = (a, b) => {
  return a.props.children.props.helpfulCount >
    b.props.children.props.helpfulCount
    ? -1
    : 0;
};

const ExperienceSorter = ({ children, sortBy, filterBy }) => {
  const experiences = React.Children.toArray(children)[0].props.children;
  let experienceResult;

  if (Array.isArray(experiences)) {
    if (!sortBy && !filterBy) {
      // If there are no sortBy and filterBy queries
      return experiences;
    }

    // If there is only a sortBy query
    if (sortBy) {
      console.log("SORTING");
      switch (sortBy) {
        case "none":
          experienceResult = experiences;
          break;

        case "newest":
          experienceResult = experiences.sort(sortNewest);
          break;

        case "oldest":
          experienceResult = experiences.sort(sortOldest);
          break;

        case "most-helpful":
          experienceResult = experiences.sort(sortMostHelpful);
          break;

        default:
          return experiences;
      }
    }    

    console.log("EXPERIENCE RESULT ", experienceResult)
    return experienceResult;
  } else {
    return experiences;
  }
};

export default ExperienceSorter;
