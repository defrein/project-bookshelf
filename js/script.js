document.addEventListener("DOMContentLoaded", function() {
    const formInput = document.getElementById("inputBook");

    formInput.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();

        document.getElementById("inputTitle").value = "";
        document.getElementById("inputAuthor").value = "";
        document.getElementById("inputYear").value = "";
        document.getElementById("inputIsComplete").checked = false;
    });

    if (isStorageSupported()) {
        fetchJSON();
    }

});

document.addEventListener("onjsonfetched", function() {
    renderFromBooks();
});