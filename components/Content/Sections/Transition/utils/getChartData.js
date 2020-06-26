export const getChartData = (quality, experiences) => {
  switch (quality) {
    case "fulfillment":
      const fulfillmentLabels = ["Fulfilled", "Mixed", "Not fulfilled"];
      let qualityData = [0, 0, 0];
      experiences.forEach((e) => {
        if (e.fulfillment === "Fulfilled") {
          qualityData[0]++;
        }

        if (e.fulfillment === "Mixed") {
          qualityData[1]++;
        }

        if (e.fulfillment === "Not fulfilled") {
          qualityData[2]++;
        }
      });

      let qualityResult = {
        labels: fulfillmentLabels,
        datasets: [
          {
            data: qualityData,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };

      return qualityResult;

    case "ease":
      const easeLabels = ["Easy", "Medium", "Hard"];
      let easeData = [0, 0, 0];
      experiences.forEach((e) => {
        if (e.ease_of_transition === "Easy") {
          easeData[0]++;
        }

        if (e.ease_of_transition === "Medium") {
          easeData[1]++;
        }

        if (e.ease_of_transition === "Hard") {
          easeData[2]++;
        }
      });

      let easeResult = {
        labels: easeLabels,
        datasets: [
          {
            data: easeData,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };

      return easeResult;

    case "regret":
      const regretLabels = ["Did not regret", "Did regret"];
      let regretData = [0, 0];
      experiences.forEach((e) => {
        if (e.regret === "Did not regret") {
          regretData[0]++;
        }

        if (e.regret === "Did regret") {
          regretData[1]++;
        }
      });

      let regretResult = {
        labels: regretLabels,
        datasets: [
          {
            data: regretData,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };

      return regretResult;

    case "location":
      // get location labels from experience object
      const locations = experiences.map((e) => e.location);
      const locationSet = new Set(locations);
      const locationLabels = [...locationSet];

      let locationObj = {};
      locations.map((element) => {
        if (locationObj.hasOwnProperty(element)) {
          return (locationObj[element]++);
        } else {
          return (locationObj[element] = 1);
        }
      });

      const locationData = Object.values(locationObj);
      const locationResult = {
        labels: locationLabels,
        datasets: [
          {
            data: locationData,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      };

      console.log(locations);
      console.log(locationObj);
      return locationResult;
    default:
      break;
  }
};
