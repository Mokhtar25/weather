//front end

const input = document.querySelector("input");

const button = document.querySelector("button");
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") button.click();
});

button.addEventListener("click", () => {
  const text = input.value;
  if (text) {
    work(text);
  } else {
    displayerror("Please enter a city");
    console.log("error");
  }
  input.value = "";
});

const heat = document.querySelector(".heat");
const img = document.querySelector("img");
const feels = document.querySelector(".feelslike");
const cond = document.querySelector(".conditons");

const load = document.querySelector(".sear");

async function getdata(city) {
  try {
    const data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9cf9aeded8234f71976113151242304&q=${city}&days=1&aqi=yes&alerts=no&lang=de`,
    );
    if (!data.ok) {
      const errorMessage = await data.json(); // Parse error message from data body
      throw errorMessage;
    }
    const info = await data.json();
    return info;
  } catch (error) {
    throw error.error;
  }
}

function readinfo(info) {
  const dayTemp = info.forecast.forecastday[0].day.avgtemp_c;
  const feelsLike = info.current.feelslike_c;
  const conditons = info.current.condition.text;
  const location = info.location.name;
  let icon = info.current.condition.icon;

  icon = "http:" + icon;

  input.placeholder = location;
  heat.textContent = `${dayTemp} Grad`;
  img.src = icon;
  feels.textContent = `Gefühlt wie ${feelsLike}`;
  cond.textContent = conditons;
}

// const errorhandel =
//   (fn) =>
//   (...args) =>
//     fn(...args).catch((e) => {
//       console.log("error happened", e.code);
//     });

async function work(city) {
  load.textContent = "";
  load.classList.add("loader");
  try {
    const berlin = await getdata(city);
    readinfo(berlin);
  } catch (er) {
    displayerror(er.message);
  }

  load.classList.remove("loader");
  load.innerHTML = "&#9740;";
}
work("berlin");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const alert = document.querySelector(".alert");
function displayerror(mess) {
  input.placeholder = "Berlin";
  alert.textContent = mess;
  alert.classList.remove("hide");
  setTimeout(() => {
    alert.classList.add("hide");
  }, 3000);
}
