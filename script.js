let myLibrary = [];

function Book(title, author, pages, read) {
    this.name = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return this.read === "read"
            ? `"${this.name}" by ${this.author}, ${this.pages} pages, read`
            : `"${this.name}" by ${this.author}, ${this.pages} pages, not read yet`;
    };
}

function addToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    renderLibrary();
}

const lex = document.querySelector(".lex");

const headers = document.createElement("div");
headers.classList.add("booktext", "headers");
headers.innerHTML = `<div class="name head">Name</div><div class="author head">Author</div>
                     <div class="pages head">No Of Pages</div><div class="read head">Read or Not Read</div>`;
lex.appendChild(headers);

function renderLibrary() {
    lex.replaceChildren(headers);

    myLibrary.forEach((element) => {
        const wbook = document.createElement("div");
        wbook.classList.add("booktext");

        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = element.name;

        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = element.author;

        const pages = document.createElement("div");
        pages.classList.add("pages");
        pages.textContent = element.pages;

        const read = document.createElement("div");
        const check=document.createElement("button");
        check.textContent="check"
        check.classList.add("check")
        read.classList.add("read");
        read.textContent = element.read;
        check.addEventListener("click",()=>checkreadstatus(element.name))


        const btn = document.createElement("button");
        btn.classList.add("click");
        btn.textContent = "Remove";
        btn.value = element.name;
        btn.addEventListener("click", () => removeBook(element.name));

        wbook.appendChild(name);
        wbook.appendChild(author);
        wbook.appendChild(pages);
        wbook.appendChild(read);
        
        wbook.appendChild(check)
        wbook.appendChild(btn);
        lex.appendChild(wbook);
    });
}

function removeBook(title) {
    myLibrary = myLibrary.filter((book) => book.name !== title);
    renderLibrary();
}
function checkreadstatus(title){
    myLibrary.forEach(element=>{
        if(element.name==title){
            if(element.read=="read"){
                element.read="not read"
            }
            else{
                element.read="read"
            }
        }
    })
    renderLibrary();
}

addToLibrary("The Hobbit", "J.R.R Tolkien", "256", "not read");
addToLibrary("Meditations", "Marcus Aurelius", "500", "read");

const dialog = document.querySelector("dialog");
document.querySelector(".add").addEventListener("click", () => dialog.showModal());
document.querySelector(".close").addEventListener("click", () => dialog.close());
document.querySelector(".ok").addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").value;

    addToLibrary(name, author, pages, read);
    dialog.close();

    clearForm();
});

function clearForm() {
    document.getElementById("name").value = '';
    document.getElementById("author").value = '';
    document.getElementById("pages").value = '';
    document.getElementById("read").value = '';
}
