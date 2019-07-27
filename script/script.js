const calendar = document.querySelector(".calendar-table"),
    previewDate = document.querySelector(".calendar__date"),
    nextMonthBtn = document.querySelector(".calendar__btn_next"),
    prevMonthBtn = document.querySelector(".calendar__btn_prev"),
    currentDayBtn = document.querySelector(".calendar__btn-current-day"),
    calendarContainer = document.querySelector(".section-calendar"),
    hiddenMenu = document.querySelector(".hidden-menu"),
    rectHiddenMenu = document.querySelector(".hidden-menu-rect")
    inputEvent = document.querySelector(".hidden-menu-data-block__event"),
    inputDate = document.querySelector(".hidden-menu-data-block__date"),
    inputMembers = document.querySelector(".hidden-menu-data-block__name-members"),
    textareaDescription = document.querySelector(".hidden-menu__textarea"),
    createEventInCalendar = document.querySelector(".hidden-menu-btn-block_done"),
    deleteEventInCalendar = document.querySelector(".hidden-menu-btn-block_delete"),
    quantityCellsInTable = 35,
    nowDate = new Date();
let today = nowDate.getDate(),
    currentMonth = nowDate.getMonth(),
    currentYear = nowDate.getFullYear(),
    lastDayiInMonth = new Date(currentYear, currentMonth+1, 0),
    lastDay = lastDayiInMonth.getDate(),
    firstDayiInMonth = new Date(currentYear, currentMonth, 1),
    firstDay = firstDayiInMonth.getDay(),
    countdaysNextMonth=1,
    eventDay = '',
    objEvents = {},
    tempCurrentMonth = currentMonth+1;
    let countDayPrevMonthiInMonth = new Date(currentYear, currentMonth-2, 0)
    let countDayPrevMonth = countDayPrevMonthiInMonth.getDate()

const objDate = {
    month: {
        0: { name: "Январь"},
        1: { name: "Февраль"},
        2: { name: "Март"},
        3: { name: "Апрель"},
        4: { name: "Май"},
        5: { name: "Июнь"},
        6: { name: "Июль"},
        7: { name: "Август"},
        8: { name: "Сентябрь"},
        9: { name: "Октябрь"},
        10: { name: "Ноябрь"},
        11: { name: "Декабрь"}
    },
    day: {
        1: "Понедельник,",
        2: "Вторник,",
        3: "Среда,",
        4: "Четверг,",
        5: "Пятница,",
        6: "Суббота,",
        7: "Воскресенье,"
    }
}
function remove_addClass(className){
    rectHiddenMenu.classList.remove(`${rectHiddenMenu.classList[1]}`)
    rectHiddenMenu.classList.add(className)
}
function addListenerCalendarCells(e){
    let elem = document.querySelector(".table__cell_event")
    if(elem!==null)elem.classList.remove("table__cell_event")
    hiddenMenu.classList.remove("hidden")
    let element = e.target;
    function fillingHiddenMenu(element){
        inputDate.value = element.getAttribute("data-index")
        let elementClientRect = element.getBoundingClientRect()
        let ParentElementRect = calendarContainer.getBoundingClientRect()
        function positionVerticalHiddenMenu(className){
            if(elementClientRect.y +320>ParentElementRect.height){
                hiddenMenu.style.top = `${elementClientRect.y - 240}px`;
                rectHiddenMenu.classList.remove(`${rectHiddenMenu.classList[1]}`)
                rectHiddenMenu.classList.add(className)
            }
            else{hiddenMenu.style.top = `${elementClientRect.y - 20}px`;}
        }
        if((elementClientRect.right+290)>ParentElementRect.right){
            hiddenMenu.style.left = `${elementClientRect.x - 290-15}px`
            remove_addClass("hidden-menu-rect_right-top")
            positionVerticalHiddenMenu("hidden-menu-rect_right-bottom")
        }
        else{
            remove_addClass("hidden-menu-rect_left-top")
            hiddenMenu.style.left = `${elementClientRect.x + elementClientRect.width+15}px`
            positionVerticalHiddenMenu("hidden-menu-rect_left-bottom")
        }
        element.classList.add("table__cell_event")
        inputEvent.value = '';
        inputMembers.value = '';
        textareaDescription.value = '';
        eventDay = element;
        if(element.children[2]){
            inputEvent.value = objEvents[inputDate.value].event
            inputMembers.value = objEvents[inputDate.value].members
            textareaDescription.value = objEvents[inputDate.value].discription
        }
    }
    while(element !== document.querySelector(".calendar-table")){
        if(element.classList.contains("table__cell"))fillingHiddenMenu(element)
        element = element.parentNode
    }
}
function reRenderCalendar(){
    document.querySelector(".calendar-table").remove();
    let newCalendar = document.createElement("div");
    newCalendar.classList.add("calendar-table");
    calendarContainer.appendChild(newCalendar);
    return newCalendar
}
function namingDaysOfTheWeek(elemParent) {
    let quantityDaysInWeek = 7;
    for (let i = 1; i <= quantityDaysInWeek; i++)elemParent.children[i-1].children[0].innerText = objDate.day[i]
}
function createDayInCalendar(elemParent, count){
    let cell = document.createElement("div");
    let cellNumber = document.createElement("span");
    let cellDay = document.createElement("span");
    cell.appendChild(cellDay);
    cell.classList.add("table__cell");
    elemParent.appendChild(cell);
    cell.appendChild(cellNumber);
    cell.children[1].innerText = count;
    if(tempCurrentMonth==13){tempCurrentMonth=1; currentYear++}
    if(tempCurrentMonth===0){tempCurrentMonth=12; currentYear--}
    cell.setAttribute("data-index", `${count}.${tempCurrentMonth}.${currentYear}`)
    if(count === countDayPrevMonth){tempCurrentMonth++}
}
function createCalendar(calendar, lastDay, countDay, newLastDay){
    if(countDay == 0)countDay = 7
    let magicNumber = countDay - 2
    let firstDayinNewMonth = newLastDay-magicNumber
    let tempFirstDayinNewMonth = firstDayinNewMonth
    if(currentMonth == 12){currentMonth=0}
    for(let i = 1; i<countDay; i++){
        if(countDay<=lastDay && calendar.children.length===quantityCellsInTable) tempCurrentMonth++
        createDayInCalendar(calendar, tempFirstDayinNewMonth++)
        if(i==countDay-1) {tempFirstDayinNewMonth = firstDayinNewMonth}
    }
    for(countDay = 1;countDay<=lastDay;countDay++){
        if(tempCurrentMonth<currentMonth)tempCurrentMonth+=2
        if(calendar.children.length<quantityCellsInTable){createDayInCalendar(calendar, countDay)}
        countDayPrevMonth = lastDay
    }
    countdaysNextMonth =1
    for(let countCells = calendar.children.length; countCells<quantityCellsInTable;countCells++){
        createDayInCalendar(calendar, countdaysNextMonth)
        countdaysNextMonth++
    }
    namingDaysOfTheWeek(calendar)
    if(nowDate.getMonth() === currentMonth && nowDate.getFullYear() === currentYear){
        calendar.children[today-1].classList.add("table__cell_active");
    }
    calendar.addEventListener("click", (e)=>{
        addListenerCalendarCells(e)
    })
    previewDate.innerText = `${objDate.month[currentMonth].name} ${currentYear}`;
}

