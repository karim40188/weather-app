
let city = document.querySelector(".location")
let searchInput = document.querySelector(".search-bar input")


let recentCities;

// check localstorage
if (localStorage.city != null) {
    recentCities = JSON.parse(localStorage.getItem("city"))
} else {
    recentCities = []
}



// get weather 
let apiKey = `08cc14dbe53b44c8b0f21937232812`,
    baseUrl = `http://api.weatherapi.com/v1/forecast.json`
async function getWeather(location) {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=Q7QDGZQWY97PQQ3W6HCC4EG25&contentType=json`)
    let data = await response.json()
    console.log("this is data",data)
    displayWeather(data)
}
getWeather("cairo")

// display weather
function displayWeather(data) {
    city.innerHTML = `<div>${data.resolvedAddress}</div>`
    let weatherArr = data.days
    let cardsHtml = ''
    for (let [index, day] of weatherArr.entries()) {
        console.log(day.icon)
        cardsHtml += `  <div class="card ${index == 0 ? "active" : ""}">
        <div class="card-header">
        <div>${index}</div>
            <div class="day">${new Date(day.datetime).toLocaleDateString("en-us", { weekday: "long" })}</div>
            <div class="time">${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getHours() > 11 ? "PM" : "AM"}</div>
        </div>
        <div class="card-img">
        <img src="${day.icon}.png"
            alt="">
    </div>
        <div class="card-body">

            <div class="degree">
                ${day.temp} c<sup>o</sup>
            </div>
        </div>
        <div class="card-data">

            <div class="left-column">
                <ul>
                    <li>Real Feel:${day.feelslike}</li>
                    <li>wind:${day.windspeed}</li>
                    <li>pressure:${day.pressure}</li>
                    <li>humidity:${day.humidity}</li>
                </ul>
            </div>

            <div class="right-column">
                <ul>
                    <li>sunset:${day.sunset}</li>
                    <li>sunrise:${day.sunrise}</li>
                </ul>
            </div>

        </div>

    </div>
  `
    }
    document.querySelector(".forecast-cards").innerHTML = cardsHtml
    let cards = document.querySelectorAll(".card")
    for (let card of cards) {
        card.addEventListener("click", function (e) {

            let activeCard = document.querySelector(".card.active")
            activeCard.classList.remove("active")
            e.currentTarget.classList.add("active")

        })
    }

    let exist = recentCities.find((currentCity) => {
        return currentCity == data.address

    })

    if (exist) return
    displayImg(data.address)
    recentCities.push(data.address)
    localStorage.setItem("city", JSON.stringify(recentCities))




}


window.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
        getWeather(searchInput.value)
        searchInput.value = ""

    }
})

let apiKey_2 = 'YC1S6EYRVPg2F0y8bspejQn7Rs2OxpMeYxLppeY8eYA'

// get city img
async function getImg(query) {
    let response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${apiKey_2}`)
    let data = await response.json()
    return data
}


// display img 
async function displayImg(query) {
    let imgData = await getImg(query)
    let imgArr = imgData.results
    let random = Math.floor(Math.random() * imgArr.length)
    let randomImg = imgArr[random]
    let imgCard = ` <div class="cities-imgs">
    <img src="${randomImg.urls.regular}"
        alt="">
</div>`
    document.querySelector("footer .container").innerHTML += imgCard
}
window.addEventListener("load", function () {
    recentCities.forEach(currentCity => {
        displayImg(currentCity)

    });


})

