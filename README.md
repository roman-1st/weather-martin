# weather-martin
Задача проекта: получение данных из JSON, обработка и отправка запроса в API, получение данных из API и отображение в HTML

Задачу выполнил, был такой код: 

let search = function() {
     const massiv = fetch("/city.list.json")
    .then(function (a) { return a.json() })
     .then(function (massiv)  {
         console.log(massiv)
         viewcity(massiv)
     })
}
function viewcity (city) {
    let select = document.querySelector("#select")
    city.forEach(c => {
        let option = document.createElement('option')
        c.lenght = option.lenght
        option.innerHTML = `${c.name}`
        select.append(option)
    });
    
    select.addEventListener('change', function() {
        const value = select.value;
 
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=8f0125d0dac4558db68403baec52a642&units=metric`)
    .then(function (a) { return a.json() })
    .then(function (data) {
        document.querySelector(".city-name").innerHTML = data.name
        document.querySelector('.status').innerHTML = data.weather[0].description
        document.querySelector('.humidity').innerHTML = `${data.main.humidity} %`
        document.querySelector('.temp').innerHTML = ` ${Math.round(data.main.temp)} ℃`
        document.querySelector('.vision').innerHTML = `${data.visibility} метров` 
        console.log(data);
    })
    })

}

Однако, мне не понравилось, что  JSON, как базы данных городов, хранился на моем ПК, имел ограниченный размер ввиду своего объема. В следсвтие этого я решил отказаться от получения списка городов из JSON в пользу получения названия города непосредственно от пользователя. 
Плюсом этого решения можно назвать то, что JSON не используется, запрос идет на прямую в API. Также, объем данных с названием городов ограничивается лишь информацией в API, что позволяет искать совершенно любой город или населенный пункт.

Соответственно, для решения вновь поставленной задачи, я принял решение сделать через поисковую строку, чтобы пользователь не выбирал из списка предложенного, а вбивал название города сам. 

Далее, я захотел, чтобы картинки, получаемые с API и картинки-обозначения были одного формата. Подумал и решил получать картинки не через API, а собственные. Около 2х-3х часов подбирал их, но конечный результат мне пришелся почему-то по душе.

В стиле решил отдать предпочтение темным тонам. 

Далее, по получаемой с API информации. Обратил внимание, что все параметры, за исключением видимости, передаются относительно точно. Видимость всегда приходит 10 000, но, несмотря на это решил оставить.

Как итог - относительно забавный погодный одностраничник.
