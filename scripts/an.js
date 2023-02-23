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
  if ($(window).scrollTop() > 400) {
    $(".page-header").addClass('sticky');
  } else {
    $(".page-header").removeClass('sticky');
  }
});