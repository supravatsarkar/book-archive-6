
const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldText = inputField.value;
    inputField.value = '';
    const url = `https://openlibrary.org/search.json?q=${inputFieldText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}