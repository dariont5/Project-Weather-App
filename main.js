const button = document.querySelector("button");
const dialog = document.querySelector("#dialog");
button.addEventListener("click", () => {
  dialog.setAttribute("open", "");
});

const key = "key=SL4AFSNJ65NFN7UNNKF934WG3";
const locationQuery = "houston";
const query =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const fullQuery = query + locationQuery + "?" + key;

fetch();
