$(document).ready(function () {
    let products = productsInCart();
    if(!products.length){
        showEmptyCart();
      }
    else
        displayCartData();
});
function displayCartData() {
    let products = productsInCart();
    $.ajax({
        url : "data/products.json",
        success : function(data) {
            let productsForDisplay = [];

            data = data.filter(p => {
                for(let prod of products)
                {
                    if(p.id == prod.id) {
                        p.quantity = prod.quantity;
                        return true;
                    }
                }
                return false;
            });
            generateTable(data)
        }
    });
}

function generateTable(products) {
    let ispis = `
    <table class="table">
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
        ispis += generateTr(p);
    }

    ispis +=`    </tbody>
            </table>`;

    document.getElementById('tabela').innerHTML = ispis;

    function generateTr(p) {
       return  `<tr>
         <td class="product-item">
           <img src="assets/images/products/${p.slika.src}" alt="${p.slika.alt}" class="img-fluid">
           <h2 class="h5 text-black">${p.name}</h2>
         </td>
         <td>${p.price.new}</td>
         <td>
           <div class="input-group mb-3">
             <span class="tableText">${p.quantity}</span>
           </div>
         </td>
         <td>${p.price.new * p.quantity}</td>
         <td><a href="#" class="btn btn-primary btn-x" onclick='removeFromCart(${p.id})'>X</a></td>
       </tr>`
    }
}
function showEmptyCart() {
    $("#tabela").html("<h1>Your cart is empty!</h1>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}
function removeFromCart(id) {
    let products = productsInCart();
    let filtered = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtered));

    displayCartData();
}
