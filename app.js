const viewSection = document.querySelector('#view_section');
const bookList = document.querySelector('.book_lists');
const form = document.querySelector('.form');
const contact = document.querySelector('.contact_info');
const listNav = document.querySelector('.list');
const addNav = document.querySelector('.new');
const contactNav = document.querySelector('.contact');

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static showBook() {
    const books = Book.getStoredBooks();

    books.forEach((book) => Book.addBookToList(book));
  }

  static addBookToList(book) {
    const newBook = document.createElement('article');
    newBook.className = 'new_book';
    newBook.innerHTML = `
      <p class="paragraph">${book.title} by ${book.author}</p>
      <button id=${book.id} class='remove_button'>Remove</button>
      `;
    viewSection.append(newBook);
  }

  static removeBook(bk) {
    if (bk.classList.contains('remove_button')) {
      bk.parentElement.remove();
    }
  }

  static clearValues() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static getStoredBooks() {
    let books;
    if (localStorage.getItem('localBook') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('localBook'));
    }
    return books;
  }

  static addBookToLocalStorage(book) {
    const books = Book.getStoredBooks();

    books.push(book);
    localStorage.setItem('localBook', JSON.stringify(books));
  }

  static removeBookFromLocalStorage(id) {
    const books = Book.getStoredBooks();

    const newBook = books.filter((book) => book.id !== +id);

    localStorage.setItem('localBook', JSON.stringify(newBook));
  }
}

document.addEventListener('DOMContentLoaded', Book.showBook);

document.querySelector('.button').addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = Math.floor(Math.random() * 10000000);

  if (title === '' || author === '') {
    alert('Please fill in the fields');
    return;
  }

  const book = new Book(title, author, id);

  Book.addBookToList(book);

  Book.addBookToLocalStorage(book);

  Book.clearValues();
});

viewSection.addEventListener('click', (e) => {
  Book.removeBook(e.target);

  Book.removeBookFromLocalStorage(e.target.id);
});

listNav.addEventListener('click', () => {
  listNav.classList.add('active');
  addNav.classList.remove('active');
  contactNav.classList.remove('active');
  bookList.classList.remove('hidden');
  form.classList.add('hidden');
  contact.classList.add('hidden');
});

addNav.addEventListener('click', () => {
  addNav.classList.add('active');
  listNav.classList.remove('active');
  contactNav.classList.remove('active');
  form.classList.remove('hidden');
  bookList.classList.add('hidden');
  contact.classList.add('hidden');
});

contactNav.addEventListener('click', () => {
  listNav.classList.remove('active');
  addNav.classList.remove('active');
  contact.classList.remove('hidden');
  form.classList.add('hidden');
  bookList.classList.add('hidden');
});