createCalendar(calendar, lastDay, firstDay, firstDay)

nextMonthBtn.addEventListener("click", () => {
    currentMonth++
    tempCurrentMonth--
    if(tempCurrentMonth<currentMonth)tempCurrentMonth++
    document.querySelector(".hidden-menu").classList.add("hidden")
    let firstDayiInMonth = new Date(currentYear, currentMonth, 1),
    lastDayiInMonth = new Date(currentYear, currentMonth+1, 0),
    firstDay = firstDayiInMonth.getDay(),
    lastDay = lastDayiInMonth.getDate(),
    newlastDayiInMonth = new Date(currentYear, currentMonth, 0),
    newLastDay = newlastDayiInMonth.getDate();
    createCalendar(reRenderCalendar(), lastDay, firstDay, newLastDay);
})

prevMonthBtn.addEventListener("click", () => {
    currentMonth--
    tempCurrentMonth = currentMonth
    if(currentMonth ===-1){currentMonth=11; tempCurrentMonth = 11; currentYear--}
    document.querySelector(".hidden-menu").classList.add("hidden")
    let firstDayiInMonth = new Date(currentYear, currentMonth, 1),
    lastDayiInMonth = new Date(currentYear, currentMonth+1, 0),
    firstDay = firstDayiInMonth.getDay();
    if(firstDay === 1 )tempCurrentMonth++
    let lastDay = lastDayiInMonth.getDate(),
    newlastDayiInMonth = new Date(currentYear, currentMonth, 0),
    newLastDay = newlastDayiInMonth.getDate()
    countDayPrevMonth = newLastDay
    createCalendar(reRenderCalendar(), lastDay, firstDay, newLastDay);
})
currentDayBtn.addEventListener("click", ()=>{
    currentMonth = nowDate.getMonth();
    currentYear = nowDate.getFullYear();
    createCalendar(reRenderCalendar(), lastDay, firstDay, firstDay)
})
document.querySelector(".hidden-menu__btn-close").addEventListener("click", ()=>{
    document.querySelector(".hidden-menu").classList.add("hidden")
})
function createEventInCell(element){
    if(element.children[2])eventDay.children[2].remove()
    let eventContainer = document.createElement("div"),
    eventHeader = document.createElement("span"),
    eventMembers = document.createElement("span")
    eventContainer.classList.add("event-container")
    eventHeader.classList.add("text-event")
    eventMembers.classList.add("text-event")
    eventContainer.appendChild(eventHeader)
    eventContainer.appendChild(eventMembers)
    element.appendChild(eventContainer)
    element.classList.add("table__cell-event_active")
    eventHeader.innerText = objEvents[inputDate.value].event
    eventMembers.innerText = objEvents[inputDate.value].members
}
createEventInCalendar.addEventListener("click", ()=>{
    objEvents[inputDate.value] = {};
    objEvents[inputDate.value].event = inputEvent.value
    objEvents[inputDate.value].members = inputMembers.value
    objEvents[inputDate.value].discription = textareaDescription.value
    hiddenMenu.classList.add("hidden")
    createEventInCell(eventDay)
})
deleteEventInCalendar.addEventListener("click", ()=>{
    if(eventDay.children[2]){
        eventDay.children[2].remove()
        eventDay.classList.remove("table__cell-event_active")
    }
    hiddenMenu.classList.add("hidden")
})