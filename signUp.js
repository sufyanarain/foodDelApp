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

let restoBtn = document.getElementById("restoBtn");
let custBtn = document.getElementById("custBtn");
let restaurantDiv = document.getElementById("restaurantDiv");
let customertDiv = document.getElementById("customertDiv");
let restSignup = document.getElementById("restSignup");
let userSignup = document.getElementById("userSignup");
let loginError = document.getElementById("loginError");
let loginError1 = document.getElementById("loginError1");


let restaurantFunc = () => {
    restaurantDiv.style.display = "block";
    customertDiv.style.display = "none";
    custBtn.className = "btn btn-outline-primary"
    restoBtn.className = "btn btn-primary"
}
restaurantFunc()
restoBtn.addEventListener('click', restaurantFunc)

let customerFunc = () => {
    customertDiv.style.display = "block";
    restaurantDiv.style.display = "none";
    restoBtn.className = "btn btn-outline-primary"
    custBtn.className = "btn btn-primary"

    // restoBtn.style.display = "none";
    // custBtn.style.display = "none";

}
custBtn.addEventListener('click', customerFunc)


let restaurantSignup = () => {
    let RestaurantName = document.getElementById("RestaurantName");
    let restaurantEmail = document.getElementById("restaurantEmail");
    let restaurantCountry = document.getElementById("restaurantCountry");
    let restaurantCity = document.getElementById("restaurantCity");
    let restaurantImage = document.getElementById("restaurantImage");
    let restaurantPassword = document.getElementById("restaurantPassword");
    let restForm = document.getElementById("restForm");

    auth.createUserWithEmailAndPassword(restaurantEmail.value, restaurantPassword.value)
        .then((user) => {
            console.log(user.user.uid)
            user.user.updateProfile({
                displayName: "true"

            })
            database.collection('restaurants').doc(user.user.uid).set({
                RestaurantName: RestaurantName.value,
                restaurantEmail: restaurantEmail.value,
                restaurantCountry: restaurantCountry.value,
                restaurantCity: restaurantCity.value,
                restaurantImage: `${restaurantImage.value}`,
                restaurant: true,
                uid: user.user.uid
            })
            // restForm.reset();
            // window.location = "index.html"
        })
        .catch((error) => {
            loginError.innerHTML = error.message;
            console.log(error.message)
        });
    // this.preventDefault()
}
restSignup.addEventListener('click', restaurantSignup);

let userSignupFunc = () => {
    let userName = document.getElementById("userName");
    let userEmail = document.getElementById("userEmail");
    let userCountry = document.getElementById("userCountry");
    let userCity = document.getElementById("userCity");
    let userPhone = document.getElementById("userPhone");
    let userPassword = document.getElementById("userPassword");
    let userFrom = document.getElementById("userFrom");

    auth.createUserWithEmailAndPassword(userEmail.value, userPassword.value)
        .then((user) => {
            console.log(user.user.uid)
            database.collection('users').doc(user.user.uid).set({
                userName: userName.value,
                userEmail: userEmail.value,
                userCountry: userCountry.value,
                userCity: userCity.value,
                userPhone: userPhone.value,
                user: true,
                uid: user.user.uid
            })
            // userFrom.reset();
            // window.location = "index.html"
        })
        .catch((error) => {
            loginError1.innerHTML = error.message;
            console.log(error.message)
        });
}
userSignup.addEventListener('click', userSignupFunc);
