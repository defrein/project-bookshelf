const INCOMPLETE_BOOK = "incompleteBookList";
const COMPLETE_BOOK = "completeBookList";

function addBook() {
    const idBook = +new Date();
    const inputTitle = document.getElementById("inputTitle").value;
    const inputAuthor = document.getElementById("inputAuthor").value;
    const inputYear = document.getElementById("inputYear").value;
    const inputIsComplete = document.getElementById("inputIsComplete").checked;

    const book = createBook(idBook, inputTitle, inputAuthor, inputYear, inputIsComplete);
    const bookObject = composeBookObject(idBook, inputTitle, inputAuthor, inputYear, inputIsComplete);

    books.push(bookObject);

    if (inputIsComplete) {
        document.getElementById(COMPLETE_BOOK).append(book);
    } else {
        document.getElementById(INCOMPLETE_BOOK).append(book);
    }

    updateJSON();
}



function createBook(idBook, inputTitle, inputAuthor, inputYear, inputIsComplete) {
    const book = document.createElement("div");
    book.setAttribute("id", idBook);
    book.classList.add("book");

    const theAction = addAction(inputIsComplete, idBook);

    const text = document.createElement("div");
    text.classList.add("text");
    book.append(theAction, text);

    const bookTitle = document.createElement("p");
    bookTitle.innerText = inputTitle;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = inputAuthor;

    const bookYear = document.createElement("p");
    bookYear.innerText = inputYear;

    text.append(bookTitle, bookAuthor, bookYear);

    return book;
}

function addAction(inputIsComplete, idBook) {
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const actionDelete = createActionDelete(idBook);
    const actionRead = createActionRead(idBook);
    const actionUndo = createActionUndo(idBook);

    buttons.append(actionDelete);

    if (inputIsComplete) {
        buttons.append(actionUndo);
    } else {
        buttons.append(actionRead);
    }

    return buttons;
}

function createActionDelete(idBook) {
    const actionDelete = document.createElement("div");
    actionDelete.classList.add("delete");
    actionDelete.innerHTML = '<i class="fa fa-trash-o"></i>';

    actionDelete.addEventListener("click", function() {
        let confirmDelete = confirm("Hapus buku?");

        if (confirmDelete) {
            const sebuahBuku = document.getElementById(idBook);
            sebuahBuku.addEventListener("eventDelete", function(event) {
                event.target.remove();
            });
            sebuahBuku.dispatchEvent(new Event("eventDelete"));

            deleteBookFromJSON(idBook);
            updateJSON();
        }
    });
    return actionDelete;
}

function createActionRead(idBook) {
    const action = document.createElement("div");
    action.classList.add("move-to-sudah");
    action.innerHTML = '<i class="fa fa-check-circle-o"></i>';

    action.addEventListener("click", function() {
        const sebuahBuku = document.getElementById(idBook);

        const bookTitle = sebuahBuku.querySelectorAll(".text > p")[0].innerText;
        const bookAuthor = sebuahBuku.querySelectorAll(".text > p")[1].innerText;
        const bookYear = sebuahBuku.querySelectorAll(".text > p")[2].innerText;

        sebuahBuku.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(COMPLETE_BOOK).append(book);

        deleteBookFromJSON(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, true);

        books.push(bookObject);
        updateJSON();
    })
    return action;
}

function createActionUndo(idBook) {
    const action = document.createElement("div");
    action.classList.add("move-to-belum");
    action.innerHTML = '<i class="fa fa-rotate-left"></i>';

    action.addEventListener("click", function() {
        const sebuahBuku = document.getElementById(idBook);

        const bookTitle = sebuahBuku.querySelectorAll(".text > p")[0].innerText;
        const bookAuthor = sebuahBuku.querySelectorAll(".text > p")[1].innerText;
        const bookYear = sebuahBuku.querySelectorAll(".text > p")[2].innerText;

        sebuahBuku.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, false);
        document.getElementById(INCOMPLETE_BOOK).append(book);

        deleteBookFromJSON(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, false);

        books.push(bookObject);
        updateJSON();
    })

    return action;

}