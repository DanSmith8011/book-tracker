let books = []
let token = null

const form = document.getElementById('form')
const title = document.getElementById('book-title')
const author = document.getElementById('book-author')
const year = document.getElementById('book-year')
const genre = document.getElementById('select-genre')
const addBookButton= document.getElementById('add-book')
const totalBooks = document.getElementById('total-books')
const bookLog = document.getElementById('book-cards')
const navHome = document.getElementById('nav-home')
const loggedBooksNav = document.getElementById('nav-logged-books')
const formSection = document.getElementById('form-view')
const loggedBookSection = document.getElementById('logged-books-view')
const filter = document.getElementById('select-filter')
const filterButton = document.getElementById('filter-button')
const clearButton = document.getElementById('clear-button')
const exploreBooksNav = document.getElementById('nav-explore')
const explorePage = document.getElementById('explore-page')
const searchButton = document.getElementById('search-button')
const searchBar = document.getElementById('search-bar')
const exploreLog = document.getElementById('explore-book-cards')
const toolBar = document.querySelector('.toolbar')
const loginView = document.getElementById('login-view')
const registerView = document.getElementById('register-view')
const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')
const loginButton = document.getElementById('login')
const registerUsername = document.getElementById('register-username')
const registerPassword = document.getElementById('register-password')
const registerButton = document.getElementById('register')
const goToRegister = document.getElementById('go-to-register')
const goToLogin = document.getElementById('go-to-login')
const navBar = document.getElementById('main-header')

 addBookButton.addEventListener('click', function (e) {
    e.preventDefault()
    if (title.value && author.value && year.value && genre.value) {
        const newBook = {
            title: title.value,
            author: author.value,
            year: year.value,
            genre: genre.value
        }

    addBook(newBook)
    
    
    } else {
        alert('Please fill out all the fields')
    }

form.reset()


})

function renderBooks(arr) {
    
    bookLog.innerHTML = ''
    console.log('bookLog element:', bookLog)
    if (arr.length == 0) {
         bookLog.innerHTML = '<p>No books logged yet</p>'
         toolBar.classList.add('hidden')
         totalBooks.classList.add('hidden')
    } else {
        toolBar.classList.remove('hidden')
        arr.forEach(book =>  {
        const bookCard = document.createElement('article')
        bookCard.innerHTML = `
        <div class="book-cover"></div>
        <div class="book-info">
        <h2>${book.title}</h2>
        <p>${book.author}</p>
        <p>${book.year}</p>
        <p>${book.genre}</p>
        <button data-id=${book.id} >Delete</button>
        </div>
        `
        bookCard.querySelector('button').addEventListener('click', function (e){
            const selectedId = this.dataset.id
            deleteBook(selectedId)
        })

        bookLog.appendChild(bookCard)
     
        })}

}

navHome.addEventListener('click', function (e){
    loggedBookSection.classList.add('hidden')
    formSection.classList.remove('hidden')
    explorePage.classList.add('hidden')
})

loggedBooksNav.addEventListener('click', function (e){
    loggedBookSection.classList.remove('hidden')
    formSection.classList.add('hidden')
    explorePage.classList.add('hidden')
    getBooks()
})

exploreBooksNav.addEventListener('click', function(e) {
    loggedBookSection.classList.add('hidden')
    formSection.classList.add('hidden')
    explorePage.classList.remove('hidden')
    searchBooks('popular fiction')
})

goToLogin.addEventListener('click', function (e){
    registerView.classList.add('hidden')
    loginView.classList.remove('hidden')

})

goToRegister.addEventListener('click', function (e){
    registerView.classList.remove('hidden')
    loginView.classList.add('hidden')

})



filterButton.addEventListener('click', function (e) {
    const selectedGenre = filter.value

    if (selectedGenre === 'all') {
        renderBooks(books)
    } else {
        const filteredBooks = books.filter(book => book.genre === selectedGenre) 
        renderBooks(filteredBooks) 
    }
})

clearButton.addEventListener('click', function (e) {
    books.splice(0, books.length)
    renderBooks(books)
})

async function searchBooks (query) {
const url = `https://openlibrary.org/search.json?q=${query}`
const response = await fetch(url)
const data = await response.json()

const booksWithCovers = data.docs.filter(book => book.cover_i)
renderExploreBooks(booksWithCovers)
}

searchButton.addEventListener('click', function (e){
    const searchValue = searchBar.value
    searchBooks(searchValue)
})

function renderExploreBooks (array) {
    exploreLog.innerHTML = ''
    array.forEach(books => {
        const exploreBookCard = document.createElement('article')
        exploreBookCard.innerHTML = `
        <div class="explore-book-cover"></div>
        <div class="explore-book-info">
        <h2>${books.title}</h2>
        <p>${books.author_name ? books.author_name[0] : 'Uknown Author'}</p>
        <p>${books.first_publish_year}</p>
        ${books.cover_i ? `<img src="https://covers.openlibrary.org/b/id/${books.cover_i}-M.jpg" />` : `<div class="placeholder"></div>`}
        <button id='explore-book-log'>Log Book</button>
        </div>
        `
        exploreBookCard.querySelector('button').addEventListener('click', function (e){
             const newBook = {
            title: books.title,
            author: books.author_name ? books.author_name[0] : 'Uknown Author',
            year: books.first_publish_year,
            genre: 'unkown'
        }
            addBook(newBook)
        })

        exploreLog.appendChild(exploreBookCard)


    })
} 

async function getBooks() {
    const url = `http://localhost:8000/books`
    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    const data = await response.json()
    books = data
    renderBooks(data)
    totalBooks.textContent = `Total Books Logged: ${data.length}`
}


async function addBook(newBook){
    const response = await fetch('http://localhost:8000/books', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newBook)
    })
    getBooks()
}

async function deleteBook(bookId){
    const response = await fetch(`http://localhost:8000/books/${bookId}`,{
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    getBooks()
}

async function register(){
const response = await fetch(`http://localhost:8000/users`, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: registerUsername.value,
            password: registerPassword.value
        })

    })
        registerView.classList.add('hidden')
        loginView.classList.remove('hidden')
}

registerButton.addEventListener('click', function (e){
    register()
})

async function login(){
    
    const response = await fetch(`http://localhost:8000/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', },
        body: JSON.stringify({
            username: usernameInput.value,
            password: passwordInput.value
        })
    })
    const data = await response.json()
    console.log(data)
    token = data
    loginView.classList.add('hidden')
    explorePage.classList.remove('hidden')
    navBar.classList.remove('hidden')

}
 loginButton.addEventListener('click', function (e){
    login()
    searchBooks('popular fiction')
})
