'use strict'

const oraDropdown = document.querySelector('#ora')

for (let i = 8; i < 20; i++) {
    oraDropdown.innerHTML += `<option value="${i}">${i < 10 ? '0' + i : i}:00 - ${
        i + 1 < 10 ? '0' + (i + 1) : i + 1
    }:00</option>`
}

//
//

const inpDay = document.querySelector('#dita')
const inpHour = document.querySelector('#ora')
const submitBtn = document.querySelector('#submit-btn')

const date = new Date()
const today = date.getDay()
const hours = date.getHours()

if (today >= 1 && today <= 5 && hours >= 8 && hours <= 19) {
    inpDay[today].selected = true
    inpHour[hours - 7].selected = true
    submitBtn.style.textDecorationLine = 'underline'
}

//
//

const selectTags = document.querySelectorAll('#data-form select')

selectTags.forEach((select) => {
    select.addEventListener('change', () => {
        if (selectTags[0].value !== '' && selectTags[1].value !== '')
            submitBtn.style.textDecorationLine = 'underline'
    })
})

//
//

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

//
//

const getData = async (event) => {
    event.preventDefault()

    const day = parseInt(inpDay.value)
    const hour = parseInt(inpHour.value)

    const dataOutDiv = document.querySelector('#data-out')

    const loadingTimeout = setTimeout(() => (dataOutDiv.innerHTML = '<h1>Loading...</h1>'), 1500)

    const url = 'https://fshn-backend-z7kk.onrender.com/'
    const data = await fetch(`${url}salla/${day}/${hour}`)
        .then((response) => response.json())
        .then((data) => {
            clearTimeout(loadingTimeout)
            return data
        })
        .catch((error) => console.log(`Error: ${error}`))

    dataOutDiv.innerHTML = ''

    const dataColumns = []

    for (const godine in data) {
        if (data[godine].length > 0 && /^[A-Z]$/g.test(godine)) {
            dataOutDiv.innerHTML += `
        <div id="godine-${godine.toLocaleLowerCase()}">
            <h1 class="data-out-godine-title">${godine}</h1>
        </div>
        `

            await sleep(300)
        }
    }

    await sleep(100)

    for (const godine in data) {
        if (Object.hasOwnProperty.call(data, godine)) {
            const sallat = data[godine]

            console.log(sallat, sallat.length)
            for (const salle of sallat) {
                if (sallat.length > 0 && /^[A-Z]$/g.test(godine)) {
                    document.querySelector(
                        `#godine-${godine.toLocaleLowerCase()}`
                    ).innerHTML += `<h1>${salle}</h1>`

                    await sleep(100)
                }
            }
        }
    }
}
