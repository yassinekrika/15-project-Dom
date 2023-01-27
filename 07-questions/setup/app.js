


// const btns = document.querySelectorAll('.question-btn')

// btns.forEach((btn)=>{
//     btn.addEventListener('click', (e) => {
//         const question = e.currentTarget.parentElement.parentElement
//         question.classList.toggle('show-text')
//     })
// })

const questions = document.querySelectorAll('.question')

questions.forEach((qst) => {

    const btn = qst.querySelector('.question-btn')

    btn.addEventListener('click', () => {

        questions.forEach( (item) => {
            if (item !== qst) {
                item.classList.remove('show-text')
            }
        })
        
        qst.classList.toggle('show-text')
    })
})