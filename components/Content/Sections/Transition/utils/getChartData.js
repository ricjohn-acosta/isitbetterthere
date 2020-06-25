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
        const regretLabels = ["Did regret", "Did not regret"];
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

    default:
      break;
  }
};
