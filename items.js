
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



let itemName = document.getElementById("itemName");
let itemPrice = document.getElementById("itemPrice");
let itemCategory = document.getElementById("itemCategory");
let itemImage = document.getElementById("itemImage");
let deliveryType = document.getElementById("deliveryType");
let createProduct = document.getElementById("createProduct");
// let itemName = document.getElementById("itemName");
// let itemName = document.getElementById("itemName");
let userType;
let uid = "";

auth.onAuthStateChanged((user) => {
  if (user) {
    if (user.displayName == "true") {
      userType = "restaurents"
    } else {
      userType = "users"
    }
    database.collection(userType).doc(user.uid).get().then((snap) => {
      console.log(snap)

    })
    uid = user.uid;
    displayRestaurant()

  } else {
    console.log("not logged in")
  }
});

let restaurantName;
auth.onAuthStateChanged((user)=>{
  console.log(user.uid)
  database.collection('restaurants').doc(user.uid).get().then((element)=>{
    restaurantName = element.data().RestaurantName;
  })
})

let createItem = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      
      let itemName = document.getElementById("itemName");
      let itemPrice = document.getElementById("itemPrice");
      let itemImage = document.getElementById("itemImage");
      let deliveryType = document.getElementById("deliveryType");
      let itemCategory = document.getElementById("itemCategory");
      let selecteditemCategory = itemCategory.options[itemCategory.selectedIndex].value;
      let deliveryTypeCategory = deliveryType.options[deliveryType.selectedIndex].value;
      let itemKey = new Date().getTime();
      itemKey = itemKey.toString();

      database.collection("items").doc(itemKey).set({
        itemName: itemName.value,
        itemPrice: itemPrice.value,
        selecteditemCategory,
        itemImage: itemImage.value,
        deliveryTypeCategory,
        itemKey,
        restaurant: user.uid,
        restaurantName
      })
    }
  })
}
createProduct.addEventListener('click', createItem)

let itemsDiv = document.getElementById("itemsDiv");

let displayRestaurant = () => {
  let selectCategory = document.getElementById("selectCategory");
  let selectedCategory = selectCategory.options[selectCategory.selectedIndex].value;

  if (selectedCategory === "All Items") {
      database.collection("items").where("restaurant", "==", uid).onSnapshot((element) => {
        itemsDiv.innerHTML = ""
        console.log(element)
        element.forEach(element => {
          // console.log(snapShot)
          itemsDiv.innerHTML += `<div class="card items" style="width: 18rem;">
          <img src="${element.data().itemImage}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${element.data().itemName}</h5>
          <p class="card-text">Price :${element.data().itemPrice}</p>
          <p class="card-text"><i class="bi bi-truck"></i> ${element.data().deliveryTypeCategory}</p>
          </div>
          </div>
          `
        });
        // <a href="#" id="orderBtn" class="btn btn-primary">Order</a>

      })

  } else if (selectedCategory === "Chinese") {
    let query = database.collection("items")
    query = query.where("restaurant", "==", uid)
    query = query.where("selecteditemCategory", "==", "Chinese")
    // database.collection("items").where("restaurant", "==", "uid").where("selecteditemCategory", "==", "Chinese")
    query.onSnapshot((element) => {
      itemsDiv.innerHTML = ""
      element.forEach(element => {
        console.log(element)
        // console.log(snapShot)
        itemsDiv.innerHTML += `<div class="card items" style="width: 18rem;">
          <img src="${element.data().itemImage}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${element.data().itemName}</h5>
          <p class="card-text">${element.data().itemPrice}</p>
          <p class="card-text">${element.data().deliveryTypeCategory}</p>
          <a href="#" class="btn btn-primary">Order</a>
          </div>
          </div>
          `
      });

    })
  } else if (selectedCategory === "Pakistani") {
    let query = database.collection("items")
    query = query.where("restaurant", "==", uid)
    query = query.where("selecteditemCategory", "==", "Pakistani")
    query.onSnapshot((element) => {
      itemsDiv.innerHTML = ""
      element.forEach(element => {
        console.log(element)
        // console.log(snapShot)
        itemsDiv.innerHTML += `<div class="card items" style="width: 18rem;">
          <img src="${element.data().itemImage}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${element.data().itemName}</h5>
          <p class="card-text">${element.data().itemPrice}</p>
          <p class="card-text">${element.data().deliveryTypeCategory}</p>
          <a href="#" class="btn btn-primary">Order</a>
          </div>
          </div>
          `
      });

    })
  } else if (selectedCategory === "Italian") {
    let query = database.collection("items")
    query = query.where("restaurant", "==", uid)
    query = query.where("selecteditemCategory", "==", "Italian")
    query.onSnapshot((element) => {
      itemsDiv.innerHTML = ""
      element.forEach(element => {
        console.log(element)
        // console.log(snapShot)
        itemsDiv.innerHTML += `<div class="card items" style="width: 18rem;">
          <img src="${element.data().itemImage}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${element.data().itemName}</h5>
          <p class="card-text">${element.data().itemPrice}</p>
          <p class="card-text">${element.data().deliveryTypeCategory}</p>
          <a href="#" class="btn btn-primary">Order</a>
          </div>
          </div>
          `
      });

    })
  }


}
