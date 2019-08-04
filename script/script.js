const calendar = document.querySelector(".calendar-table"),
    previewDate = document.querySelector(".calendar__date"),
    nextMonthBtn = document.querySelector(".calendar__btn_next"),
    prevMonthBtn = document.querySelector(".calendar__btn_prev"),
    currentDayBtn = document.querySelector(".calendar__btn-current-day"),
    calendarContainer = document.querySelector(".section-calendar"),
    search = document.querySelector(".search__input"),
    hiddenMenu = document.querySelector(".hidden-menu"),
    rectHiddenMenu = document.querySelector(".hidden-menu-rect"),
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
    lastDayiInMonth = new Date(currentYear, currentMonth + 1, 0),
    lastDay = lastDayiInMonth.getDate(),
    newlastDayiInMonth = new Date(currentYear, currentMonth, 0),
    newLastDay = newlastDayiInMonth.getDate(),
firstDayiInMonth = new Date(currentYear, currentMonth, 1),
    firstDay = firstDayiInMonth.getDay(),
    countdaysNextMonth = 1,
    eventDay = '',
    objEvents = parseLocalStorage() || {},
    countDayPrevMonthiInMonth = new Date(currentYear, currentMonth - 2, 0),
    countDayPrevMonth = countDayPrevMonthiInMonth.getDate()
