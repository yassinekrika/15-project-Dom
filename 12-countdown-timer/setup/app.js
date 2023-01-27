const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];



const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

let futureDate = new Date(2023, 11, 31, 00, 00, 0)

const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
const date = futureDate.getDate()


let month = futureDate.getMonth()
month = months[month]

giveaway.textContent = `giveaway ends on ${date} ${month} ${year} ${hours}:${minutes}am`

// future time in ms 

const futureTime = futureDate.getTime()

function getRemainingTime() {
  const today = new Date().getTime()
  const t = futureDate - today
  // 1s = 1000ms
  // 1m = 60s
  // 1h = 60min
  // 1day = 24h

  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000

  let days = Math.floor(t / oneDay)
  let hours = Math.floor((t % oneDay) / oneHour)
  let minutes = Math.floor((t % oneHour) / oneMinute)
  let seconds = Math.floor((t % oneMinute) / 1000)

  const values = [days, hours, minutes, seconds]

  function format(item) {
    if (item < 10) {
      return item = `0${item}`
    }
    return item
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index])
  })
  if (t<0){
    clearInterval(countdown)
    deadline.innerHTML = `
      <h4 class=""expired> sorry, this giveaway has expired</h4>
    `
  }
}

// count down 
let countdown = setInterval(getRemainingTime, 1000)

getRemainingTime()