// loading spiner 
const spiner = document.getElementById('spiner');

const loadData = () => {
    spiner.style.display = 'block';
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    inputField.value = '';
    const url = `https://openlibrary.org/search.json?q=${inputFieldText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data));
}

const displayBook = data => {
    spiner.style.display = 'none';
    // result found section 
    const resultContainer = document.getElementById('result-container');
    const resultFound = document.createElement('div');
    if (data.numFound === 0) {
        resultContainer.innerHTML = `
        <h5 class="text-center">Result Not Found</h5> 
    `
    }
    else {
        resultContainer.innerHTML = `
        <h5 class="text-center ">Result found: ${data.numFound}</h5> 
    `
    }
    resultContainer.appendChild(resultFound);
    console.log(data);

    // books result section
    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';
    const books = data.docs;
    books.forEach(book => {
        // console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        let imgUrl;

        if (!book.cover_i) {
            imgUrl = `https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg`;
        }
        else {
            imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
        // console.log(book.author_name);
        div.innerHTML = `
        <div class="card h-100">
            <img src="${imgUrl}" class="card-img-top w-50 mx-auto mt-2 border border-1 border-danger" alt="...">
            <div class="card-body">
            <h5 class="card-title">${book.title.slice(0, 15)}</h5>
            <p class="card-text "><span class="text-danger">Author:</span> ${resultUndefined(book?.author_name)}</p>
            <p class="card-text"><span class="text-danger">Publisher:</span> ${resultUndefined(book?.publisher)}</p>
        </div>
            <div class="card-footer">
            <small class="text-muted">First publish year: ${resultUndefined(book?.first_publish_year)}</small>
            <small class="text-muted">Publish Date: ${resultUndefined(book?.publish_date)}</small>
            </div>
        </div>
        `
        booksContainer.appendChild(div);
    })
}


const resultUndefined = result => {
    if (!result) {
        return 'Not in database';
    }
    else {
        return result;
    }
}