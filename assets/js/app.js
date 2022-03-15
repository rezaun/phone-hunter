// Load Containers
const main = document.getElementById('mainContainer');

// Search work
const searchButton = () =>{
    const input = document.getElementById('search-input');
    const detailsMain   = document.getElementById('detailsContainer');
    detailsMain.innerHTML = '';
    document.getElementById('spinner').style.display = 'block';
    const error = document.getElementById('error');
    const inputValue = (input.value).toLowerCase();    
    if(inputValue ==""){        
        error.innerText = 'Please give Phone Name or Model';
        input.value = '';
        main.innerHTML = '';
        return;
    } else {        
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => phoneDisplay(data.data))
        input.value = '';
        main.innerHTML = '';
    }

}

const phoneDisplay = (phones) =>{
    document.querySelector('#spinner').style.display = 'none';
    const error = document.getElementById('error');    
    if ( phones.length < 1 ) {
        error.innerText = 'No Phone Found';
        return;   
    }

    error.innerText = '';
    
    for(const phone of phones){
        //console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col-sm-4');
        div.innerHTML = ` 
        <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
            <div class="card-body">
            <h6 class="card-title">brand Name: ${phone.brand}</h6>
            <h5 class="card-title">Phone Name: ${phone.phone_name}</h5> 
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
        <table class="table table-bordered border-primary">
        <tr>
            <th>Phone Image:</th>
            <td><img src="${phone.image}" class="card-img-top w-25" alt="${phone.name}"></td>
        </tr>
        <tr>
            <th>Phone Main Feature</th>
            <th>Feature</th>
        </tr>
        <tr>
            <th>Phone Name</th>
            <td>${phone.mainFeatures.storage}</td>
        </tr>
        
        <tr>
            <th>Phone USB</th>
            <td>${phone.mainFeatures.displaySize}</td>
        </tr>
        
        <tr>
            <th>Memory</th>
            <td>${phone.mainFeatures.memory}</td>
        </tr>
        
        <tr>
            <th>Phone USB</th>
            <td>${phone.mainFeatures.displaySize}</td>
        </tr>
        <tr>
            <th>Phone Others Options</th>
            <th>Options</th>
        </tr>
        <tr>
            <th>Phone Name</th>
            <td>${phone.name}</td>
        </tr>
      
        <tr>
            <th>Phone USB</th>
            <td>${phone.others.USB}</td>
        </tr>      
        <tr>
            <th>BlueTooth</th>
            <td>${phone.others.Bluetooth}</td>
        </tr>
      
        <tr>
            <th>Radio</th>
            <td>${phone.others.Radio}</td>
        </tr>      
      
        <tr>
            <th>Release Date</th>
            <td>${phone.releaseDate ? phone.releaseDate : 'No release Date Found'}</td>
        </tr>
      
        </table>
          
    `;
    detailsMain.appendChild(div);

}