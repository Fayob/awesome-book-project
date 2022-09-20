const title = document.querySelector('#title');
const author = document.querySelector('#author');
const bookForm = document.querySelector('.button');
const displayBook = document.querySelector('#view_section');

let bookData;
let bookStore = JSON.parse(localStorage.getItem('localBook')) || [];
function addBook() {
  bookData = {
    title: title.value,
    author: author.value,
    id: Math.floor(Math.random() * 1000000),
  };
  bookStore.push(bookData);
  localStorage.setItem('localBook', JSON.stringify(bookStore));
}

function removeBook(id) {
  bookStore = bookStore.filter((books) => books.id !== id);
  localStorage.setItem('localBook', JSON.stringify(bookStore));
}

function renderBook(bookData) {
  const div = document.createElement('div');
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const removeBtn = document.createElement('button');
  const hr = document.createElement('hr');
  bookTitle.innerText = bookData.title;
  bookAuthor.innerText = bookData.author;
  removeBtn.innerText = 'Remove';

  div.append(bookTitle, bookAuthor, removeBtn, hr);
  displayBook.append(div);
  removeBtn.addEventListener('click', () => {
    removeBtn.parentElement.remove();
    removeBook(bookData.id);
  });
}

bookStore.forEach(renderBook);

bookForm.addEventListener('click', (e) => {
  e.preventDefault();
  if (title.value !== '' && author.value !== '') {
    addBook();
    renderBook(bookData);
    title.value = '';
    author.value = '';
  } else {
    alert('Please fill in the fields');
  }
});
