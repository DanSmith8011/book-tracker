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

})

function renderBooks(arr) {
    bookLog.innerHTML = ''
    arr.forEach(book =>  {
    const bookCard = document.createElement('article')
    bookCard.innerHTML = `
   
    <h2>${book.title}</h2>
    <p>${book.author}</p>
    <p>${book.year}</p>
    <p>${book.genre}</p>
    <button data-id=${book.id} >Delete</button>
    `
    bookCard.querySelector('button').addEventListener('click', function (e){
        const selectedId = this.dataset.id
        const index = books.findIndex(b => b.id == selectedId)
        books.splice(index, 1)
        renderBooks(books)
    })

    bookLog.appendChild(bookCard)
    })


}

navHome.addEventListener('click', function (e){
    loggedBookSection.classList.add('hidden')
    formSection.classList.remove('hidden')
})

loggedBooksNav.addEventListener('click', function (e){
    loggedBookSection.classList.remove('hidden')
    formSection.classList.add('hidden')
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



