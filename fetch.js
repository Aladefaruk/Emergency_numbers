let loader= `<h1 class='load'>LOADING...</h1>`

const countryData=(array)=>{
    let emajencyCard=array.map(num=>{
    return `
    <div class='card'>
    <a class='button' href='tel: ${num.number}'>Call</a>
    <p>${num.name}</p>
    
    </div>`;
}).join('')
return emajencyCard
}



document.querySelector('#app').insertAdjacentHTML('afterbegin',loader)


fetch("https://emajency.com/js/numbers.json")
.then(response=>{
    if (response.ok){
    return response.json();
} else {
    return Promise.reject(response);
}
}).then(data=>{
    console.log(data);
    document.querySelector('.load').remove()
    document.querySelector('#app').insertAdjacentHTML('afterbegin',countryData(data))
}).catch (err=>{
    console.log(err)
    window.alert(`Something went wrong: ${err.status} error`)
    document.querySelector('.load').remove()
    let errr= `<h1 class='error'> Something went wrong:  ${err.status} error</h1>`
    document.querySelector('#app').insertAdjacentHTML('afterbegin',errr)
})