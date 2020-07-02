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

  if (Array.isArray(experiences)) {
    if (!sortBy && !filterBy) {
      // If there are no sortBy and filterBy queries
      return experiences;
    }

    // If there is only a sortBy query
    if (sortBy && !filterBy) {
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
          break;
      }
    }

    //   // If there is only a filterBy query
    //   if (!sortBy && filterBy) {
    //   }

    //   // If there are sortBy and filterBy queries
    //   if (sortBy && filterBy) {
    //   }
  } else {
    return experiences;
  }
};

export default ExperienceSorter;
