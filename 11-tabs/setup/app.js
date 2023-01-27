

// const btns = document.querySelectorAll('.tab-btn')
// const history = document.getElementById('history')
// const vision = document.getElementById('vision')
// const goals = document.getElementById('goals')

// btns.forEach((btn) => {
//     btn.addEventListener('click', () => {
//         if (btn.dataset.id === "history") {
//             btn.classList.add('active')
//             history.classList.add('active')
//             vision.classList.remove('active')
//             goals.classList.remove('active')
//         }
//         if (btn.dataset.id === "vision") {
//             btn.classList.add('active')
//             history.classList.remove('active')
//             vision.classList.add('active')
//             goals.classList.remove('active')
//         }
//         if (btn.dataset.id === "goals") {
//             btn.classList.add('active')
//             history.classList.remove('active')
//             vision.classList.remove('active')
//             goals.classList.add('active')
//         }
//     })
// })

const btns = document.querySelectorAll('.tab-btn')
const about = document.querySelector('.about')
const articles = document.querySelectorAll('.content')

about.addEventListener('click', (e) => {
   const id = e.target.dataset.id
   if (id) {
        btns.forEach((btn) => {
            btn.classList.remove('active')
            e.target.classList.add('active')
        })
        // hide all the articles
        articles.forEach((article) => {
            article.classList.remove('active')
            const element = document.getElementById(id)
            element.classList.add('active')
        })
   }
})