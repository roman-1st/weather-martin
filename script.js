// let search = function() {
//     const massiv = fetch("/city.list.json")
//     .then(function (a) { return a.json() })
//     .then(function (massiv)  {
//         console.log(massiv)
//         viewcity(massiv)
//     })
// }

// search()

let city

function search() {
    // document.getElementById('btn').addEventListener('click', () => { 
    // let city = prompt('Введите название города','')
    // console.log(city)
    // viewcity (city)
    // return city
    // })

    city = document.getElementById('searchcity').value
    console.log(city);
    viewcity (city)
}




function viewcity (city) {
    // let select = document.querySelector("#select")
    // city.forEach(c => {
    //     let option = document.createElement('option')
    //     c.lenght = option.lenght
    //     option.innerHTML = `${c.name}`
    //     select.append(option)
    // });
    
    // select.addEventListener('change', function() {
    //     const value = select.value;
 
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
        document.querySelector('.sky').innerHTML = `Облачность ${data.clouds.all} %`
        console.log(data);
        }
    // })
    // })
})
}


let citytime = function (time) {
    let thisdata = time.dt * 1000
    let dataD = new Date(thisdata)
    document.querySelector('.time').innerHTML = `Актуально на ${dataD.getHours()} час. ${dataD.getMinutes()} мин. `
}

function citywind(num) {
    let val = Math.floor((num.wind.deg / 22.5) + 0.5);
    let arr = ["С", "С-СВ", "СВ", "В-СВ", "В", "В-ЮВ", "ЮВ", "Ю-ЮВ", "Ю", "Ю-ЮЗ", "ЮЗ", "З-ЮЗ", "З", "З-СЗ", "С-З", "С-СЗ"];
    document.querySelector('.wind-compas').innerHTML = `"${arr[(val % 16)]}" ветер` 
}   

// function citysky(skyes) {
//     let citiesSky = skyes.clouds.all
//     if(skyes.clouds.all <= 25 && skyes.clouds.all ==! 0) {
//         document.querySelector('.----').innerHTML = `Рассеянные облака`
//     } 
//     else if (skyes.clouds.all > 25 && skyes.clouds.all <= 50) {
//         document.querySelector('.----').innerHTML = `Отдельные облака`
//     }
//     else if (skyes.clouds.all > 50 && skyes.clouds.all <= 75) {
//         document.querySelector('.----').innerHTML = `Значительные облака`
//     }
//     else if (skyes.clouds.all > 75 && skyes.clouds.all <= 100) {
//         document.querySelector('.----').innerHTML = `Сплошные облака`
//     }
//     else if (skyes.clouds.all == 0) {
//         document.querySelector('.----').innerHTML = `Ясно`
//     }
    
// }