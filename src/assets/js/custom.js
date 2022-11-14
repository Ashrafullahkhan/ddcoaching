//window.onscroll = function () { scrollFunction() };
var shrinkHeader = 100;
jQuery(window).scroll(function () {
  var scroll = getCurrentScroll();
  if (scroll >= shrinkHeader) {
    $('#dandelion').addClass('sticky-b');
    if (window.location.pathname == '/') {
      jQuery("#sidebarMenu").addClass('sidedisplayblock');
      jQuery("#sidebarMenu").removeClass('sidedisplaynone');
      jQuery(".main-homepage").addClass('homepage-out');
      setTimeout(function () {
        var height = $("#dandelion").height();
        var newHeight = height + "px";
        jQuery("#sidebarMenu").css("padding-top", newHeight);

      }, 1000);
    }
  }
  else {
    $('#dandelion').removeClass('sticky-b');
    if (window.location.pathname == '/') {
      jQuery("#sidebarMenu").removeClass('sidedisplayblock');
      jQuery("#sidebarMenu").addClass('sidedisplaynone');
      jQuery(".main-homepage").removeClass('homepage-out');
    }
  }
  // if (jQuery(this).scrollTop() > 30) {
  //   console.log("in if "+document.documentElement.scrollTop);
  //   jQuery("#dandelion").addClass('sticky-b');

  //   if (window.location.pathname == '/') {
  //     jQuery("#sidebarMenu").addClass('sidedisplayblock');
  //     jQuery("#sidebarMenu").removeClass('sidedisplaynone');
  //     jQuery(".main-homepage").addClass('homepage-out');
  //     setTimeout(function () {
  //       var height = $("#dandelion").height();
  //       var newHeight = height + "px";
  //       jQuery("#sidebarMenu").css("padding-top", newHeight);

  //     }, 1000);
  //   }
  // } else {
  //   console.log("else if "+document.documentElement.scrollTop);
  //   jQuery("#dandelion").removeClass('sticky-b');

  //   if (window.location.pathname == '/') {
  //     jQuery("#sidebarMenu").removeClass('sidedisplayblock');
  //     jQuery("#sidebarMenu").addClass('sidedisplaynone');
  //     jQuery(".main-homepage").removeClass('homepage-out');
  //   }
  // }
});

jQuery(document).ready(function () {
  jQuery('.sidebar-link').click(function () {
    jQuery(".sidebar-link").removeClass('active');
    jQuery(this).addClass('active');
    var href = jQuery(this).attr('href');
    var height = $("#dandelion").height() + 10;
    jQuery('html, body').animate({
      scrollTop: jQuery(href).offset().top - height
    }, 100);
  });
  if (window.location.pathname == "/courses") {
    jQuery(".nav-item.nav-link").removeClass('active');
    jQuery("#courses").addClass('active');
  }
  if (window.location.pathname == "/news") {
    jQuery(".nav-item.nav-link").removeClass('active');
    jQuery("#news").addClass('active');
  }
  if (window.location.pathname == "/about") {
    jQuery(".nav-item.nav-link").removeClass('active');
    jQuery("#about").addClass('active');
  }
});

function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
}
