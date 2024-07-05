// script.js

const apiUrl = 'https://api.open-meteo.com/v1/forecast?daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,precipitation_probability_max,wind_speed_10m_max&timezone=Asia%2FBangkok';
const searchloc = "https://geocoding-api.open-meteo.com/v1/search" 
const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');


let weatherText = {
  0: "Clear",
  2: "Partly Cloudy" ,
  3: "Clear",
  51: "Rain",
  80: "Rain",
  81: "Rain",
  95: "Thunderstorm",
  96: "Thunderstorm",
  61: "Rain",
  45: "Fog" 

  
}


let images = {

0: "assets/clear.png",
2: "assets/cloudy.png",
3: "assets/clear.png",
51: "assets/rain.png",
80: "assets/rain.png",
81: "assets/rain.png",
95: "assets/storm.png",
96:"assets/storm.png",
61:"assets/rain.png",
45:"assets/fog.png"

}


function inputLoc(location) {

fetch(searchloc + "?name=" + location) 
.then(response => response.json())
.then(data => {
  const loc = data.results[0]
  const lat = loc.latitude
  const long = loc.longitude
  fetchWeather(lat, long, location);




})

}

//default input lokasi Jakarta
inputLoc('Jakarta')

//input data lokasi

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
      inputLoc(location)
       
    }
});

//mengambil data weather  melalui url  API hari ini dan 6 hari kedepan 

function fetchWeather(lat, long, name) {
    fetch(apiUrl + '&latitude=' + lat + '&longitude=' + long)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = name;
            const temperatures = data.daily.temperature_2m_max;
            const windspeed = data.daily.wind_speed_10m_max;
            const weatherCodes = data.daily.weather_code;
            const time = data.daily.time;
             
          //data tanggal

            for (let i = 0; i < time.length; i++) {
                document.getElementById(`time${i + 1}`).textContent = ` ${time[i]}`;
              }

           //data temperatur

           for (let i = 0; i < temperatures.length; i++) {
            document.getElementById(`temperature${i + 1}`).textContent = `Temperature : ${temperatures[i]} °C`;
          }

          //data kecepatan angin 
            
          for (let i = 0; i < windspeed.length; i++) {
            document.getElementById(`windspeed${i + 1}`).textContent = `Wind Speed : ${windspeed[i]} km/h`;
          }

          //data kode cuaca, text , dan gambar

    /*        for (let i = 0; i < weatherCodes.length; i++) {
            document.getElementById(`weathercode${i + 1}`).textContent = `Weather Code : ${weatherCodes[i]} `;
      */    
          for (let i = 0; i < weatherCodes.length; i++) {
              document.getElementById(`weathercode${i + 1}`).textContent = `Weather : ${weatherText[weatherCodes[i]]}`
      
                

              document.querySelector(`#img-${i+1}`).src = images[weatherCodes[i]]
            //mengambil gambar dari data weatherCodes yang sedang di loop 

          }
            
                 



        })

        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
      }

// Membuat live clock

      function updateClock() {
        const now = new Date();
        const time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
        document.getElementById('currentTime').textContent = time;
      }
    
      // Panggil fungsi updateClock setiap detik
      setInterval(updateClock, 1000); // 1000 milidetik = 1 detik


      // Fungsi untuk mendapatkan tanggal dalam format "hari, tanggal bulan tahun"
      function getFormattedDate() {
        const date = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        
        return `${dayName}, ${day} ${monthName} ${year}`;
    }
    
    // Mendapatkan tanggal yang diformat
    const formattedDate = getFormattedDate();
    
    // Menampilkan tanggal yang diformat dalam elemen HTML
    document.getElementById('formattedDate').textContent = formattedDate;

