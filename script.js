const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
const searchInput = document.getElementById('search');

let books = JSON.parse(localStorage.getItem('books')) || [];

function saveBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function renderBooks(filter = '') {
  bookList.innerHTML = '';
  books
    .filter(book =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((book, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${book.title}</strong> by ${book.author} <em>(${book.category})</em>
      <button onclick="removeBook(${index})">Remove</button>`;
      bookList.appendChild(li);
    });
}

function removeBook(index) {
  books.splice(index, 1);
  saveBooks();
  renderBooks(searchInput.value);
}

bookForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const category = document.getElementById('category').value;
  books.push({ title, author, category });
  saveBooks();
  renderBooks();
  bookForm.reset();
});

searchInput.addEventListener('input', e => {
  renderBooks(e.target.value);
});

renderBooks();
