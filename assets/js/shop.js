$(document).ready(function(){
    showProducts();
    showTypes();
    showSizes();
    showSort();
    onLoadCartNumbers();
    $("#productSort").change(onSortProducts);
    readMore();
    setTimeout(() => {
       alertify.prompt('eSports Survey', 'What is your favourite team?', '', (evt, value) => {
         if (value != "") {
           alertify.notify('Thank you :)  ', 'customSuccess', 2)
         } else {
           alertify.notify('Ah :( okay, next time', 'customDanger', 2)
         }
       }, () => {
         alertify.notify('Ah :( okay, next time', 'customDanger', 2)
       })
    }, 10000)
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
  let ispis = "";
  types.forEach(type => {
    if(filterCategories == type.href){
    ispis += `<li><a href="#${type.href}" class="aktivan" data-kategorijeID="${type.id}">${type.naziv}</a></li>`;
  }else{
    ispis += `<li><a href="#${type.href}" data-kategorijeID="${type.id}">${type.naziv}</a></li>`;
  }
  });
  document.getElementById("typeProducts").innerHTML = ispis;
  $("#typeProducts li a").click(filterCategories);
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
  document.getElementById("chBoxProducts").innerHTML = ispis;
  $('.sizeType').click(filterBySizes);
}
// ISPISIVANJE I PRIKAZIVANJE SORT
function showSort(){
    $.ajax({
        url: "data/sort.json",
        method: "GET",
        success: function(sort){
            printSort(sort);
        }
    })
}

function printSort(sort){
  let ispis = "";
  sort.forEach(sort => {
    ispis += `<option value="${sort.id}">${sort.name}</option>`
  });
  document.getElementById("productSort").innerHTML = ispis;
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
            sortByRemembered(products);
            printProducts(products);
            productsMore(products);
        });
}
function printProducts(products){
  let ispis = "";
    products.slice(0, 3).forEach(product => {
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
              <p><span class="title is-4 has-text-success price">$${product.price.new}</span> <del class="has-text-danger">${obradaCene(product.price.old)}</del></p>
              <time datetime="2016-1-1">${obradaDatuma(product.datum)}</time>
              <br><br>
              <div class="addToCart">
                <button data-id=${product.id} data-name="${product.name}" data-price="${product.price.new}" href="#" title="Open link" target="_blank" class="btn add-cart btn-content">add to cart</button>
              </div>
            </div>
          </div>
          <div class="borderImgWrap">
           <img src="assets/images/${product.sale.src}" class="borderImg"/>
          </div>
        </div>`
    });
    document.getElementById("products").innerHTML = ispis;
    // $(".add-cart").click(addToCart);
}
// obrada cene
function obradaCene(cena){
  if(cena == ""){
    return ""
  }else{
    return "$" + cena;
  }
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

// ispisivanje datuma
function obradaDatuma(datumString){
  var datum = new Date(datumString);
  var meseci = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${datum.getDate()} / ${meseci[datum.getMonth()]} / ${datum.getFullYear()}`
}

// ***** FILTRIRANJE *****
// filtriranje po kategoriji type
function filterCategories(e){
 e.preventDefault();
 const idCategory = this.dataset.kategorijeid;
 ajaxProducts(function(products){
    products = filterCategory(products, idCategory);
    printProducts(products);
    productsMore(products);
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
        if(chSizes.length>0)
          products = filtBySize(products, chSizes);
          printProducts(products);
          productsMore(products);
    })
}
function filtBySize(products, chSizes){
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
// filtriranje itema po imenu > search
function filterProducts(){
  var value, title, product, i;
  value = document.getElementById("search").value.toUpperCase();
  product = document.getElementsByClassName("card2");
  for(i=0; i<product.length; i++){
    title = product[i].getElementsByTagName('h2');
    if(title[0].innerHTML.toUpperCase().indexOf(value) > -1){
      product[i].style.display="inline-block";
    }else{
      product[i].style.display="none";
    }
  }
};
// filtriranje po price range
function priceRange() {
  let val = $("#priceRange").val();
  document.getElementById("hprice").innerHTML = val + "$";
  ajaxProducts(function(products){
     products = filterPriceRange(products);
   })
}
function filterPriceRange(products) {
    let val = $("#priceRange").val();
    price = products.filter(p => {
      return parseFloat(p.price.new) >= 0 && parseFloat(p.price.new) <= val
    })
    printProducts(price);
    productsMore(price);
}
// ***** SORTIRANJE *****
// sortiranje

function onSortProducts(e){
    e.preventDefault();
    let val = this.value;
    rememberSort(val);
    ajaxProducts(function(products){
        sortProducts(products, val);
        printProducts(products);
        productsMore(products);
    });
}
function sortProducts(products, val) {
  if (val == 1) {
      products.sort((a, b) => {
        let naslov1 = a.name;
        let naslov2 = b.name;
        return naslov1 > naslov2 ? 1 : -1;
      })}
   else if (val == 2) {
       products.sort((a, b) =>{
         let naslov1 = a.name;
         let naslov2 = b.name;
         return naslov1 < naslov2 ? 1 : -1;
       })}
   else if (val == 3) {
       products.sort((a, b) =>{
           if (parseFloat(a.price.new) > parseFloat(b.price.new)) { return 1 }
           else if (parseFloat(a.price.new) < parseFloat(b.price.new)) { return -1 }
           return 0
       })
   }
   else if (val == 4) {
       products.sort((a, b) =>{
           if (parseFloat(a.price.new) < parseFloat(b.price.new)) { return 1 }
           else if (parseFloat(a.price.new) > parseFloat(b.price.new)) { return -1 }
           return 0
       })
   }
   else if (val == 5) {
       products.sort((a, b) =>{
           if (Date.parse(a.datum) < Date.parse(b.datum)) { return 1 }
           else if (Date.parse(a.datum) > Date.parse(b.datum)) { return -1 }
           return 0
       })
   }
   else if (val == 6) {
       products.sort((a, b) =>{
           if (Date.parse(a.datum) > Date.parse(b.datum)) { return 1 }
           else if (Date.parse(a.datum) < Date.parse(b.datum)) { return -1 }
           return 0
       })
   }
}

// localStorage
function sortByRemembered(products){
    if(!isEmptyStorage()){
        let selection = getStorageSort();
        if(!isEmptyStorage()){
            sortProducts(products, selection.val);
            printProducts(products);
            productsMore(products);
        }
    }
}
function rememberSort(val){
    setStorageSort({ val: val});
}

// add to cart button
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
function addToCart() {
    cartNumbers();
    const id = this.dataset.id;
    var products = productsInCart();
    if(products) {
        if(productIsAlreadyInCart()) {
            updateQuantity();
            alertify.message('Cart successfully updated!');
        } else {
            addToLocalStorage();
        }
    } else {
        addFirstItemToLocalStorage();
        alertify.message('Item successfully added to your cart!');
    }
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

// LOCAL STORAGE SET AND GET
// products
function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}
// sort
function getStorageSort(){
    return JSON.parse(localStorage.getItem('sort'));
}
function setStorageSort(value){
    return localStorage.setItem('sort', JSON.stringify(value));
}
// empty
function isEmptyStorage(){
    return localStorage.getItem('sort') === null;
}

// SHOW MORE PRODUCTS
function readMore(){
  $('.moreless-button').click(function() {
    $('#moreProducts').slideToggle();
    if ($('.moreless-button').text() == "Read more") {
      $(this).text("Read less")
    } else {
      $(this).text("Read more")
    }
  });
}
function productReadMore(){
  ajaxProducts(function(products){
     products = filterMore(products);
   })
}
function filterMore(products){
    productsMore(products);
}

function productsMore(products){
  let ispis = "";
    products.slice(3, 9).forEach(product => {
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
              <p><span class="title is-4 has-text-success price">$${product.price.new}</span> <del class="has-text-danger">${obradaCene(product.price.old)}</del></p>
              <time datetime="2016-1-1">${obradaDatuma(product.datum)}</time>
              <br><br>
              <div class="addToCart">
                <button data-id=${product.id} data-name="${product.name}" data-price="${product.price.new}" href="#" title="Open link" target="_blank" class="btn add-cart btn-content">add to cart</button>
              </div>
            </div>
          </div>
          <div class="borderImgWrap">
           <img src="assets/images/${product.sale.src}" class="borderImg"/>
          </div>
        </div>`
    });
    document.getElementById("moreProducts").innerHTML = ispis;
    $(".add-cart").click(addToCart);
}
