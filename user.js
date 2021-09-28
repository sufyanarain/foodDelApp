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
let itemss;
let cartBtn = document.getElementById("cartBtn");

database.collection("restaurants").onSnapshot((snap) => {
    let showRestaurants = document.getElementById("showRestaurants");
    snap.forEach(element => {

        showRestaurants.innerHTML += `
        <div  class="card" style="width: 18rem;">
        <div class="card-header" onclick="selectRestaurant(this.id,this)" id=${element.data().uid}>Select Restaurant</div>
            <img src="${element.data().restaurantImage}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.data().RestaurantName}</h5>
                <button id=${element.data().uid} onclick='restaurantFunc(this.id,"${element.data().RestaurantName}")' id="openRestaurant" class="btn btn-primary">See Dishes</button>
            </div>
        </div>`
    })

})

let restaurantFunc = (e,resaurantName)=>{
    localStorage.setItem('restaurantIndex',JSON.stringify(e));
    localStorage.setItem('restaurantName',JSON.stringify(resaurantName));
    window.location = 'restaurant.html'
}

let restaurantsArr = [];
let selectRestaurant = (uid, e) => {
    for (let i = 0; i < restaurantsArr.length; i++) {
        if (restaurantsArr[i] == uid) {
            restaurantsArr.splice(i, 1)
        }
    }
    restaurantsArr.push(uid);
    e.className += " bordered";
    console.log(restaurantsArr);

}

let dishedBtn = document.getElementById("dishedBtn");
dishedBtn.addEventListener("click", () => {
    localStorage.setItem("selectedRestaurants", JSON.stringify(restaurantsArr))
    window.location = "allDishes.html";
})

