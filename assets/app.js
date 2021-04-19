/**
 * Select Items
 */
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

/**
 *
 * Edit option
 */
let editElement;
let editFlag = false;
let eidtID = "";

//submit form
form.addEventListener("submit", addItem);
// Clear Items 
clearBtn.addEventListener("click", clearItems);
//SetUp Items 
window.addEventListener("DOMContentLoaded", setupItems);

/**
 * Funtions
 */
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();

    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        // add class 
        element.classList.add('grocery-item');
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <button class="edit-btn" type="button">Edit</button>
        <button class="delete-btn" type="button">Delte</button>
    </div>`;
        /**
         * Delte and Edit button 
         */
        const deleteBtn = element.querySelector(".delete-btn");
        const eidtBtn = element.querySelector(".edit-btn");
        deleteBtn.addEventListener('click', deleteItem);
        eidtBtn.addEventListener('click', editItem);
        // show container 
        container.classList.add("show-container");
        // append child 
        list.appendChild(element);
        // display alert 
        displayAlert('Item added to the list', 'success');
        // addto local storage 
        addToLocalStorage(id, value);
        // set back to default 
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert("Itemd Updated", "success");
        //Edit local storage 
        editLocalStorage(eidtID, value);
        setBackToDefault();
    } else {
        displayAlert("Please enter a value", "danger");
    }
}
/**
 * Display Alert 
 */
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    /**
     * Remvoe alert item
     */
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}
// Clear Items 
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert('All Item have been removed', 'danger');
    setBackToDefault();

    localStorage.removeItem('list');
}
// set back to default 
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    eidtID = "";
    submitBtn.textContent = "Add";
}

/**
 * Delete and Edit Function 
 */
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert('Item removed', 'danger');
    setBackToDefault();
    removeFromLocalStorage(id);
}
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit element 
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value 
    grocery.value = editElement.innerHTML;
    editFlag = true;
    eidtID = element.dataset.id;
    submitBtn.textContent = "Edit";
}



/**
 * =======================
 * LOCAL STORAGE 
 * =======================
 */
function addToLocalStorage(id, value) {
    const grocery = { id, value }
    let items = getLocalStorage();
    console.log(items);
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));

}

/***
 * Get Local Storage 
 */
function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem('list')) : [];
}
/**
 * Local storage API
 * Set Item
 * Get Item
 * Remove Item
 * Save as sting
 */
// localStorage.setItem("Orange", JSON.stringify(["Item One", "Item two"]));
// const orange = JSON.parse(localStorage.getItem("Orange"));
// localStorage.removeItem('Orange');
// console.log(orange);

/**
 * Setup items
 */

function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value);
        });
        container.classList.add("show-container");
    }

}

/**
 * Create list item 
 */
function createListItem(id, value) {
    const element = document.createElement("article");
    // add class 
    element.classList.add('grocery-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <button class="edit-btn" type="button">Edit</button>
        <button class="delete-btn" type="button">Delte</button>
    </div>`;
    /**
     * Delte and Edit button 
     */
    const deleteBtn = element.querySelector(".delete-btn");
    const eidtBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener('click', deleteItem);
    eidtBtn.addEventListener('click', editItem);
    // show container 
    container.classList.add("show-container");
    // append child 
    list.appendChild(element);
}
