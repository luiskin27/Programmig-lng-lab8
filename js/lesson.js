//проверка номера
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');


//+996550644772
const kgPhoneReqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', ()=>{
    if (kgPhoneReqExp.test(phoneInput.value)){
        phoneSpan.innerHTML = 'Этот номер существует';
        phoneSpan.style.color = 'green';
    }else {
        phoneSpan.innerHTML = 'Этот номер не существует';
        phoneSpan.style.color = 'red';
    }
})

const phoneInputRu = document.querySelector('#phone_input_ru');
const phoneButtonRu = document.querySelector('#phone_button_ru');
const phoneSpanRu = document.querySelector('#phone_result_ru');

const RussianPhoneReqExp = /^\+7 [9]\d{2} \d{3}-\d{2}-\d{2}$/

phoneButtonRu.addEventListener('click', ()=>{
    if (RussianPhoneReqExp.test(phoneInputRu.value)){
        phoneSpanRu.innerHTML = 'Этот номер существует';
        phoneSpanRu.style.color = 'green';
    }else {
        phoneSpanRu.innerHTML = 'Этот номер не существует';
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

let curretIndex = 0; // Первая вкладка
let intervalId; //Переменная для хранения интервала

//Ф-ция для автоматического переключения

const startAuthoSlider = ()=>{
    intervalId = setInterval(()=>{
        hightTabsContentCards();
        showTabsContentCards(curretIndex);
        curretIndex = (curretIndex +1) % tabsItems.length;
    }, 2000); // 2сек
}
//Запуск автослайдера
startAuthoSlider();

//Остановка слайдера при клике на вкладку

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
