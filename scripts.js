const booksContainer = document.getElementsByClassName('books-container')[0];

const library = [];

class Book {
   constructor(name, author, numOfPages, isRead) {
      this.name = name;
      this.author = author;
      this.numOfPages = numOfPages;
      this.isRead = isRead;
   }
}



function addBookToLibrary(event) {
   event.preventDefault();

   const title = document.getElementById('title');
   const author = document.getElementById('author');
   const numOfPages = document.getElementById('pages');
   const isRead = document.getElementById('is-read');

   if (title.value.length === 0 || author.value.length === 0 || numOfPages.value <= 0) {
      alert('Please, fill all the fields.');
      return;
   }
   const newBook = new Book(title.value, author.value, numOfPages.value, isRead.checked);
   library.push(newBook);
   console.log(library);
   
   renderLibrary();
}

function renderLibrary() {
   booksContainer.innerHTML = '';

   library.forEach(book => {
      const titleElement = document.createElement('h2');
      titleElement.textContent = book.name;
      titleElement.classList.add('book__name');

      const authorElement = document.createElement('p');
      authorElement.textContent = `by ${book.author}`;
      authorElement.classList.add('book__author');

      const pagesElement = document.createElement('div');
      pagesElement.textContent = `${book.numOfPages} pages`
      pagesElement.classList.add('book__pages');

      const readToggleBtn = document.createElement('button');
      readToggleBtn.classList.add('read-toggle', 'btn');

      const readToggleIcon = document.createElement('i');
      if (book.isRead) {
         readToggleIcon.classList.add('fa-solid', 'fa-x');
      } else {
         readToggleIcon.classList.add('fa-solid', 'fa-check');
      }
      

      readToggleBtn.addEventListener('click', () => {
         if (book.isRead) {
            book.isRead = false;
         }
         else {
            book.isRead = true;
         }
         renderLibrary()
      })

      readToggleBtn.appendChild(readToggleIcon);

      const deleteBookBtn = document.createElement('button');
      deleteBookBtn.classList.add('delete-book', 'btn');

      const trashIcon = document.createElement('i');
      trashIcon.classList.add('fa-solid', 'fa-trash');

      deleteBookBtn.appendChild(trashIcon);

      deleteBookBtn.addEventListener('click', () => {
         const bookIndex = library.indexOf(book);

         if (bookIndex !== -1) {
            library.splice(bookIndex, 1);
         }

         renderLibrary();
      })

      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('book__btns');

      buttonsContainer.appendChild(readToggleBtn);
      buttonsContainer.appendChild(deleteBookBtn);

      const bookContainer = document.createElement('div');
      bookContainer.classList.add('book')

      if (book.isRead) {
         bookContainer.classList.add('read');
      } else {
         bookContainer.classList.add('unread');
      }

      bookContainer.appendChild(titleElement);
      bookContainer.appendChild(authorElement);
      bookContainer.appendChild(pagesElement);
      bookContainer.appendChild(buttonsContainer);

      booksContainer.appendChild(bookContainer);
   })

   showAddBookBtn();
}

function showAddBookForm(event) {
   const button = event.target.closest('button');
   const formContainer = button.parentElement;
   formContainer.innerHTML = '';

   const titleInput = document.createElement('input');
   titleInput.type = 'text';
   titleInput.id = 'title';
   titleInput.placeholder = 'Title';

   const authorInput = document.createElement('input');
   authorInput.type = 'text';
   authorInput.id = 'author';
   authorInput.placeholder = 'Author';

   const pagesInput = document.createElement('input');
   pagesInput.type = 'text';
   pagesInput.id = 'pages';
   pagesInput.placeholder = 'Number of pages';

   const isReadInput = document.createElement('input');
   isReadInput.type = 'checkbox';
   isReadInput.id = 'is-read';

   const isReadLabel = document.createElement('label');
   isReadLabel.for = 'is-read';
   isReadLabel.textContent = 'I have read the book.'

   const isReadContainer = document.createElement('div');
   isReadContainer.classList.add('is-read');
   
   isReadContainer.appendChild(isReadInput);
   isReadContainer.appendChild(isReadLabel);

   const submitButton = document.createElement('button');
   submitButton.id = 'submit-btn';
   submitButton.textContent = 'Add';

   submitButton.addEventListener('click', addBookToLibrary);

   const cancelButton = document.createElement('button');
   cancelButton.id = 'cancel'
   cancelButton.textContent = 'Cancel';

   const formButtonsContainer = document.createElement('div');
   formButtonsContainer.classList.add('form-btns');
   formButtonsContainer.appendChild(submitButton);
   formButtonsContainer.appendChild(cancelButton);

   const addBookForm = document.createElement('form');
   addBookForm.classList.add('add-book-form');
   addBookForm.appendChild(titleInput);
   addBookForm.appendChild(authorInput);
   addBookForm.appendChild(pagesInput);
   addBookForm.appendChild(isReadContainer);
   addBookForm.appendChild(formButtonsContainer);

   formContainer.classList.remove('add-book')
   formContainer.classList.add('book', 'not-added');
   formContainer.appendChild(addBookForm);

   booksContainer.appendChild(formContainer);
}

function showAddBookBtn() {
   const addBookParagraph = document.createElement('p');
   addBookParagraph.textContent = 'Add book';

   const addBookIcon = document.createElement('i');
   addBookIcon.classList.add('fa-solid', 'fa-plus');

   const addNewBookBtn = document.createElement('button');
   addNewBookBtn.id = 'add-book-btn';
   addNewBookBtn.appendChild(addBookParagraph);
   addNewBookBtn.appendChild(addBookIcon);

   addNewBookBtn.addEventListener('click', showAddBookForm)

   const addBtnContainer = document.createElement('div');
   addBtnContainer.classList.add('add-book');
   addBtnContainer.appendChild(addNewBookBtn);

   booksContainer.appendChild(addBtnContainer);
}

const addBookBtn = document.getElementById('add-book-btn');

addBookBtn.addEventListener('click', showAddBookForm)
