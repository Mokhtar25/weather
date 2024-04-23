//
// //weather api
// // 9cf9aeded8234f71976113151242304
//

//front end

const input = document.querySelector("input");

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
  const icon = info.current.condition.icon;
  console.log(dayTemp, feelsLike, conditons, icon);
}

// const errorhandel =
//   (fn) =>
//   (...args) =>
//     fn(...args).catch((e) => {
//       console.log("error happened", e.code);
//     });

async function work() {
  try {
    const berlin = await getdata("bsadssdaerlin");
    readinfo(berlin);
  } catch (er) {
    console.dir(er.message);
  }
}
work();
