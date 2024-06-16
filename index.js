const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.toggleReadStatus = function() {
        this.read = this.read === 'read' ? 'not read yet' : 'read';
    };
}

function addBookToLibrary(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks(){
    const library = document.querySelector('.library');
    library.innerHTML = '';

    myLibrary.forEach((book, index)=>{
        let newDiv = document.createElement('div');
        
        let titleElement = document.createElement('p');
        titleElement.textContent = `Title : ${book.title}`
        newDiv.appendChild(titleElement);

        let authorElement = document.createElement('p');
        authorElement.textContent = `Author : ${book.author}`
        newDiv.appendChild(authorElement);

        let pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages : ${book.pages}`
        newDiv.appendChild(pagesElement);

        let readElement = document.createElement('p');
        readElement.textContent = `Read : ${book.read}`
        newDiv.appendChild(readElement);

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.setAttribute('data-index', index);
        removeButton.addEventListener('click', removeBook);
        newDiv.appendChild(removeButton);

        let toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle read status';
        toggleButton.setAttribute('data-index', index);
        toggleButton.addEventListener('click', ()=>{
            book.toggleReadStatus();
            displayBooks();
        })
        newDiv.appendChild(toggleButton);

        library.appendChild(newDiv);
    });

}

function removeBook(event) {
    const indexToRemove = event.target.getAttribute('data-index');
    myLibrary.splice(indexToRemove, 1);
    displayBooks();
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet');
addBookToLibrary('1984', 'George Orwell', '328', 'read');
displayBooks()

let addButton = document.querySelector('.header button');
let dialog = document.querySelector('dialog');
let form = document.querySelector('#book-form');

addButton.addEventListener('click', ()=>{
    dialog.showModal();
})

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').value;

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    
    dialog.close();
    form.reset();
})