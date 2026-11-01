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

const tempState = {unit: 'F'}

async function execute(locationQuery) {
  tempState.unit = 'F'
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
    tempMinContainer.textContent = 'L: ' + tempMin + '°';
    const tempActualContainer = targetDiv.querySelector('.actual-temp');
    tempActualContainer.textContent = temp + '°';
    const tempMaxContainer = tempContainer.querySelector('.high');
    tempMaxContainer.textContent = 'H: ' + tempMax + '°';
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

const toFahrenheitButton = document.querySelector('button.f');
toFahrenheitButton.addEventListener('click', toFahrenheit)
const toCelsiusButton = document.querySelector('button.c');
toCelsiusButton.addEventListener('click', toCelsius)

function parseStrToFloat(stringInput) {
  return parseFloat(stringInput.replace(/[^1-9.]/g, ""))
}

function toFahrenheit() {
  if (tempState.unit === 'F') {
    return
  } else if (tempState.unit === 'C') {
    for (let i = 0; i < 7; i++) {
      const targetDiv = document.querySelector(`div#div${i+1}`)
      const tempContainer = targetDiv.querySelector('.temps');
      const tempMinContainer = tempContainer.querySelector('.low');
      const newTempMin = String(Math.round(calculateFahrenheit(parseStrToFloat(tempMinContainer.textContent))*10)/10)
      tempMinContainer.textContent = 'L: ' + newTempMin + '°';

      const tempActualContainer = targetDiv.querySelector('.actual-temp');
      const newTemp = String(Math.round(calculateFahrenheit(parseStrToFloat(tempActualContainer.textContent))*10)/10)
      tempActualContainer.textContent = newTemp + '°';

      const tempMaxContainer = tempContainer.querySelector('.high');
      const newTempMax = String(Math.round(calculateFahrenheit(parseStrToFloat(tempMaxContainer.textContent))*10)/10)
      tempMaxContainer.textContent = 'H: ' + newTempMax + '°';
    }
    tempState.unit = 'F'
  }
}

function calculateFahrenheit(temp) {
  return (temp*9/5)+32
}

function toCelsius() {
  if (tempState.unit === 'C') {
    return
  } else if (tempState.unit === 'F') {
    for (let i = 0; i < 7; i++) {
      const targetDiv = document.querySelector(`div#div${i+1}`)
      const tempContainer = targetDiv.querySelector('.temps');
      const tempMinContainer = tempContainer.querySelector('.low');
      const newTempMin = String(Math.round(calculateCelsius(parseStrToFloat(tempMinContainer.textContent))*10)/10)
      tempMinContainer.textContent = 'L: ' + newTempMin + '°';

      const tempActualContainer = targetDiv.querySelector('.actual-temp');
      const newTemp = String(Math.round(calculateCelsius(parseStrToFloat(tempActualContainer.textContent))*10)/10)
      tempActualContainer.textContent = newTemp + '°';

      const tempMaxContainer = tempContainer.querySelector('.high');
      const newTempMax = String(Math.round(calculateCelsius(parseStrToFloat(tempMaxContainer.textContent))*10)/10)
      tempMaxContainer.textContent = 'H: ' + newTempMax + '°';
    }
    tempState.unit = 'C'
  }
}

function calculateCelsius(temp) {
  return (temp-32)*5/9
}