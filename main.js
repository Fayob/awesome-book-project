const viewSection = document.getElementById('view_section');
const addButton = document.querySelector('.button');
const title = document.querySelector('.title');
const author = document.querySelector('.author');

const bookLists = [];

function addBook(title, author) {
  bookLists.push({ title, author });
}

addButton.addEventListener('click', () => {
  let titleValue = title.value;
  let authorValue = author.value;

  if (titleValue.trim() === '') {
    title.setCustomValidity('Please supply a title');
    title.reportValidity();
    return;
  }
  if (authorValue.trim() === '') {
    author.setCustomValidity('Please supply an author');
    author.reportValidity();
    return;
  }

  addBook(titleValue, authorValue);

  const newBook = document.createElement('article');
  newBook.className = 'new_book';
  newBook.innerHTML = `
      <h2>${titleValue}</h2>
      <h5>${authorValue}</h5>
      <button class='remove_button'>Remove</button>
      <hr>
      `;
  viewSection.append(newBook);
  titleValue = '';
  authorValue = '';
  localStorage.setItem('userBook', JSON.stringify(bookLists));
});

function removeBook(bk) {
  if (bk.classList.contains('remove_button')) {
    bk.parentElement.remove();
  }
}

viewSection.addEventListener('click', (e) => {
  removeBook(e.target);
});
