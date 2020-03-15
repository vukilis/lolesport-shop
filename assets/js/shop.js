$(document).ready(function(){
    showProducts();
    showTypes();
    showSizes();
    onLoadCartNumbers();
    $(".sortType").click(onSortProducts);
});
// ISPISIVANJE I PRIKAZIVANJE MENIJA TYPES
function ajaxTypes(){
    $.ajax({
        url: "data/productTypes.json",
        method: "GET",
        success: function(types){
            printTypes(types);
        }
    })
}
function showTypes() {
    ajaxTypes(function(types){
            printTypes(types);
        });
}
function printTypes(types){
  let ispis = "<ul>";
  types.forEach(type => {
    if(filterCategories == type.href){
    ispis += `<li><a href="#${type.href}" class="aktivan" data-kategorijeID="${type.id}">${type.naziv}</a></li>`;
  }else{
    ispis += `<li><a href="#${type.href}" data-kategorijeID="${type.id}">${type.naziv}</a></li>`;
  }
  });
  ispis += "</ul>";
  document.getElementById("tgLige").innerHTML = ispis;
  $("#tgLige ul li a").click(filterCategories);
}
// ISPISIVANJE I PRIKAZIVANJE SIZES
function showSizes(){
    $.ajax({
        url: "data/productSizes.json",
        method: "GET",
        success: function(sizes){
            printSizes(sizes);
        }
    })
}

function printSizes(sizes){
  let ispis = "";
  sizes.forEach(size => {
    ispis += `<label class="checkbox chBox">
              <input type="checkbox" class="sizeType" value="${size.id}"> <span class="text">${size.title}</span>
              </label>`
  });
  document.getElementById("navigacijaTimova").innerHTML = ispis;
  $('.sizeType').click(filterBySizes);
}
// ISPISIVANJE I PRIKAZIVANJE PRODUCTS
function ajaxProducts(callbackSuccess){
    $.ajax({
        url: "data/products.json",
        method: "GET",
        success: callbackSuccess
    });
}
function showProducts() {
    ajaxProducts(function(products){
            filtByRemembered(products);
            sortByRemembered(products);
            printProducts(products);
        });
}
function printProducts(products){
  let ispis = "";
    products.forEach(product => {
        ispis += `<div class="card2">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="assets/images/products/${product.slika.src}" alt="${product.slika.alt}">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="assets/images/teams/${product.timSlika.src}" alt="${product.timSlika.alt}">
                </figure>
              </div>
              <div class="media-content">
                <h2 class="title is-4">${product.name}</h2>
                <p class="subtitle is-4">${printStars(product.stars)}</p>
              </div>
            </div>
            <div class="content">
              <p class="title is-6">${printDelivery(product.delivery)}</p>
              <p><span class="title is-4 has-text-success">$${product.price.new}</span> <del class="has-text-danger">$${product.price.old}</del></p>
              <time datetime="2016-1-1">1 Jan 2016</time>
              <br><br>
              <div class="addToCart">
                <button data-id=${product.id} href="#" title="Open link" target="_blank" class="btn add-cart btn-content">add to cart</button>
              </div>
            </div>
          </div>
        </div>`
    });
    document.getElementById("products").innerHTML = ispis;
    $(".add-cart").click(addToCart);
}
// filtriranje po kategoriji type
function filterCategories(e){
 e.preventDefault();
 const idCategory = this.dataset.kategorijeid;
 rememberFilt(idCategory);
 ajaxProducts(function(products){
    products = filterCategory(products, idCategory);
    printProducts(products);
 });
}
function filterCategory(products, idCategory){
    return products.filter(product => product.kategorija.id == idCategory);
}
// filtriranje po kategoriji size
function filterBySizes(){
    let chBox = $('.sizeType:checked')
    let chSizes = [];
    for(let i of chBox){
      chSizes.push(parseInt(i.value));
    }
    ajaxProducts(function(products){
        if(chSizes.length>0){
          products = filterBySize(products, chSizes);
        }
        printProducts(products);
    })
}
function filterBySize(products, chSizes){
    return products.filter( product => {
        let sizes = product.sizes.map(product => product.id);
        let showProduct = true;
        for(let size of chSizes){
            if(!inArray(sizes, size)){
              showProduct = false;
              return;
            }
        }
        return showProduct;
    })
}
// array funkcija
function inArray(array, el){
    return array.indexOf(el)!==-1;
}
// ispisivanje stars
function printStars(stars){
    let ispis = "";
    for(let i=1; i <= 5; i++){
        if(i <= stars){
            ispis += "<i class='fa fa-star'></i>";
        }else{
          ispis += "<i class='far fa-star'></i>";
        }
    }
    return ispis;
}
// ispisivanje delivery
function printDelivery(delivery){
    if(delivery)
    return "<i class='has-text-success fa fa-car' title='Delivery'></i>";
    return "<i class='has-text-danger	fa fa-car' title='No delivery'></i>";
}

