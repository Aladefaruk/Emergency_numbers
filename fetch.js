let loader= `<h1 class='load'>LOADING...</h1>`
let input=document.querySelector('.input');
document.querySelector('#app').insertAdjacentHTML('afterbegin',loader)

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


let emergencyCall= async () =>{
    const response = await fetch("https://emajency.com/js/numbers.json");
    if(!response.ok){
    const errorMessage= `Something went wrong:  ${response.status} error`;
    throw new Error(errorMessage)
    }

    const numbers= await response.json();
    return numbers
}


emergencyCall()
.then(data=>{
    document.querySelector('.load').remove()
    document.querySelector('#app').insertAdjacentHTML('afterbegin',countryData(data))

})
.catch (err=>{
    window.alert( `Something went wrong:  ${err.status} error`)
    document.querySelector('.load').remove()
    let errr= `<h1 class='error'> Something went wrong:  ${err.status} error</h1>`
    document.querySelector('#app').insertAdjacentHTML('afterbegin',errr)
})





input.addEventListener("keyup", (event)=>{
    let search=event.target.value
    document.querySelector('#app').innerHTML="";

    emergencyCall()
    .then(data=>{
            const filterednames=data.filter(items=> (items.name.toLowerCase().includes(search.toLowerCase())))
            document.querySelector('#app').insertAdjacentHTML('afterbegin',countryData(filterednames))

});
})