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

  if (Array.isArray(experiences)) {
    if (!sortBy && !filterBy) {
      // If there are no sortBy and filterBy queries
      return experiences;
    }

    // If there is only a sortBy query
    if (sortBy && !filterBy) {
      console.log("SORTING");
      switch (sortBy) {
        case "none":
          return experiences;

        case "newest":
          return experiences.sort(sortNewest);

        case "oldest":
          return experiences.sort(sortOldest);

        case "most-helpful":
          return experiences.sort(sortMostHelpful);

        default:
          return experiences;
      }
    }

    // If there is only a filterBy query
    if (!sortBy && filterBy) {
      switch (filterBy) {
        case "none":
          return experiences;

        case "fulfilled":
          return experiences.filter(filterByFulfilled);

        case "not-fulfilled":
          return experiences.filter(filterByNotFulfilled);

        case "mixed":
          return experiences.filter(filterByMixed);

        case "easy":
          return experiences.filter(filterByEasy);

        case "medium":
          return experiences.filter(filterByMedium);

        case "hard":
          return experiences.filter(filterByHard);

        case "did-regret":
          return experiences.filter(filterByDidRegret);

        case "did-not-regret":
          return experiences.filter(filterByDidNotRegret);

        default:
          return experiences;
      }
    }

    //   // If there are sortBy and filterBy queries
    //   if (sortBy && filterBy) {
    //   }
  } else {
    return experiences;
  }
};

export default ExperienceSorter;
