// Cart
let cartIcon = document.querySelector('#cart');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close');

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready(){
    //Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("trash");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Change
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName("basket");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}


// Remove Items From Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
// Quantity Change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Add to Cart
function addCartClicked(event) {
    var button = event.target
    var shopItems = button.parentElement
    var title = shopItems.getElementsByClassName("item-title")[0].innerText;
    var price = shopItems.getElementsByClassName("price")[0].innerText;
    var itemImg = shopItems.getElementsByClassName("item-img")[0].src;
    addItemToCart(title, price, itemImg);
    updatetotal();

}

function addItemToCart(title, price, itemImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }
        
    }


var cartBoxContent = `
                      <img src="${itemImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove Cart -->
                        <ion-icon name="trash-outline" class="trash" id="trash"></ion-icon>`
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName("trash")[0]
.addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0]
.addEventListener("change", quantityChanged);
}



// Modal elements
const modalCheckout = document.querySelector('#modalCheckout');
const totalPrice = document.querySelector('.total-price');
const finalTotal = document.querySelector('#finalTotal');




// Update Total
function updatetotal() {

    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
var total = 0;


    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);

    }
        // If price contains cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
        totalPrice.value = total;


        // totalPrice.value = total;
        finalTotal.value = totalPrice.value;
        finalTotal.innerText = totalPrice.value;
}




// Buy Button
function buyButtonClicked() {

    // alert ("your Order is placed");
    
    // var cartContent = document.getElementsByClassName("cart-content")[0];
    // while (cartContent.hasChildNodes()) {
    //     cartContent.removeChild(cartContent.firstChild);
    // }
    updatetotal();


    modalCheckout.style.display = 'block';
}




// close modal
modalCheckout.addEventListener('click', () => modalCheckout.style.display = 'none');

