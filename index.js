// unsplash api ("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
// coingecko api www.coingeecko.com/api/documentations/v3#/
// openweather api https://apis.scrimba.com/openweathermap/data/2.5/weather


//FETCHING IMAGES FROM UNSPLASH API 
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=motivational-quotes")
    .then(response => response.json())
    .then(data => {
        // imageContainer.innerHTML = `<img class="images" src="${data.urls.regular}" alt="${data.alt_description}">`
        document.body.style.backgroundImage = `url('${data.urls.full}')`;
        document.getElementById('image-author').innerText = `By: ${data.user.name}`
    })
    .catch(error => {
        // DEFAULT BACKGROUND IMAGE WHEN THERE'S AN ISSUE WITH THE API
        document.body.style.backgroundImage = `url('images/background-image.avif')`
    })

// FETCHING DATA FROM COIN GECKO API
fetch('https://api.coingecko.com/api/v3/coins/ethereum')
    .then(response => {
        if(!response.ok) {
            throw Error("Error from coingecko API")
        }
        return response.json()
    })
    .then(data => {
        document.getElementById('crypto-container').innerHTML = `
        <div class="crypto-img-container">
            <img src="${data.image.small}" >
            <p class="crypto-name">${data.name}</p>
        </div>
        <p class="24high-price">24h high: $${data.market_data.high_24h.usd}</p>
        <p class="current-price"> Current price: $${data.market_data.current_price.usd}</p>
        <p clas="24low-price">24h low: $${data.market_data.low_24h.usd}</p>`
    })
    .catch(error => {
        // ERROR MESSAGE WHEN THERE'S AN ISSUE WITH API
        document.getElementById('crypto-container').textContent = `Price not available`
        console.log(error)
    })


// UPDATING TIME EVERY SECOND
setInterval(()=> {
    const currentTime = new Date
    document.getElementById('time').textContent = currentTime.toLocaleTimeString("en-Us", {timeStyle: "short"})
}, 1000)



// FETCH COORDINATES BASED ON IP
fetch('https://ipapi.co/json/')
    .then(response => {
        if(!response.ok){
            throw Error(`Error fetching IP location`)
        }
        return response.json()
    })
    .then(coordData => {
        const latitudeCoord = coordData.latitude
        const longitudeCoord = coordData.longitude
    // FETCH WEATHER BASED ON IP COORDINATES
    return fetch(`http://api.weatherapi.com/v1/current.json?key=90112655968d406a8ff114954250104&q=${latitudeCoord}, ${longitudeCoord}`)
    })
    .then(response => {
        if(!response.ok) {
            throw Error('Error from weather API')
        }
        return response.json()
    })
    .then(weatherData => {
        console.log(weatherData)
        const weatherIcon = weatherData.current.condition.icon
        const tempCity = weatherData.current.temp_c     
        const cityName = weatherData.location.name
        document.getElementById('weather-container').innerHTML = `
        <div class="icon-city">
            <img src="https://${weatherIcon}">
            <p class="city-temp">${tempCity}</p>
        </div>
            <p>${cityName}</p>`
    })
    .catch(error => {
        console.error(error)
        document.getElementById('weather-container').textContent = `Weather not available`
    })











