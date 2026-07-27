const books = []

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

 addBookButton.addEventListener('click', function (e) {
    e.preventDefault()
    if (title.value && author.value && year.value && genre.value) {
        const newBook = {
            id: Date.now(),
            title: title.value,
            author: author.value,
            year: year.value,
            genre: genre.value
        }

    books.push(newBook)
    renderBooks(books)
    totalBooks.textContent = `Total Books Logged: ${books.length}`
    } else {
        alert('Please fill out all the fields')
    }

form.reset()

})

function renderBooks(arr) {
    bookLog.innerHTML = ''

    if (books.length == 0) {
         bookLog.innerHTML = '<p>No books logged yet</p>'
    } else {
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
            const index = books.findIndex(b => b.id == selectedId)
            books.splice(index, 1)
            renderBooks(books)
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
})

exploreBooksNav.addEventListener ('click', function (e){
    loggedBookSection.classList.add('hidden')
    formSection.classList.add('hidden')
    explorePage.classList.remove('hidden')
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


renderExploreBooks(data.docs)
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
        </div>
        `
        exploreLog.appendChild(exploreBookCard)

    })
} 


renderBooks(books)