// filtriranje igraca po imenu i poziciji > search
function filterProducts(){
    var value, title, player, i;
    value = document.getElementById("search").value.toUpperCase();
    player = document.getElementsByClassName("card2")   ;
    for(i=0; i<player.length; i++){
      title = player[i].getElementsByTagName('h2');
      if(title[0].innerHTML.toUpperCase().indexOf(value) > -1){
        player[i].style.display="block";
      }else{
        player[i].style.display="none";
      }
    }
};

// sortiranje products
function onSortProducts(e){
    e.preventDefault();
    let sortBy = this.dataset.sortby;
    let order = this.dataset.order;
    rememberSort(sortBy, order);
    ajaxProducts(function(products){
        sortProducts(products, sortBy, order);
        printProducts(products);
    });
}
function sortProducts(products, sortBy, order) {
    products.sort(function(a,b){
      let valueA = (sortBy=='price') ? a.price.new : a.name;
      let valueB = (sortBy=='price') ? b.price.new : b.name;
      if(valueA > valueB){return order=='asc' ? 1 : -1;}
      else if(valueA < valueB){return order=='asc' ? -1 : 1;}
    });
}
// dropdown sort button
let dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
});
// function clearCart() {
//     localStorage.removeItem("products");
// }
// function addToCart(){
//   let carts = document.querySelectorAll('.add-cart');
//   for(let i=0; i<carts.length; i++){
//     carts[i].addEventListener('click', (e) =>{
//       e.preventDefault();
//       cartNumbers();
//     })
//   }
// }
function onLoadCartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers;
  }
}
function cartNumbers(){
  let productNumbers = localStorage.getItem('cartNumbers');
  console.log(productNumbers);
  productNumbers = parseInt(productNumbers);
  if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  }else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
}

// LOCAL STORAGE
function sortByRemembered(products){
    if(!isEmptyStorage()){
        let selection = getStorage();
        if(!isEmptyStorage()){
            sortProducts(products, selection.sortBy, selection.order);
        }
    }
}
function rememberSort(sortBy, order){
    setStorage({ sortBy: sortBy, order: order});
}

function filtByRemembered(products){
    if(!isEmptyStorage()){
        let selection = getStorage();
        if(!isEmptyStorage()){
            filterCategory(products, selection.idCategory);
        }
    }
}
function rememberFilt(idCategory){
    setStorage({ idCategory: idCategory});
}

/* HELP FUNKCIJE */
// sort
function getStorage(){
    return JSON.parse(localStorage.getItem('sort'));
}
function setStorage(value){
    return localStorage.setItem('sort', JSON.stringify(value));
}
function isEmptyStorage(){
    return localStorage.getItem('sort') === null;
}

// add to cart button
function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}
function addToCart() {
    cartNumbers();
    // let id = $(this).data("id");
    const id = this.dataset.id;
    var products = productsInCart();
    if(products) {
        if(productIsAlreadyInCart()) {
            updateQuantity();
        } else {
            addToLocalStorage()
        }
    } else {
        addFirstItemToLocalStorage();
    }
    alertify.message('Cart successfully updated!');
    function productIsAlreadyInCart() {
        return products.filter(x => x.id == id).length;
    }
    function addToLocalStorage() {
        let products = productsInCart();
        products.push({
            id : id,
            quantity : 1
        });
        localStorage.setItem("products", JSON.stringify(products));
    }
    function updateQuantity() {
        let products = productsInCart();
        for(let i in products)
        {
            if(products[i].id == id) {
                products[i].quantity++;
                break;
            }
        }
        localStorage.setItem("products", JSON.stringify(products));
    }
    function addFirstItemToLocalStorage() {
        let products = [];
        products[0] = {
            id : id,
            quantity : 1
        };
        localStorage.setItem("products", JSON.stringify(products));
    }
}
