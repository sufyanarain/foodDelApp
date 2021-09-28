const firebaseConfig = {
    apiKey: "AIzaSyC3Re5apf53IUF9g_PTQMOllhhY4aDOYmI",
    authDomain: "foodapp-62728.firebaseapp.com",
    projectId: "foodapp-62728",
    storageBucket: "foodapp-62728.appspot.com",
    messagingSenderId: "846599120867",
    appId: "1:846599120867:web:b7dc178b5d12ae897662d6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
let database = firebase.firestore();

let restaurantHead = document.getElementById("restaurantHead");
let showDishes = document.getElementById("showDishes");
let restaurantIndex = localStorage.getItem('restaurantIndex');


let restaurantName = localStorage.getItem('restaurantName');
restaurantName = JSON.parse(restaurantName);
restaurantIndex = JSON.parse(restaurantIndex);
console.log(restaurantIndex)

restaurantHead.innerHTML = `Restaurant : ${restaurantName}`

let customerUid = localStorage.getItem('userLogin')
customerUid = JSON.parse(customerUid)
console.log(customerUid)
let displayTeam = () => {

    let selectCategory = document.getElementById("selectCategory");
    selectCategory = selectCategory.options[selectCategory.selectedIndex].value;

    if (selectCategory === "All Items") {
        showDishes.innerHTML = "";
        database.collection('items').where('restaurant', '==', `${restaurantIndex}`).onSnapshot((dishes) => {
            dishes.forEach(element => {
                // 
                console.log(element.data())
                let restaurantKey = element.data().restaurant;
                showDishes.innerHTML += `<div class="card items" style="width: 18rem;">
            <img src="${element.data().itemImage}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.data().itemName}</h5>
            <p class="card-text">Price :${element.data().itemPrice}</p>
            <p class="card-text"><i class="bi bi-truck"></i> ${element.data().deliveryTypeCategory}</p>
            <div id="orderCounter" class="orderCounter">
            <button onclick="orderFunc(this,'${element.data().itemKey}',this.id,'${element.data().itemName}','${element.data().itemPrice}')" id="${restaurantKey}" class="btn btn-primary">Order</button>
            <button onclick="plusFunc(this)" class="btn btn-outline-primary">+</button>
            <p class="btn btn-outline-primary" id="counter">1</p>
            <button onclick="minusFunc(this)" class="btn btn-outline-primary ">-</button>
        </div>
        </div>
        </div>
        `
            });
        })
    } else if (selectCategory === "Chinese") {
        showDishes.innerHTML = "";
        let query = database.collection("items")
        query = query.where("selecteditemCategory", "==", "Chinese")
        query = query.where('restaurant', '==', `${restaurantIndex}`)
        query.onSnapshot((element1) => {
            element1.forEach(element => {

                console.log(element.data())
                let restaurantKey = element.data().restaurant;
                showDishes.innerHTML += `<div class="card items" style="width: 18rem;">
        <img src="${element.data().itemImage}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${element.data().itemName}</h5>
        <p class="card-text">Price :${element.data().itemPrice}</p>
        <p class="card-text"><i class="bi bi-truck"></i> ${element.data().deliveryTypeCategory}</p>
        <div id="orderCounter" class="orderCounter">
        <button onclick="orderFunc(this,'${element.data().itemKey}',this.id,'${element.data().itemName}','${element.data().itemPrice}')" id="${restaurantKey}" class="btn btn-primary">Order</button>
        <button onclick="plusFunc(this)" class="btn btn-outline-primary">+</button>
        <p class="btn btn-outline-primary" id="counter">1</p>
        <button onclick="minusFunc(this)" class="btn btn-outline-primary ">-</button>
    </div>
    </div>
    </div>
            
    `
            });
        })
    } else if (selectCategory === "Pakistani") {
        showDishes.innerHTML = "";
        let query = database.collection("items")
        query = query.where('restaurant', '==', `${restaurantIndex}`)
        query = query.where("selecteditemCategory", "==", "Pakistani")
        query.onSnapshot((element1) => {
            element1.forEach(element => {

                console.log(element.data())
                let restaurantKey = element.data().restaurant;
                showDishes.innerHTML += `<div class="card items" style="width: 18rem;">
        <img src="${element.data().itemImage}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${element.data().itemName}</h5>
        <p class="card-text">Price :${element.data().itemPrice}</p>
        <p class="card-text"><i class="bi bi-truck"></i> ${element.data().deliveryTypeCategory}</p>
        <div id="orderCounter" class="orderCounter">
        <button onclick="orderFunc(this,'${element.data().itemKey}',this.id,'${element.data().itemName}','${element.data().itemPrice}')" id="${restaurantKey}" class="btn btn-primary">Order</button>
        <button onclick="plusFunc(this)" class="btn btn-outline-primary">+</button>
        <p class="btn btn-outline-primary" id="counter">1</p>
        <button onclick="minusFunc(this)" class="btn btn-outline-primary ">-</button>
    </div>
    </div>
    </div>
            
    `
            });
        })
    } else if (selectCategory === "Italian") {
        showDishes.innerHTML = "";
        let query = database.collection("items")
        query = query.where('restaurant', '==', `${restaurantIndex}`)
        query = query.where("selecteditemCategory", "==", "Italian")
        query.onSnapshot((element1) => {
            element1.forEach(element => {

                console.log(element.data())
                let restaurantKey = element.data().restaurant;
                showDishes.innerHTML += `<div class="card items" style="width: 18rem;">
    <div class="card-header">Restaurant Name : ${restaurantName}</div>
        <img src="${element.data().itemImage}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${element.data().itemName}</h5>
        <p class="card-text">Price :${element.data().itemPrice}</p>
        <p class="card-text"><i class="bi bi-truck"></i> ${element.data().deliveryTypeCategory}</p>
        <div id="orderCounter" class="orderCounter">
        <button onclick="orderFunc(this,'${element.data().itemKey}',this.id,'${element.data().itemName}','${element.data().itemPrice}')" id="${restaurantKey}" class="btn ">Order</button>
        <button onclick="plusFunc(this)" class="btn btn-outline-primary">+</button>
        <p class="btn btn-outline-primary" id="counter">1</p>
        <button onclick="minusFunc(this)" class="btn btn-outline-primary ">-</button>
    </div>
    </div>
    </div>
            
    `
            });
        })
    }
}
displayTeam()

let plusFunc = (e) => {
    let counter = e.nextElementSibling.innerHTML;
    ++counter
    e.nextElementSibling.innerHTML = counter
}


let minusFunc = (e) => {
    let counter = e.previousElementSibling.innerHTML;
    if (counter > 1) {
        --counter
    }
    e.previousElementSibling.innerHTML = counter
}

console.log(customerUid)
let userObj;
database.collection('users').doc(customerUid).get().then((user)=>{
    userObj = user.data()
    console.log(user.data())
})


let orderFunc = (e, itemKey, restaurantKey, itemName, itemPrice) => {
    let numOfOrder = e.parentNode.childNodes[5].innerHTML
    console.log(e, itemKey, restaurantKey, itemName)
    e.disabled = true;
    setTimeout(() => {
        e.disabled = false;
    }, 7000);
    database.collection("orders").add({
        restaurantKey: restaurantKey,
        itemKey: itemKey,
        numOfOrder: numOfOrder,
        customerUid: customerUid,
        itemName: itemName,
        itemPrice: itemPrice,
        userName:userObj.userName
    }).then(() => {
        database.collection("users").doc(customerUid).collection("orders").doc(`${itemKey}`).set({
            restaurantKey: restaurantKey,
            itemKey: itemKey,
            numOfOrder: numOfOrder,
            customerUid: customerUid,
            orderStatus: 'Pending',
            itemName: itemName,
            itemPrice: itemPrice,
            userName:userObj.userName
        })
        console.log("order Added")
    })
}