let objDate = {
    month: {
        0: { name: "Январь" },
        1: { name: "Февраль" },
        2: { name: "Март" },
        3: { name: "Апрель" },
        4: { name: "Май" },
        5: { name: "Июнь" },
        6: { name: "Июль" },
        7: { name: "Август" },
        8: { name: "Сентябрь" },
        9: { name: "Октябрь" },
        10: { name: "Ноябрь" },
        11: { name: "Декабрь" }
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
if (window.matchMedia("(max-width: 900px)").matches) {
    objDate.day[1] = "Пн,"
    objDate.day[2] = "Вт,"
    objDate.day[3] = "Ср,"
    objDate.day[4] = "Чт,"
    objDate.day[5] = "Пт,"
    objDate.day[6] = "Сб,"
    objDate.day[7] = "Вс,"
    hiddenMenu.style.top = "80px"
    hiddenMenu.style.left = "50"
    rectHiddenMenu.classList.add("hidden")
}
function remove_addClass(className) {
    rectHiddenMenu.classList.remove(`${rectHiddenMenu.classList[1]}`)
    rectHiddenMenu.classList.add(className)
}
function addListenerCalendarCells(e) {
    let elem = document.querySelector(".table__cell_event")
    if (elem !== null) elem.classList.remove("table__cell_event")
    hiddenMenu.classList.remove("hidden")
    let element = e.target;
    function fillingHiddenMenu(element) {
        inputDate.value = element.getAttribute("data-index")
        let elementClientRect = element.getBoundingClientRect()
        let ParentElementRect = calendarContainer.getBoundingClientRect()
        if (window.matchMedia("(min-width:900px)").matches) {
            function positionVerticalHiddenMenu(className) {
                if (elementClientRect.y + 320 > ParentElementRect.height) {
                    hiddenMenu.style.top = `${elementClientRect.y - 240}px`;
                    rectHiddenMenu.classList.remove(`${rectHiddenMenu.classList[1]}`)
                    rectHiddenMenu.classList.add(className)
                }
                else { hiddenMenu.style.top = `${elementClientRect.y - 20}px`; }
            }
            if ((elementClientRect.right + 290) > ParentElementRect.right) {
                hiddenMenu.style.left = `${elementClientRect.x - 290 - 15}px`
                remove_addClass("hidden-menu-rect_right-top")
                positionVerticalHiddenMenu("hidden-menu-rect_right-bottom")
            }
            else {
                remove_addClass("hidden-menu-rect_left-top")
                hiddenMenu.style.left = `${elementClientRect.x + elementClientRect.width + 15}px`
                positionVerticalHiddenMenu("hidden-menu-rect_left-bottom")
            }
        }
        element.classList.add("table__cell_event")
        inputEvent.value = '';
        inputMembers.value = '';
        textareaDescription.value = '';
        eventDay = element;
        if (element.children[2]) {
            inputEvent.value = objEvents[inputDate.value].event
            inputMembers.value = objEvents[inputDate.value].members
            textareaDescription.value = objEvents[inputDate.value].discription
        }
    }
    while (element !== document.querySelector(".calendar-table")) {
        if (element.classList.contains("table__cell")) fillingHiddenMenu(element)
        element = element.parentNode
    }
}
function reRenderCalendar() {
    document.querySelector(".calendar-table").remove();
    let newCalendar = document.createElement("div");
    newCalendar.classList.add("calendar-table");
    calendarContainer.appendChild(newCalendar);
    return newCalendar
}
function renewalCountsDays() {
    firstDayiInMonth = new Date(currentYear, currentMonth, 1),
    lastDayiInMonth = new Date(currentYear, currentMonth + 1, 0),
    firstDay = firstDayiInMonth.getDay(),
    lastDay = lastDayiInMonth.getDate(),
    newlastDayiInMonth = new Date(currentYear, currentMonth, 0),
    newLastDay = newlastDayiInMonth.getDate();
    countDayPrevMonthiInMonth = new Date(currentYear, currentMonth - 2, 0)
    countDayPrevMonth = countDayPrevMonthiInMonth.getDate()
}
function stringifyPushArrInStorage(arr) {
    let newArrLocalStorage = JSON.stringify(arr)
    localStorage.setItem("arrEvents", newArrLocalStorage)
}
function namingDaysOfTheWeek(elemParent) {
    let quantityDaysInWeek = 7;
    for (let i = 1; i <= quantityDaysInWeek; i++)elemParent.children[i - 1].children[0].innerText = objDate.day[i]
}
function addEventInObj(obj){
    obj[inputDate.value] = {};
    obj[inputDate.value].event = inputEvent.value
    obj[inputDate.value].members = inputMembers.value
    obj[inputDate.value].discription = textareaDescription.value
}
function createEventInCell(element, obj) {
    if (element.children[2]) eventDay.children[2].remove()
    let eventContainer = document.createElement("div"),
        eventHeader = document.createElement("span"),
        eventMembers = document.createElement("span")
    eventContainer.classList.add("event-container");
    eventHeader.classList.add("text-event")
    eventMembers.classList.add("text-event")
    eventContainer.appendChild(eventHeader)
    eventContainer.appendChild(eventMembers)
    element.appendChild(eventContainer)
    element.classList.add("table__cell-event_active")
    eventHeader.innerText = obj.event
    eventMembers.innerText = obj.members
}
function parseLocalStorage() {
    arrLocalStorage = JSON.parse(`${localStorage.getItem("arrEvents")}`)
    return arrLocalStorage
}
function createDayInCalendar(elemParent, count) {
    let cell = document.createElement("div");
    let cellNumber = document.createElement("span");
    let cellDay = document.createElement("span");
    cell.appendChild(cellDay);
    cell.classList.add("table__cell");
    elemParent.appendChild(cell);
    cell.appendChild(cellNumber);
    cell.children[1].innerText = count;
    if (nowDate.getMonth() === currentMonth && nowDate.getFullYear() === currentYear && count === today) {
        cell.classList.add("table__cell_active");
    }
    cell.setAttribute("data-index", `${count}.${currentMonth + 1}.${currentYear}`)
    let arrLocalStorage = parseLocalStorage() || objEvents
    if (arrLocalStorage.hasOwnProperty(cell.getAttribute("data-index"))) {
        createEventInCell(cell, arrLocalStorage[cell.getAttribute("data-index")])
    }
}
function createCalendar(calendar, lastDay, countDay, newLastDay) {
    if (countDay == 0) countDay = 7
    let magicNumber = countDay - 2
    let firstDayinNewMonth = newLastDay - magicNumber
    let tempFirstDayinNewMonth = firstDayinNewMonth
    if (currentMonth === 0) { currentMonth = 12; currentYear--; }
    if (currentMonth === -1) { currentMonth = 11; currentYear--; }
    if (countDay !== 1) {
        currentMonth--
        for (let i = 1; i < countDay; i++) {
            createDayInCalendar(calendar, tempFirstDayinNewMonth++)
            if (i == countDay - 1) { currentMonth++ }
        }
    }
    if (currentMonth == 12){currentMonth = 0; currentYear++}
    previewDate.innerText = `${objDate.month[currentMonth].name} ${currentYear}`;
    for (countDay = 1; countDay <= lastDay; countDay++) {
        if (calendar.children.length < quantityCellsInTable) { createDayInCalendar(calendar, countDay) }
        countDayPrevMonth = lastDay
        while (countDay === lastDay) {
            currentMonth++
            break
        }
    }
    countdaysNextMonth = 1
    for (let countCells = calendar.children.length; countCells < quantityCellsInTable; countCells++) {
        createDayInCalendar(calendar, countdaysNextMonth)
        countdaysNextMonth++
    }
    namingDaysOfTheWeek(calendar)
    calendar.addEventListener("click", (e) => {
        addListenerCalendarCells(e)
    })
}

createCalendar(calendar, lastDay, firstDay, newLastDay)

nextMonthBtn.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    document.querySelector(".hidden-menu").classList.add("hidden")
    renewalCountsDays()
    if (firstDay === 1) { tempCurrentMonth = currentMonth - 1 }
    createCalendar(reRenderCalendar(), lastDay, firstDay, newLastDay);
})
prevMonthBtn.addEventListener("click", () => {
    currentMonth -= 2
    document.querySelector(".hidden-menu").classList.add("hidden")
    renewalCountsDays()
    countDayPrevMonth = newLastDay
    createCalendar(reRenderCalendar(), lastDay, firstDay, newLastDay);
})
currentDayBtn.addEventListener("click", () => {
    currentMonth = nowDate.getMonth();
    currentYear = nowDate.getFullYear();
    renewalCountsDays()
    hiddenMenu.classList.add("hidden")
    createCalendar(reRenderCalendar(), lastDay, firstDay, newLastDay)
})
document.querySelector(".hidden-menu__btn-close").addEventListener("click", () => {
    document.querySelector(".hidden-menu").classList.add("hidden")
})
createEventInCalendar.addEventListener("click", () => {
    addEventInObj(objEvents)
    hiddenMenu.classList.add("hidden")
    createEventInCell(eventDay, objEvents[inputDate.value])
    if (localStorage.length === 0) {
        stringifyPushArrInStorage(objEvents)
    }
    else {
        addEventInObj(objEvents)
        stringifyPushArrInStorage(objEvents)
    }
})
deleteEventInCalendar.addEventListener("click", () => {
    if (eventDay.children[2]) {
        let arrLocalStorage = parseLocalStorage()
        delete arrLocalStorage[eventDay.children[2].parentNode.getAttribute("data-index")]
        stringifyPushArrInStorage(arrLocalStorage)
        eventDay.children[2].remove()
        eventDay.classList.remove("table__cell-event_active")
    }
    hiddenMenu.classList.add("hidden")
})
document.querySelector(".hidden-menu-add__btn-close").addEventListener("click", (e) => {
    document.querySelector(".hidden-menu-add").classList.add("hidden")
})
document.querySelector(".header__btn_add").addEventListener("click", () => {
    document.querySelector(".hidden-menu-add").classList.remove("hidden")
})
document.querySelector(".hidden-menu-add__btn-create").addEventListener("click", () => {
    document.querySelector(".hidden-menu-add").classList.remove("hidden")
    let hiddenMenuAdd = document.querySelector(".hidden-menu-add__input")
    let text = hiddenMenuAdd.value
    let text1 = text.split(',')
    let dateEvent;
    if (text1.length >= 2) {
        function removeZero(arrNumber) {
            let tempNumber = arrNumber.split(0)
            if (tempNumber[0] === "" || tempNumber[0] === "0") {
                newNumber = tempNumber[1]
            }
            else { newNumber = arrNumber }
            return newNumber
        }
        let arrDate = text1[0].split('.')
        if (+arrDate[1] > 12) { alert("Не корректная дата") }
        else { arrDate[1] = removeZero(arrDate[1]) }
        if (+arrDate[0] > new Date(currentYear, +arrDate[1], 0).getDate()) alert("Не корректная дата")
        else { arrDate[0] = removeZero(arrDate[0]) }
        dateEvent = arrDate.join(".")
    }
    else alert("не верный формат записи")
    hiddenMenuAdd.value = "";
    if (localStorage.length === 0) {
        objEvents[dateEvent] = {}
        objEvents[dateEvent].event = text1[1]
        objEvents[dateEvent].members = ''
        stringifyPushArrInStorage(objEvents)
    }
    else {
        let arrLocalStorage = parseLocalStorage()
        arrLocalStorage[dateEvent] = {}
        arrLocalStorage[dateEvent].event = text1[1]
        arrLocalStorage[dateEvent].members = '';
        arrLocalStorage[dateEvent].discription = ''
        objEvents = Object.assign(objEvents, arrLocalStorage)
        stringifyPushArrInStorage(objEvents)
    }
    document.querySelector(".hidden-menu-add").classList.add("hidden")
})

document.querySelector(".header__btn_refresh").addEventListener("click", () => {
    window.location.reload()
})
document.querySelector(".search__input").addEventListener("click", (e) => {
    e.stopImmediatePropagation()
    let searchContainer = document.createElement('div')
    searchContainer.classList.add("search-container")
    document.querySelector("body").appendChild(searchContainer)
    for (key in objEvents) {
        let searchEventItem = document.createElement("div")
        searchEventItem.classList.add("search-container-item")
        let searchEventHeader = document.createElement("h4")
        searchEventHeader.classList.add("search-container-item__header")
        searchEventHeader.innerText = objEvents[key].event
        let searchEventDate = document.createElement("span")
        searchEventDate.classList.add("search-container-item__date")
        searchEventDate.innerText = key
        searchEventItem.appendChild(searchEventHeader)
        searchEventItem.appendChild(searchEventDate)
        searchContainer.appendChild(searchEventItem)
        searchEventItem.addEventListener("click", (e) => {
            let elementItem = e.target
            if (document.querySelector(".search-container-item_active") !== null) {
                document.querySelector(".search-container-item_active").classList.remove("search-container-item_active")
            }
            while (elementItem !== document.querySelector(".search-container")) {
                if (elementItem.classList.contains("search-container-item")) {
                    elementItem.classList.add("search-container-item_active")
                    let arrEventData = elementItem.children[1].innerText.split(".")
                    currentMonth = +arrEventData[1] - 1
                    currentYear = +arrEventData[2]
                    renewalCountsDays()
                    createCalendar(reRenderCalendar(), lastDay, firstDay, newLastDay);
                    document.querySelector(".search-container").remove();
                }
                elementItem = elementItem.parentNode
            }
        })
    }
})

document.querySelector(".wrapper").addEventListener("click", () => {
    if (document.querySelector(".search-container")) {
        document.querySelector(".search-container").remove();
        search.value = ''
    }
})
search.addEventListener("keyup", () => {
    let xxx = document.querySelector(".search-container")
    let ClassActive = document.querySelector(".search-container-item_active")
    if (ClassActive !== null) ClassActive.classList.remove("search-container-item_active")
    for (let i = 0; i < xxx.children.length; i++) {
        // let xx;
        let xx = xxx.children[i].children[0].innerText.search(search.value)
        // xx = xxx.children[i].children[0].innerText.match(/`${search.value}`/i)
        if (search.value === '' && ClassActive !== null) ClassActive.classList.remove("search-container-item_active")
        if (xx === 0 && search.value !== '') {
            if (ClassActive !== null) ClassActive.classList.remove("search-container-item_active")
            let del = xxx.children[i]
            xxx.children[i].remove()
            del.classList.add("search-container-item_active")
            xxx.insertBefore(del, xxx.children[0])
        }
    }
})