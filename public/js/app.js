console.log('client side js is ready');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.getElementById("weatherIcon");
const weatherCard = document.getElementById("weatherCard");
// const forecastImage = document.getElementById("weatherIcon")

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    weatherIcon.style.display = "none"; // Hide image initially
    weatherCard.style.display = "block"; // Show card while loading

    // document.getElementById("weatherIcon").setAttribute("src", data.weatherIcon)

    fetch('/weathers?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                messageOne.textContent = data.error
                weatherCard.style.display = "block";
            } else {
                // console.log(data.address)
                messageOne.textContent = data.address
                // console.log(data.forecast)
                messageTwo.textContent = data.forecast
                // console.log(data.weatherIcon)
                // forecastImage.setAttribute("src", data.weatherIcon)
                if (data.weatherIcon) {
                    weatherIcon.src = data.weatherIcon;
                    weatherIcon.style.display = "block"; // Show image
                }
            }
        })
    })
})

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("header a");
    const currentURL = window.location.href;

    links.forEach(link => {
        if (currentURL.includes(links.href)) {
            link.classList.add("active");
        }
    });
});

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })