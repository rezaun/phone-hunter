// Load Main Container
const main = document.getElementById('mainContainer');


// Search work
const searchButton = () =>{
    const input = document.getElementById('search-input');
    const error = document.getElementById('error');
    const inputValue = input.value;
    if(inputValue ==""){
        error.innerText = 'Please give Phone Name';
        input.value = '';
        main.innerHTML = '';

    }else {
        main.innerHTML = '';
        fetch('https://openapi.programming-hero.com/api/phones?search=${inputValue}')
        .then(res => res.json())
        .then(data => phoneDisplay(data.phones))
        input.value = '';
        main.innerHTML = '';
    }

}
