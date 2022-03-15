// Load Containers
const main = document.getElementById('mainContainer');



// Search work
const searchButton = () =>{
    const input = document.getElementById('search-input');
    const error = document.getElementById('error');
    const inputValue = input.value;
    if(inputValue ==""){
        error.innerText = 'Please give Phone Name or Model';
        input.value = '';
        main.innerHTML = '';

    }else {
        main.innerHTML = '';
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => phoneDisplay(data.data))
        input.value = '';
        main.innerHTML = '';
    }

}

const phoneDisplay = (phones) =>{
    for(const phone of phones){
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col-sm-4');
        div.innerHTML = ` 
        <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
            <div class="card-body">
            <h6 class="card-title">brand Name: ${phone.brand}</h6>
            <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>            
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Phone Details</button>
            </div>
        </div>
        `;
        main.appendChild(div);

    }
}

const loadPhoneDetail= phoneId =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));

}

const displayPhoneDetail = phone => {
    const detailsMain   = document.getElementById('detailsContainer');
    const div = document.createElement('div');
    
    div.classList.add('col');
    div.classList.add('text-center');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top w-25" alt="${phone.name}">
        <div class="card-body">
        <h4>Phone Others Options</h4>
        <h5 class="card-title">Phone Name:<b> ${phone.name}</b></h5>
        <pclass="card-text">Phone USB:<b> ${phone.others.USB}</b></p>
        <p class="card-text">BlueTooth:<b> ${phone.others.Bluetooth}</b> </p>
        <p class="card-text">Radio:<b> ${phone.others.Radio}</b></p>
        <p>Release Date <b>${phone.releaseDate ? phone.releaseDate : 'No release Date Found'} </b></p>       
    `;
    detailsMain.appendChild(div);

}