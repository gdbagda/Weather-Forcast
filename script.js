document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#searchInput");
  const searchButton = document.querySelector("#searchButton");
  const weatherIcon = document.querySelector("#weatherIcon");
  const location = document.querySelector("#location");
  const temperature = document.querySelector("#temperature");
  const description = document.querySelector("#description");
  const windSpeed = document.querySelector("#windSpeed");
  const humidity = document.querySelector("#humidity");
  const API = "24a3b6b33616da2ecdbd0b4c95a507ce";

  const setWeatherDetails = (data) => {
    location.innerHTML = data.name + ", " + data.sys.country;
    description.innerHTML = data.weather[0].description;
    temperature.innerHTML = Math.round(data.main.temp - 273.15) + "°C";
    humidity.innerHTML = "Humidity: " + data.main.humidity + "%";
    windSpeed.innerHTML = "Wind Speed: " + data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src =
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwFTkt5z_dxU6w1UnS1PxiZV3HDiPGsAW5Lrsp09MnlCmkQre9GzO8MnGytaaY1eZoqBN6SMJ4U578_uDtiuXswovr1T3o-Kt5KK0mlN_zC0RDodJFaKHQ3Uk-HIZ3vuMvAKNJi8DDFwWA7F6BOxz78Oh-UePwJTuc3PG0ZIZypPE1xlMPl5z46joaEw/s320/Clouds.png";
        break;
      case "Clear":
        weatherIcon.src =
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7pmzNCftryAfpa1YBSzVeYtjgxDQnw09Ug0HVV47J8GEtHPYTH9hJgZ2M1k0YgE0pcZ1qekr4C14zyPCiVuQAfXLClK8Ww3hYB6v77yElP7Lo5BnUKo4n-w6yB17FAbw51WST6YKS0GMwyA4fYNxOZxEyNL6HhUfFRgVhOW0GyRdBRriMHFQ-qfh4cA/s320/sun.png";
        break;
      case "Rain":
        weatherIcon.src =
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDW_NdwvxV796rkFf43qmUDiTQePn5dg7PDfn1SijfpjtB0AWJMBcifU6LWyW7iOtjZhfqIJnKEGQ1PwbbXS7NoKMSAmvy7i2ljWXMYLue3EBIBBR2qTFbs6QCe5eoFr2CU9WzCVJ8u0J3z3eAo3Ajv1LXamZASFtbj9sA_gD-Kp3hfgAk17Xh17RoLQ/s320/rainy.png";
        break;
      case "Mist":
        weatherIcon.src =
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVpL23l0t1U_ibWi01TFcHMF6J_t-9Ada5PavGlwG4M_mKIcx0pV1md9SN9ip1d84NaVowml5Do16XO3nsuttnM2-Ov05d-wCjEYjdzaOYfKvijw8k6Hfj9pOiPyEZTp2W20EPbTeONTgJE2Rdxs4KZUfg6f2PmbMF1094NcqJ7DwSFUQwYiRmVCNvuA/s320/mist.png";
        break;
      case "Snow":
        weatherIcon.src =
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj-P3iT_uQK95qFY4h7QGdEtbRc1aVQo9BZy0ZWyPBvCNrP-4wnRStw0xYj9e4xa4ZlYISeNZqVJ33UP4YukR4jBennDD_obIN4QxYNZHdzG_z6_MNL2U08wMXwdFhtfvitW5LGiHgrwMJFC8QJFqbSO3woGSBqOdagGxaEQ20_S31Gc-GYL4vYzPzaPw/s320/snow.png";
        break;
      case "Haze":
        weatherIcon.src =
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjld66Ia5g_hpBn3Impi3zzOBHqWkjQInGLxTb2uXksuCsrkQU8HjlVyLobEJEGg8fRSIxeFzldGEHUmWcaiZBwAcRy4dGDpFX1BjTSB56qmBjW5tEW3RSC9_mCuLU_a8RuXchxGY7Oc8HLLl-IfaDW19Z0ZJJfNae9tECXRIyEu7rmJ3da08z8cI-phw/s320/haze.png";
        break;
    }
  };

  const callAPI = (id) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          alert(
            "Check the spelling of the city and try again or something went wrong!"
          );
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setWeatherDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again later.");
      });
  };

  searchButton.addEventListener("click", () => {
    if (searchInput.value === "") {
      alert("Please enter a city name.");
    } else {
      callAPI(API);
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchButton.click();
    }
  });
});
