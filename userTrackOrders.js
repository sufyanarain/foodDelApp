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


let ordersDiv = document.getElementById("ordersDiv");

let uid = localStorage.getItem('userLogin')
uid = JSON.parse(uid)
  

let trackOrdersFunc = () => {
    database.collection('users').doc(uid).collection('orders').get().then((elem) => {
        elem.forEach(element => {
            console.log(element.data())
            database.collection('restaurants').doc(element.data().restaurantKey).get().then((rest) => {
                console.log(rest.data().RestaurantName)
                ordersDiv.innerHTML += `<div class="card mt-2" style="width: 14rem;">
                                <div class="card-header">Restaurant : ${rest.data().RestaurantName}</div>
                            <div class="card-body">
                                <h6 class="card-subtitle">Item : ${element.data().itemName}</h6>
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Price : ${element.data().itemPrice}</li>
                                <li class="list-group-item">Quantity : ${element.data().numOfOrder}</li>
                                <li class="list-group-item">Total : `+element.data().numOfOrder * element.data().itemPrice+`</li>
                            </ul>
                            <div class="accepRejBtn card-body">
                                <button id="statusBtn" class="btn btn-outline-primary">${element.data().orderStatus}</button>
                                
                            </div>
                        </div>`
            })
        });
    })
}
trackOrdersFunc()
