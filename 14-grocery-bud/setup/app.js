// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.getElementById('grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clear = document.querySelector('.clear-btn')


// edit option
let editElement
let editFlag = false
let editId = ''
// ****** EVENT LISTENERS **********
// submit form
form.addEventListener('submit',addItem)
// clear items
clear.addEventListener('click', clearItems)
// load content
window.addEventListener('DOMContentLoaded', setUpItems)
// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString()
    
    if (value && !editFlag) {
        const element = document.createElement('article')
        //  add class
        element.classList.add('grocery-item')
        // add id
        const attr = document.createAttribute('data-id')
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `
                        <p class="title">${value}</p>
                        <div class="btn-container">
                            <button type="button" class="edit-btn">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" class="delete-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>`
        
        
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', deleteItem)
        editBtn.addEventListener('click', editItem)
        //  append child
        list.appendChild(element)
        // display alert
        displayAlert('item added to the list', 'success')
        // show container
        container.classList.add('show-container')
        // add to local storage
        addToLocalStorage(id, value)
        // set back to default
        setBackToDefault()
    } else if (value && editFlag) {
        console.log('editing existing value')
        editElement.innerHTML = value
        displayAlert('value changed', 'danger')
        //  edit local storage
        editLocalStorage(editId, value)
        setBackToDefault()

    } else {
        displayAlert('please enter value', 'success')
    }
}
// delete item 
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement
    const id = element.dataset.id
    list.removeChild(element)
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('item removed', 'danger')
    setBackToDefault()
    // remove from local storage
    removeFromLocalStorage(id)
}
// edit item
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement
    // set edit item 
    editElement = e.currentTarget.parentElement.previousElementSibling
    grocery.value = editElement.innerHTML
    editFlag = true
    editId = element.dataset.id
    submitBtn.textContent = 'edit'
}

// display alert
function displayAlert(text, action) {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)
    setTimeout(() => {
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}
// clear items
function clearItems() {
    const items = document.querySelectorAll('.grocery-item')

    if (items.length >= 0) {
        items.forEach((item) => {
            list.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    displayAlert('empry list', 'danger')
    setBackToDefault()
}
// set back to default 
function setBackToDefault() {
    grocery.value = ''
    editFlag = false
    editId = ''
    submitBtn.textContent = "submit"
}
// ****** LOCAL STORAGE **********
// localStorage.setItem('orange', JSON.stringify(['item', 'item2']))
// const oranges = JSON.parse(localStorage.getItem('orange'))
// localStorage.removeItem('orange')

function addToLocalStorage(id, value) {
    // const grocery = {id: id, value: value}
    const grocery = {id, value} 
    let items = getLocalStorage()

    items.push(grocery)
    localStorage.setItem('list', JSON.stringify(items))
    
    console.log(grocery);
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage()
    items = items.filter((item) => {
        if (item.id !== id){
            return item
        }
    })
    localStorage.setItem('list', JSON.stringify(items))

}

function editLocalStorage(editId, value) {
    let items = getLocalStorage()
    items = items.map((item) => {
        if (item.id == editId) {
            item.value = value
        }
        return item
    })
    localStorage.setItem('list', JSON.stringify(items))
}
function getLocalStorage () {
    return localStorage.getItem('list')? JSON.parse(localStorage.getItem('list')) : []
}
// ****** SETUP ITEMS **********
function setUpItems () {
    let items = getLocalStorage()
    if (items.length > 0) {
        items.forEach((item) => {
            createListItem(item.id, item.value)
        })
    }
    container.classList.add('show-container')
}

function createListItem (id, value) {
        const element = document.createElement('article')
        //  add class
        element.classList.add('grocery-item')
        // add id
        const attr = document.createAttribute('data-id')
        attr.value = id
        element.setAttributeNode(attr)
        element.innerHTML = `
                        <p class="title">${value}</p>
                        <div class="btn-container">
                            <button type="button" class="edit-btn">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button type="button" class="delete-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>`
        
        
        const deleteBtn = element.querySelector('.delete-btn')
        const editBtn = element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click', deleteItem)
        editBtn.addEventListener('click', editItem)
        //  append child
        list.appendChild(element)
}