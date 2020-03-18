$(document).ready(function () {
    onLoadCartNumbers();
    let products = productsInCart();
    if(products.length == 0)
        showEmptyCart();
    else
        showProductCart();
});
function showProductCart() {
    let products = productsInCart();
    $.ajax({
        url : "data/products.json",
        success : function(data) {
            let showProductArray = [];
            data = data.filter(p => {
                for(let product of products){
                    if(p.id == product.id) {
                        p.quantity = product.quantity;
                        return true;
                    }
                } return false;
            });
            printProductsCart(data);
            updateTotalCost();
        }
    });
}

// ISPISIVANJE TABELE
function printProductsCart(products){
  let ispis = `<table class="table">
                <thead>
                 <tr>
                  <th class="product-thumbnail">Item</th>
                  <th class="product-price">Price</th>
                  <th class="product-quantity">Quantity</th>
                  <th class="product-total">Total Price</th>
                  <th class="product-remove">Remove</th>
                 </tr>
                </thead>
               <tbody>`;

  for(let p of products) {
      ispis += showProductData(p);
  }

  ispis +=`</tbody></table>`;

  document.getElementById('tabela').innerHTML = ispis;

  function showProductData(p) {
     return  `<tr class="productInCart">
       <td class="product-item">
         <img src="assets/images/products/${p.slika.src}" alt="${p.slika.alt}" class="img-fluid">
         <h2 class="h5 text-black">${p.name}</h2>
       </td>
       <td>$${p.price.new}</td>
       <td>
         <div class="input-group mb-3">
           <span class="tableText">x${p.quantity}</span>
         </div>
       </td>
       <td>$<span class="cena">${p.price.new * p.quantity}</span></td>
       <td><a href="#" class="btn btn-primary btn-x" onclick='removeFromCart(${p.id})'><i class="fas fa-trash"></i></a></td>
     </tr>`
  }
  // ISPISIVANJE PUNE CENE
  function showTotalCostData(){
    let ispis = "";
  ispis = `<h2 class="title">Total Cost:</h2>
  <span id="subtotal"></span>`
  document.getElementById('totalCost').innerHTML = ispis;
 }
 function removeAllShow(){
   let ispis = "";
   ispis = `<button id="isprazniKorpu" class="btn btn-content">Remove all</button><hr>`
   document.getElementById('removeAll').innerHTML = ispis;
 }
 function proccedButtons(){
   let ispis = "";
   ispis = `<a id="conShop" href="shop.html" class="button is-danger is-outlined is-uppercase">Continue Shopping</a>
   <a id="checkout" href="#" class="button is-success is-outlined is-uppercase">Proceed To Checkout</a>`
   document.getElementById('proceedAll').innerHTML = ispis;
 }
 showTotalCostData();
 removeAllShow();
 proccedButtons();
 $("#isprazniKorpu").click(removeAllData);
}
 // PUNA CENA
function updateTotalCost(){
    let getProductsCost = $('.productInCart').find('.cena');
    let totalCost = 0;
    for (let i = 0;i < getProductsCost.length;i++){
        let productValue = parseFloat($(getProductsCost[i]).html())
        totalCost+=productValue;
    }
    $('#subtotal').html('$' + totalCost.toFixed(2));
}

// prazna korpa
function showEmptyCart() {
    $("#tabela").html("<h1>Your cart is empty!</h1>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}

// broj itema u korpi
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers === null){
    document.querySelector('.cart span').textContent = 0;
    showEmptyCart();
  }else{
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

// brisanje iz korpe
function removeFromCart(id) {
    let products = productsInCart();
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtered));
    if(!filtered.length){
        showEmptyCart();
        $('#totalCost').hide();
        $('#removeAll').hide();
        localStorage.setItem("cartNumbers", 0);
    }else{
        showProductCart();
    }
    alertify.message('Cart successfully removed!');
}

// brisanje svega
function removeAllData(){
    emptyCart();
    showEmptyCart();
    $('#totalCost').hide();
    $('#removeAll').hide();
}

function emptyCart() {
    localStorage.removeItem("products");
    localStorage.removeItem("cartNumbers");
    alertify.message('All carts successfully removed!');
}
