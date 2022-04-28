document.addEventListener("DOMContentLoaded", () => {
    search(city)
    getGeolocation() 

})

let city

function search() {
    document.querySelector("#submit").addEventListener("click", () => {
        city = document.getElementById('searchcity').value
        console.log(city);
        viewresult (city) 
    })
    document.querySelector("#searchcity").addEventListener("keydown", (event) => {
        if(event.keyCode === 13) {
            city = event.target.value
            actualapi(city)
        }
    })
}

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((v) => {
            actualapi(null, v.coords)
        }, (error) => {
            console.error(error)
        });
    } else {
        console.error("Ваш браузер не поддерживает геолокацию");
    }
}

let actualapi = async (city, coords) => {
    let api = ''
    if (city) {
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=8f0125d0dac4558db68403baec52a642&units=metric`
    } else {
        api = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&lang=ru&appid=8f0125d0dac4558db68403baec52a642&units=metric`
    }
    fetch(api)
        .then(function (a) { return a.json() })
        .then(function (data) {
            if(data.name == undefined) {
                alert('В названии города ошибка =(')
            } else { 
                document.querySelector(".city-name").innerHTML = data.name
                document.querySelector(".status").innerHTML = data.weather[0].description
                document.querySelector(".weather-icon").innerHTML = `<img src="weather-icon/${data.weather[0].icon}.png">`
                document.querySelector('.humidity').innerHTML = `${data.main.humidity} %`
                document.querySelector('.temp').innerHTML = ` ${Math.round(data.main.temp)} ℃`
                document.querySelector('.vision').innerHTML = `${data.visibility}м` 
                document.querySelector('.wind').innerHTML = `${Math.round(data.wind.speed)} м/с`
                document.querySelector('.pressure').innerHTML = `${(data.main.pressure / 1.333).toFixed(2)} мм рт.ст.` 
                document.querySelector('.sky').innerHTML = `облачность ${data.clouds.all} %`
                citywind(data)
                citytime(data)
        
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&lang=ru&exclude=current,minutely,hourly,alerts&appid=8f0125d0dac4558db68403baec52a642&units=metric`)
                    .then(function (a) { return a.json() })
                    .then(function (datatomorrow) {

                        function addtohtml (a,b,c,d,e) {
                            document.querySelector(a).innerHTML = datatomorrow.daily[e].weather[0].description
                            document.querySelector(b).innerHTML = `<img src="weather-icon/${datatomorrow.daily[e].weather[0].icon}.png">`
                            document.querySelector(c).innerHTML = `Днем ${Math.round(datatomorrow.daily[e].temp.day)} ℃`
                            document.querySelector(d).innerHTML = `Ночью ${Math.round(datatomorrow.daily[e].temp.night)} ℃`
                        }
                
                    addtohtml(".status1", ".pic1", ".temp1", ".tempN1", 1)
                    addtohtml(".status2", ".pic2", ".temp2", ".tempN2", 2)
                    addtohtml(".status3", ".pic3", ".temp3", ".tempN3", 3)
                    addtohtml(".status4", ".pic4", ".temp4", ".tempN4", 4)
                    addtohtml(".status5", ".pic5", ".temp5", ".tempN5", 5)
                    addtohtml(".status6", ".pic6", ".temp6", ".tempN6", 6)

                    document.querySelector('.dayafter').style.display = 'flex'
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