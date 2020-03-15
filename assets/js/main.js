$(document).ready(function(){
  newsletter.addEventListener('blur', newsletterValidatation),
  subscribeBtn.addEventListener('click', newsletterValidatation);
  newsletter.addEventListener('blur', newsletterValidatation), subscribeBtn.addEventListener('click', porukaNews), newsletter.addEventListener('focus', removeClasses);
});

let newsletter = document.querySelector('#newsletter'),
    subscribeBtn = document.querySelector('#subscribeBtn');

        newsletterValidatation = () => {
        let a = newsletter.value,
            b = /^[a-zšđžćč]{4,}(\.)?[a-zšđžćč]{4,}([0-9]{0,5})?\@((gmail)|(outlook)|(msn)|(live)|(hotmail)|(yahoo)|\w)\.com$/;
            // c = document.querySelector('#newsletter');
            b.test(a) ? newsletter.classList.add('icon-success') : newsletter.classList.add('icon-danger');
         };
let msg = alertify.message('Welcome to League Of legends eSports!');
msg.delay(3);

porukaNews = (removeClasses) =>{
  if(newsletter.classList.contains('icon-danger')){
    let msg = alertify.message('Please write your email!');
    msg.delay(3);
  }
  else{
    let msg = alertify.message('Thanks!');
    msg.delay(3);
  }
}

// modal
 let btn = document.getElementsByClassName('btn')[0];
 var modal = document.getElementById('modal');
 let closeModal = document.getElementsByClassName('modal-close')[0];

 btn.onclick = function(e){
   e.preventDefault();
   modal.style.display = 'block';
   $('html').addClass('is-clipped');
   $('#tralier').get(0).play();
   $("#tralier").prop("volume", 0.2);
 }
 closeModal.onclick = function(){
   modal.style.display = 'none';
   $('html').removeClass('is-clipped');
   $('#tralier').get(0).pause();
   $('#tralier').get(0).currentTime = 0;
 }
  // FORM BUTTON
 let dropdownLogin = document.getElementById('login');
     dropdownLogin.classList.toggle('is-hoverable');

 let dropdownRegister = document.getElementById('register');
     dropdownRegister.classList.toggle('is-hoverable');

// SLAJDER
$("#carousel").owlCarousel({
    navigation : false,
    slideSpeed : 300,
    paginationSpeed : 400,
    items : 1,
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false,
    loop:true,
    autoplay:true,
    autoplayTimeout:5000
});
$("#owl-demo").owlCarousel({
    navigation : true,
    loop:true,
    autoplay:true,
    autoplayTimeout:5000
  });

// count
$('.counter').each(function() {
  var $this = $(this),
      countTo = $this.attr('data-count');
      $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
      {
        duration: 8000,
        easing:'linear',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
          }
      });
});
