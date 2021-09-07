
const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    inputField.value = '';
    const url = `https://openlibrary.org/search.json?q=${inputFieldText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data));
}

const displayBook = data => {

    // result found section 

    const resultContainer = document.getElementById('result-container');
    const resultFound = document.createElement('div');
    resultContainer.innerHTML = `
        <p>Result found: ${data.numFound}</p> 
    `
    resultContainer.appendChild(resultFound);


    // books result section
    const booksContainer = document.getElementById('books-container');
    console.log(booksContainer);
    const books = data.docs;
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        console.log(book.cover_i);
        let imgUrl;
        if (!book.cover_i) {
            imgUrl = `https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg`;
        }
        else {
            imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }

        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
            <h5 class="card-title">by ${books.author_name}</h5>
            <p class="card-text">xx</p>
        </div>
            <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
            </div>
        </div>
        `
        booksContainer.appendChild(div);
    })
}