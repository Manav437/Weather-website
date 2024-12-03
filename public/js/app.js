console.log('client side js is ready');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const port = process.env.PORT

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''


    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                messageOne.textContent = data.error
            } else {
                // console.log(data.address)
                messageOne.textContent = data.address
                // console.log(data.forecast)
                messageTwo.textContent = data.forecast
            }
        })
    })
})



// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })