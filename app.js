let input = document.querySelector('#input');
let searchBtn = document.querySelector('#search');
let APIKEY = 'addf5e2c-ce53-4986-baf2-bd61f4f5a365'
let notFound = document.querySelector('.notfound');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');


searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    //clear data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';
    
    //get input data
    let word = input.value;
    //call API get data
    if(word===''){
        alert('word is required')
        return;
    }
    getData(word);
})

async function getData(word){
    loading.style.display = 'block';
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${APIKEY}`);
    const data = await response.json();

    //if empty result
    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText = 'No result found...'
        return;
    }
    //if result is suggestion
    if(typeof data[0] === 'string'){
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element =>{
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion)
        })
        return;
    }
    //result found
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination


    //Sound
    const soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){
        //True
        renderSound(soundName);
    }
    
}

function renderSound(soundName){
    let subFolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${APIKEY}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);
}