const button = document.querySelector("button");
const dialog = document.querySelector("#dialog");
button.addEventListener("click", () => {
  dialog.setAttribute("open", "");
});

async function execute(locationQuery) {
  let daysArray = await retrieveInfo(locationQuery)
  let data = weekDataRetriever(daysArray)
  console.log(data)
  return data
}

async function retrieveInfo(locationQuery) {
  const key = "key=SL4AFSNJ65NFN7UNNKF934WG3";
  const query ="https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  const fullQuery = query + locationQuery + "?" + key;
  const daysArray = await fetch(fullQuery)
  .then((response) => response.json())
  .then(response => response.days);
  return daysArray
}

function weekDataRetriever(response) {
  const weeklyData = [];
  for (let i = 0; i < 7; i++) {
    const datetime = response[i].datetime
    const tempmin = response[i].tempmin
    const temp = response[i].temp
    const tempmax = response[i].tempmax
    const dailyData = {datetime,tempmin,temp,tempmax};
    weeklyData.push(dailyData)
  }
  return weeklyData
}