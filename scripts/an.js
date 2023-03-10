'use strict';

/* HELPER: Checks Whether an Element Exists
----------------------------------------------------------------------------------------------------*/
(function( $ ) {

  $.fn.extend({
    exists: function() {
      if ( this.length > 0 ) {
        return true;
      } else {
        return false;
      }
    }
  });

})( jQuery );



jQuery(document).on("ready",function () {
	$("[data-fancybox]").fancybox({
	    touch: false,
	    clickSlide: false
	  });
	  $('selector').fancybox({
	  touch: false
	});
});
// $("#popup-success").fancybox().trigger('click');
$(".icon-collapse").click(function(){
	if($(this).hasClass("active")){
		$(this).closest(".blk-row").find(".info-hidden").addClass("hide-content");
		$(this).removeClass("active");
	}else{
		$(this).addClass("active");
		$(this).closest(".blk-row").find(".info-hidden").removeClass("hide-content");
	}
	
})
$(window).scroll(function() {
	if($(window).width()>768){
		if ($(window).scrollTop() > 400) {
		  $(".page-header").addClass('sticky');
		} else {
		  $(".page-header").removeClass('sticky');
		}
	}else{
		if ($(window).scrollTop() > 200) {
		  $(".page-header").addClass('sticky');
		} else {
		  $(".page-header").removeClass('sticky');
		}
	}
  
});

$(".s-click").click(function(){
	var get_attr=$(this).attr("data-src");
	
	    $('html,body').animate({
	        scrollTop: $(get_attr).offset().top -$(".page-header").outerHeight()},
	        'slow');
	
})
$(".s-menu .icon").click(function(){
	$(".page-header .nav").removeClass("active");
})

$(".icon-menu-mobile").click(function(){
	$(".page-header .nav").addClass("active");
})
$(".page-header .nav ul li").click(function(){
	$(".page-header .nav").removeClass("active");
})
