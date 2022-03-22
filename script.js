document.addEventListener("DOMContentLoaded", () => {
    search()
})

function search() {
    document.querySelector("#submit").addEventListener("click", () => {
        let city = document.getElementById('searchcity').value
        console.log(city);
        viewcity (city) 
        viewcitytomottow (city)
    })

    document.querySelector("#searchcity").addEventListener("keydown", (event) => {
        if(event.keyCode === 13) {
            city = event.target.value
            viewcity(city)
        }
    })
}

function viewcity (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=8f0125d0dac4558db68403baec52a642&units=metric`)
        .then(function (a) { return a.json() })
        .then(function (data) {
            if(data.name == undefined) {
            alert('В названии города ошибка =(')
            } else { 
                document.querySelector(".city-name").innerHTML = data.name
                document.querySelector('.status').innerHTML = data.weather[0].description
                document.querySelector(".weather-icon").innerHTML = `<img src="weather-icon/${data.weather[0].icon}.png">`
                document.querySelector('.humidity').innerHTML = `${data.main.humidity} %`
                document.querySelector('.temp').innerHTML = ` ${Math.round(data.main.temp)} ℃`
                document.querySelector('.vision').innerHTML = `${data.visibility} м` 
                citytime(data)
                document.querySelector('.wind').innerHTML = `${Math.round(data.wind.speed)} м/с`
                citywind(data)
                document.querySelector('.pressure').innerHTML = `${(data.main.pressure / 1.333).toFixed(2)} мм рт.ст.` 
                document.querySelector('.sky').innerHTML = `облачность ${data.clouds.all} %`
                console.log(data);
        
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&lang=ru&exclude=current,minutely,hourly,alerts&appid=8f0125d0dac4558db68403baec52a642&units=metric`)
                    .then(function (a) { return a.json() })
                    .then(function (datatomorrow) {
                    document.querySelector(".status1").innerHTML = datatomorrow.daily[1].weather[0].description
                    document.querySelector(".pic1").innerHTML = `<img src="weather-icon/${datatomorrow.daily[1].weather[0].icon}.png">`
                    document.querySelector(".temp1").innerHTML = `Днем ${Math.round(datatomorrow.daily[1].temp.day)} ℃`
                    document.querySelector(".tempN1").innerHTML = `Ночью ${Math.round(datatomorrow.daily[1].temp.night)} ℃`

                    document.querySelector(".status2").innerHTML = datatomorrow.daily[2].weather[0].description
                    document.querySelector(".pic2").innerHTML = `<img src="weather-icon/${datatomorrow.daily[2].weather[0].icon}.png">`
                    document.querySelector(".temp2").innerHTML = `Днем ${Math.round(datatomorrow.daily[2].temp.day)} ℃`
                    document.querySelector(".tempN2").innerHTML = `Ночью ${Math.round(datatomorrow.daily[2].temp.night)} ℃`

                    document.querySelector(".status3").innerHTML = datatomorrow.daily[3].weather[0].description
                    document.querySelector(".pic3").innerHTML = `<img src="weather-icon/${datatomorrow.daily[3].weather[0].icon}.png">`
                    document.querySelector(".temp3").innerHTML = `Днем ${Math.round(datatomorrow.daily[3].temp.day)} ℃`
                    document.querySelector(".tempN3").innerHTML = `Ночью ${Math.round(datatomorrow.daily[3].temp.night)} ℃`

                    document.querySelector(".status4").innerHTML = datatomorrow.daily[4].weather[0].description
                    document.querySelector(".pic4").innerHTML = `<img src="weather-icon/${datatomorrow.daily[4].weather[0].icon}.png">`
                    document.querySelector(".temp4").innerHTML = `Днем ${Math.round(datatomorrow.daily[4].temp.day)} ℃`
                    document.querySelector(".tempN4").innerHTML = `Ночью ${Math.round(datatomorrow.daily[4].temp.night)} ℃`

                    console.log(datatomorrow.daily);
                })
            }
    })
}

let citytime = function (time) {
    let thisdata = time.dt * 1000
    let dataD = new Date(thisdata)
    document.querySelector('.time').innerHTML = `актуально на ${dataD.getHours()} час. ${dataD.getMinutes()} мин. `
}

function citywind(num) {
    let val = Math.floor((num.wind.deg / 22.5) + 0.5);
    let arr = ["С", "С-СВ", "СВ", "В-СВ", "В", "В-ЮВ", "ЮВ", "Ю-ЮВ", "Ю", "Ю-ЮЗ", "ЮЗ", "З-ЮЗ", "З", "З-СЗ", "С-З", "С-СЗ"];
    document.querySelector('.wind-compas').innerHTML = `"${arr[(val % 16)]}" ветер` 
}