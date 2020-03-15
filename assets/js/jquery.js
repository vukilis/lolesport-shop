//alertify

// aktivan on scroll
$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop()+100;
    // var scrollLeft = $(window).scrollTop();
		$('#timovi article').each(function(i) {
				if ($(this).position().top <= scrollDistance) {
						$('#navigacijaTimova ul a.aktivan').removeClass('aktivan');
						$('#navigacijaTimova ul a').eq(i).addClass('aktivan');
				}
		});
}).scroll();
// scrollToTop
$('#myBtnScroll').hide();
var scrollTop = $("#myBtnScroll");
// var scrollTop = $(".tgBtn");
$(window).scroll(function() {
 $('#myBtnScroll').show();
 // $('.sakrijKategorije').show();
 var topPos = $(this).scrollTop();

 // prikaz topTop
 if (topPos > 350) {
   $(scrollTop).css("opacity", "1");
 } else {
   $(scrollTop).css("opacity", "0");
 }
// skrivanje toglovanjeBtn / kategorijeLige
 var topPosCat = $(this).scrollTop();
 if (topPosCat >= 350) {
   $('.tgBtn').fadeOut();
   $('.kategorijeLigeImena').fadeOut();
 } else {
   $('.tgBtn').fadeIn(2000);
 }

});

// to top
$(scrollTop).click(function() {
 $('html, body').animate({
   scrollTop: 0
 }, 1200);
 return false;
});

// toglovanjeBtn
$(".tgBtn").removeClass("selected");
$(".tgBtn").click(function() {
if ( $(".kategorijeLigeImena").first().is(":hidden") ) {
  $(".kategorijeLigeImena").show("slow");
  $(".tgBtn").addClass( "selected" );
} else {
  $(".kategorijeLigeImena").hide("fast");
  $(".tgBtn").removeClass( "selected" );
}
});

$(document).ready(function() {
  $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

  });
});
