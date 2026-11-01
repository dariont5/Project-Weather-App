const forcastButton = document.querySelector("button#forcast-button");
const dialog = document.querySelector("#centerpoint");
forcastButton.addEventListener("click", () => {
  dialog.setAttribute("open", "");
});
const userInput = document.querySelector('input#location')
const submitButton = document.querySelector("button#submit-forcast");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.removeAttribute("open");
  execute(userInput.value)
});

async function execute(locationQuery) {
  let daysArray = await retrieveInfo(locationQuery);
  let data = weekDataRetriever(daysArray);
  populateDate(data)
  console.log(data);
  return data;
}

function populateDate(dateArray) {
  for (let i = 0; i < 7; i++) {
    const dayData = dateArray[i];
    const date = dayData.datetime;
    const tempMin = dayData.tempmin;
    const temp = dayData.temp;
    const tempMax = dayData.tempmax;
    const targetDiv = document.querySelector(`div#div${i+1}`)

    const dateContainer = targetDiv.querySelector('.date');
    dateContainer.textContent = date;
    const tempContainer = targetDiv.querySelector('.temps');
    const tempMinContainer = tempContainer.querySelector('.low');
    tempMinContainer.textContent = tempMin;
    const tempActualContainer = tempContainer.querySelector('.actual');
    tempActualContainer.textContent = temp;
    const tempMaxContainer = tempContainer.querySelector('.high');
    tempMaxContainer.textContent = tempMax;
  }
}

async function retrieveInfo(locationQuery) {
  const key = "key=SL4AFSNJ65NFN7UNNKF934WG3";
  const query =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  const fullQuery = query + locationQuery + "?" + key;
  const daysArray = await fetch(fullQuery)
    .then((response) => response.json())
    .then((response) => response.days);
  return daysArray;
}

function weekDataRetriever(response) {
  const weeklyData = [];
  for (let i = 0; i < 7; i++) {
    const datetime = response[i].datetime;
    const tempmin = response[i].tempmin;
    const temp = response[i].temp;
    const tempmax = response[i].tempmax;
    const dailyData = { datetime, tempmin, temp, tempmax };
    weeklyData.push(dailyData);
  }
  return weeklyData;
}
