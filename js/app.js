const books = []

const form = document.getElementById('form')
const title = document.getElementById('book-title')
const author = document.getElementById('book-author')
const year = document.getElementById('book-year')
const genre = document.getElementById('select-genre')
const addBookButton= document.getElementById('add-book')
const totalBooks = document.getElementById('total-books')
const bookLog = document.querySelector('.book-log')

addBookButton.addEventListener('click', function (e) {
    e.preventDefault()
    if (title.value && author.value && year.value && genre.value) {
        const newBook = {
            title: title.value,
            author: author.value,
            year: year.value,
            genre: genre.value
        }

    books.push(newBook)
    renderBooks(books)
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
    `

    bookLog.appendChild(bookCard)
    })
}