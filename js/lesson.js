//проверка номера
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');


//+996550644772
const kgPhoneReqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', ()=>{
    if (kgPhoneReqExp.test(phoneInput.value)){
        phoneSpan.innerHTML = 'Correct number';
        phoneSpan.style.color = 'green';
    }else {
        phoneSpan.innerHTML = 'This number is not exist';
        phoneSpan.style.color = 'red';
    }
})

const phoneInputRu = document.querySelector('#phone_input_ru');
const phoneButtonRu = document.querySelector('#phone_button_ru');
const phoneSpanRu = document.querySelector('#phone_result_ru');

const RussianPhoneReqExp = /^\+7 [9]\d{2} \d{3}-\d{2}-\d{2}$/

phoneButtonRu.addEventListener('click', ()=>{
    if (RussianPhoneReqExp.test(phoneInputRu.value)){
        phoneSpanRu.innerHTML = 'Correct number';
        phoneSpanRu.style.color = 'green';
    }else {
        phoneSpanRu.innerHTML = 'This number is not exist';
        phoneSpanRu.style.color = 'red';
    }
})

//TAB SLIDER
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParents =  document.querySelector('.tab_content_items');


const hightTabsContentCards = () =>{
    tabsContentCards.forEach((tabsContentCard)=>{
        tabsContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem)=>{
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showTabsContentCards = (indexElement = 0)=>{
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards();
showTabsContentCards();


tabsItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex)=>{
            if(event.target === tabItem){
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let curretIndex = 0; 
let intervalId; 


const startAuthoSlider = ()=>{
    intervalId = setInterval(()=>{
        hightTabsContentCards();
        showTabsContentCards(curretIndex);
        curretIndex = (curretIndex +1) % tabsItems.length;
    }, 2000); 
}

startAuthoSlider();


tabsItemsParents.onclick = (event) => {
    clearInterval(intervalId);
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex) =>{
            if(event.target === tabItem){
                hightTabsContentCards();
                showTabsContentCards(tabItemIndex);
                curretIndex = tabItemIndex;
                startAuthoSlider();
            }
        })
    }
}


//Конвертер валют
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, target1, target2, currentType) => {
    element.addEventListener('input', async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) throw new Error('Не удалось загрузить данные');

            const data = await response.json();
            const value = parseFloat(element.value);

            if (!element.value || isNaN(value)) {
                target1.value = '';
                target2.value = '';
                return;
            }

            switch(currentType) {
                case 'som':
                    target1.value = (value / data.usd).toFixed(2);
                    target2.value = (value / data.eur).toFixed(2);
                    break;
                case 'usd':
                    target1.value = (value * data.usd).toFixed(2);
                    target2.value = ((value * data.usd) / data.eur).toFixed(2);
                    break;
                case 'eur':
                    target1.value = (value * data.eur).toFixed(2);
                    target2.value = ((value * data.eur) / data.usd).toFixed(2);
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    });
};

converter(somInput, usdInput, eurInput, 'som');
converter(usdInput, somInput, eurInput, 'usd');
converter(eurInput, somInput, usdInput, 'eur');

const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

let count = 1
const totalCards = 200

async function getCardData(cardNumber){
    try{

        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`);
        if(!response.ok){
            throw new Error('Error in server')
        }
        return await response.json()

    }catch (error){
        console.log('errrr data: ', error);
        return null;
        
    }
}

function updateCard(cardData){
    card.innerHTML = `
    <p>${cardData.title}</p>
    <p style='color: ${cardData.completed ? "green": "yellow"}'> ${cardData.completed}
    <span>${cardData.id}</span>
    `
}
