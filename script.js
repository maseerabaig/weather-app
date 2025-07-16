const apiKey = "26b2d566fd07e884dfc74f5bff1ed22b"; 

async function searchWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }

    displayWeather(data);
    showMapEmbed(city);
  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error(error);
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

function showMapEmbed(city) {
  const mapContainer = document.getElementById("mapContainer");
  mapContainer.innerHTML = `
    <iframe
      frameborder="0"
      referrerpolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?q=${encodeURIComponent(city)}&output=embed"
      allowfullscreen>
    </iframe>
  `;
}
