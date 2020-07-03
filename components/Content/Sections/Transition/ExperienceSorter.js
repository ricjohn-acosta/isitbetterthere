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

const filterByFulfilled = (value) => {
  return value.props.children.props.fulfillment === "Fulfilled";
};

const filterByNotFulfilled = (value) => {
  return value.props.children.props.fulfillment === "Not fulfilled";
};

const filterByMixed = (value) => {
  return value.props.children.props.fulfillment === "Mixed";
};

const filterByEasy = (value) => {
  return value.props.children.props.easeOfTransition === "Easy";
};

const filterByMedium = (value) => {
  return value.props.children.props.easeOfTransition === "Medium";
};

const filterByHard = (value) => {
  return value.props.children.props.easeOfTransition === "Hard";
};

const filterByDidRegret = (value) => {
  return value.props.children.props.regret === "Did regret";
};

const filterByDidNotRegret = (value) => {
  return value.props.children.props.regret === "Did not regret";
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

    // If there is only a filterBy query
    if (filterBy) {
      switch (filterBy) {
        case "none":
          experienceResult = experiences;
          break;

        // case "fulfilled":
        //   experienceResult = experiences.filter(filterByFulfilled);
        //   break;

        case "not-fulfilled":
          return experiences.filter(filterByNotFulfilled);

        case "mixed":
          experienceResult = experiences.filter(filterByMixed);
          break;

        case "easy":
          experienceResult = experiences.filter(filterByEasy);
          break;

        case "medium":
          experienceResult = experiences.filter(filterByMedium);
          break;

        case "hard":
          experienceResult = experiences.filter(filterByHard);
          break;

        case "did-regret":
          experienceResult = experiences.filter(filterByDidRegret);
          break;

        case "did-not-regret":
          experienceResult = experiences.filter(filterByDidNotRegret);
          break;

        default:
          experienceResult = experiences;
          break;
      }
    }
    
    return experienceResult;
  } else {
    return experiences;
  }
};

export default ExperienceSorter;
