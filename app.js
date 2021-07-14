const shoppingBtn = document.querySelector(".fa-shopping-cart");
// const shoppingBtn = document.querySelector(".shopping-btn");
const shoppingCont = document.querySelector(".shopping-container");
const mainCont = document.querySelector(".web-cover");

const popupCont = document.querySelector(".item-popup");

let shoppingShow = false;
//____________________________________________________________________________

productArray = [
  [
    "Statue Head",
    59.99,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit Delenitpraesentium dignissimos saepe sint quidem voluptates et dolorequasi ad qui nihil, molestiae repellendus ullam blanditiis optioiure fuga distinctio quisquam.",
    "/images/product-1.jpeg",
  ],
  [
    "Eternity Vase",
    69.99,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit Delenitpraesentium dignissimos saepe sint quidem voluptates et dolorequasi ad qui nihil, molestiae repellendus ullam blanditiis optioiure fuga distinctio quisquam.",
    "/images/product-2.jpeg",
  ],
  [
    "Motion Vase",
    79.99,
    "Lorem ipsum dolor sit amet consectetur adipisicing elit Delenitpraesentium dignissimos saepe sint quidem voluptates et dolorequasi ad qui nihil, molestiae repellendus ullam blanditiis optioiure fuga distinctio quisquam.",
    "/images/product-3.jpeg",
  ],
];
//______________________________________________________________________________

let btnCount = 0;

//trigger shopping cart open
const openShopping = function () {
  shoppingShow = true;
  shoppingCont.classList.add("shopping-active");
  pagePause();
};

// trigger shopping cart close
const closeShopping = function () {
  btnCount = 0;
  popupCont.classList.add("hide");
  //add btn remove pressed class
  document.querySelector(".add-btn").classList.remove("add-btn-press");
  document.querySelector("#buy-msg").classList.remove("show-msg");
  document
    .querySelector(".add-btn-animation")
    .classList.remove("add-btn-animation1");
  shoppingCont.classList.remove("shopping-active");
  pagePause();
};

const pagePause = function () {
  mainCont.classList.toggle("shopping-active2");
  setTimeout(() => {
    mainCont.classList.toggle("web-cover-opacity");
  }, 100);
  document.body.classList.toggle("stop-scrolling");
};

//______________________________________________________________________________

//SHOW HEADER ON SCROLL UP - HIDE ON SCROLL DOWN
const doc = document.documentElement;

let prevScroll = window.scrollY || doc.scrollTop;
let curScroll = "";
let direction = 0;
let prevDirection = 0;

const header = document.querySelector("header");

var checkScroll = function () {
  /*
   ** Find the direction of scroll
   ** 0 - initial, 1 - up, 2 - down
   */

  curScroll = window.scrollY || doc.scrollTop;

  if (curScroll > prevScroll) {
    //scrolled up
    direction = 2;
  } else if (curScroll < prevScroll) {
    //scrolled down
    direction = 1;
  }

  if (direction !== prevDirection) {
    toggleHeader(direction, curScroll);
  }

  prevScroll = curScroll;
};

var toggleHeader = function (direction, curScroll) {
  if (direction === 2 && curScroll > 50) {
    //replace 52 with the height of your header in px

    header.classList.add("hideh");
    prevDirection = direction;
  } else if (direction === 1) {
    header.classList.remove("hideh");
    prevDirection = direction;
  }
};

//______________________________________________________________________________

const itemCont = document.querySelector(".item-container");
const itemHolder = itemCont.querySelectorAll(".item");

//hover over item
itemHolder.forEach((item) =>
  item.addEventListener("mouseenter", function (e) {
    clicked = e.target.id;

    document
      .querySelector("#" + clicked)
      .querySelector(".item-image")
      .classList.add("zoom");
  })
);
let clicked = "";
//mouse leave item
itemHolder.forEach((item) =>
  item.addEventListener("mouseleave", function (e) {
    clicked = e.target.id;

    document
      .querySelector("#" + clicked)
      .querySelector(".item-image")
      .classList.remove("zoom");
  })
);

//add hide to pop up
let currItem = "";
itemHolder.forEach((item) =>
  item.addEventListener("click", function (e) {
    currItem = e.target.closest(".item").dataset.product;

    pagePause();

    //hide all add to cart btns

    // add active class to clicked elements
    popupCont.classList.remove("hide");

    //reset values for pop up
    document.getElementById("popup-title").innerHTML =
      productArray[currItem][0];
    document.getElementById("popup-price").innerHTML =
      "$" + productArray[currItem][1];
    document.getElementById("popup-desc").innerHTML = productArray[currItem][2];
    document.getElementById("popup-image").src = productArray[currItem][3];
  })
);

//______________________________________________________________________________

//______________________________________________________________________________
inCart = [];
const bottomCart = document.querySelector(".cart-main");
const finalPrice = document.getElementById("finalPrice");
let moneyTotal = 0;
const addToCart = function () {
  btnCount++;
  //second press will take user to view shopping cart
  if (btnCount == 2) {
    closeShopping();
    openShopping();
    //here
    btnCount = 0;
  } else {
    //remove empty message
    document.querySelector(".empty").classList.add("hide");
    //add shoppingcart notification
    document.querySelector(".notification").classList.remove("hide");
    //add checkout section
    document.querySelector(".shop-confirm").classList.remove("hide");
    cartAdd = true;

    //check if product is already in cart
    for (let i = 0; i < inCart.length; i++) {
      if (currItem == inCart[i]) {
        cartAdd = false;
        //increment quantity of item in shopping cart
        document.getElementById(`item-counter-${currItem}`).value++;
      }
    }

    //button animation

    this.classList.add("add-btn-press");
    document
      .querySelector(".add-btn-animation")
      .classList.add("add-btn-animation1");
    document.querySelector("#buy-msg").classList.add("show-msg");

    // let viewCartBtn = document.querySelector(".add-btn-press");
    // viewCartBtn.addEventListener("click", function () {
    //   closeShopping();
    //   openShopping();
    // });(.)

    if (cartAdd) {
      const cartHTML = `<div class="cart-item-container" data-item=${currItem} id="cart-${currItem}">
    <div class="buy-img">
      <img src="${productArray[currItem][3]}" alt=""  />
    </div>
    <div class="buy-info">
      <h4>${productArray[currItem][0]}</h4>
      <p>$${productArray[currItem][1]}</p>
    </div>
    <div class="buy-btns">
      <p class= "cart-remove" id="removeBtn-${currItem}">remove</p>
      <input class="item-counter" id="item-counter-${currItem}" type="number" value=1 />
    </div>
    </div>`;
      //add item number to inCart array
      inCart.push(currItem);
      //add html element to DOM
      bottomCart.insertAdjacentHTML("beforeend", cartHTML);

      //__________________________________
    }
    //add event listener to remove button
    const removeBtn = document.querySelectorAll(".cart-remove");
    removeBtn.forEach((el) => el.addEventListener("click", cartRemove));

    //add event listener to quantity input
    const cartInput = document.querySelectorAll(".item-counter");
    cartInput.forEach((input) => input.addEventListener("change", inputMargin));

    //update total price
    updateTotal();
  }
};

//______________________________________________________________________________
//REMOVE ITEM FROM SHOPPING CART
const cartRemove = function (e) {
  //identify item number
  removedItem = e.target.id.slice(-1);
  //get rid of item in cart array
  inCart = inCart.filter((item) => item != removedItem);
  //remove item from dom
  document
    .querySelector(`#cart-${removedItem}`)
    .classList.add("remove-animation");
  //update price
  updateTotal();

  //check if cart is emtpy
  setTimeout(() => {
    document.querySelector(`#cart-${removedItem}`).remove();
    if (inCart.length == 0) {
      //add empty message
      document.querySelector(".empty").classList.remove("hide");
      //hide shoppingcart notification
      document.querySelector(".notification").classList.add("hide");
      //remove checkout section animation
      document
        .querySelector(".shop-confirm")
        .classList.add("shop-confirm-slide");
      //remove checkout section from dom
      setTimeout(() => {
        document.querySelector(".shop-confirm").classList.add("hide");
        document
          .querySelector(".shop-confirm")
          .classList.remove("shop-confirm-slide");
      }, 1000);
    }
  }, 700);
};
//______________________________________________________________________________

const inputMargin = function (e) {
  currentInput = e.target.value;
  if (currentInput < 1) {
    e.target.value = 1;
  }
  updateTotal();
};
//______________________________________________________________________________

const updateTotal = function () {
  finalTotal = 0;

  for (let i = 0; i < inCart.length; i++) {
    //find quantity of item
    quantity = document.getElementById(`item-counter-${inCart[i]}`).value;
    //multiply price of item by quanity
    itemTotal = productArray[inCart[i]][1] * quantity;

    //add price to accumulated total
    finalTotal += itemTotal;
  }

  finalTotal = Math.round(finalTotal * 100) / 100;
  finalPrice.innerHTML = "$" + finalTotal.toFixed(2);
};
//______________________________________________________________________________
//sign up box

const signupBtn = document.querySelector(".input-btn");
const messgaeCont = document.querySelector(".signup-msg");

const EnterSignup = function () {
  const input = document.querySelector(".signup-input");
  const emailString = input.value;
  //clear input
  input.value = "";

  //check if email is valid
  if (!validEmail(emailString)) {
    //show error messgae
    errorMessage("Please enter a valid email");
    return;
  }
  //add class to show thankyou message
  document.querySelector(".success-msg").classList.add("fade");
  //fade out input and button and existing error message
  input.classList.add("fade1");
  signupBtn.classList.add("fade1");
  messgaeCont.classList.remove("fade");
  //remove fade out elements from DOM
  setTimeout(() => {
    input.remove();
    signupBtn.remove();
    messgaeCont.remove();
  }, 250);
};

const validEmail = function (email) {
  return /\S+@\S+\.\S+/.test(email);
};

const errorMessage = function (message) {
  messgaeCont.innerHTML = message;
  messgaeCont.classList.add("fade");
};

signupBtn.addEventListener("click", EnterSignup);

//______________________________________________________________________________

//ELEMENT
const allItems = document.querySelectorAll(".item");

//FUNCTION
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entries);
  // console.log(entry);

  if (!entry.isIntersecting) return;
  // console.log("hello");
  // console.log(entry.target);
  //if section is intersection the 'section-hide' class with be removed and a transition class will be added
  // entry.target.classList.remove("section-hide");
  entries.forEach((entry) => entry.target.classList.add("item-show"));

  // console.log(entry);
  observer.unobserve(entry.target);
};

//OBSERVER
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.05,
});

//LINK
allItems.forEach(function (section) {
  console.log(section);
  sectionObserver.observe(section);
  //adds a class to hide all sections
  // section.classList.add("section-hide");
});

//______________________________________________________________________________

//______________________________________________________________________________

const crossPopup = document.querySelectorAll(".cross-container");

//open cart from shopping button
shoppingBtn.addEventListener("click", openShopping);
//click on paused background
mainCont.addEventListener("click", closeShopping);
//clicked on exit button
crossPopup.forEach((el) => el.addEventListener("click", closeShopping));
//remove cart item

window.addEventListener("scroll", checkScroll);

const addbtn = document.querySelectorAll(".add-btn");
// addbtn.addEventListener("click", addToCart);

addbtn.forEach((el) => el.addEventListener("click", addToCart));

const openbtn = document.querySelector(".intro-btn");
setTimeout(() => {
  openbtn.classList.add("intro-animation");
}, 400);

const ready = function () {};
window.addEventListener("load", ready);

//______________________________________________________________________________
