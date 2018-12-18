//side menu js

function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

$(".panel-collapse").on("hide.bs.collapse", function () {
  $(".panel-collapse-clickable")
    .find("i")
    .removeClass("glyphicon-chevron-up")
    .addClass("glyphicon-chevron-down");
});

$(".panel-collapse").on("show.bs.collapse", function () {
  $(".panel-collapse-clickable")
    .find("i")
    .removeClass("glyphicon-chevron-down")
    .addClass("glyphicon-chevron-up");
});

$(document).on("click", ".panel-heading", function (e) {
  var $this = $(this);
  console.log($this);
  if (!$this.hasClass("collapsed")) {
    $this
      .find("#demo span i")
      .removeClass("glyphicon glyphicon-chevron-right")
      .addClass("glyphicon glyphicon-chevron-down");
  } else {
    $this
      .find("#demo span i")
      .removeClass("glyphicon glyphicon-chevron-down")
      .addClass("glyphicon glyphicon-chevron-right");
  }
});

//dropdown menu script
$(document).ready(function () {
  $(".dropdown-submenu a.test").on("click", function (e) {
    $(this)
      .next("ul")
      .toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});

//Owl carousel script
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
        margin: 20
      }
    }
  });
});

//product count increment decrement
var incrementPlus;
var incrementMinus;

var buttonPlus = $(".cart-qty-plus");
var buttonMinus = $(".cart-qty-minus");

// var incrementPlus = buttonPlus.click(function () {
// 	var $n = $(this)
// 		.parent(".button-container")
// 		//        .parent(".container")
// 		.find(".qty");
// 	$n.val(Number($n.val()) + 1);
// });

// var incrementMinus = buttonMinus.click(function () {
// 	var $n = $(this)
// 		.parent(".button-container")
// 		//        .parent(".container")
// 		.find(".qty");
// 	var amount = Number($n.val());
// 	if (amount > 0) {
// 		$n.val(amount - 1);
// 	}
// });

//product search in list
function searchFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("brandlist");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("label")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      $("#notfound").css("display", "none");
    } else {
      li[i].style.display = "none";
      $("#notfound").css("display", "block");
    }
  }
}

function mobsearchFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("searchInputt");
  filter = input.value.toUpperCase();
  ul = document.getElementById("brandlistt");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("label")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      $("#notfoundd").css("display", "none");
    } else {
      li[i].style.display = "none";
      $("#notfoundd").css("display", "block");
    }
  }
}

//Wishlist heart button
var heart = $(".wishheart");

var addwishlist = heart.click(function () {
  var $n = $(this)
    .parent(".panel-body")
    //        .parent(".container")
    .find(".wishheart");
  $n.toggleClass("wishheartt");
});
var addwishlistt = heart.click(function () {
  var $n = $(this)
    .parent(".productviewpanel")
    //        .parent(".container")
    .find(".wishheart");
  $n.toggleClass("wishheartt");
});

//Product carousel
$("#productCarousel").carousel({
  interval: false
});
$("#productCarousel").on("touchstart", function (event) {
  var xClick = event.originalEvent.touches[0].pageX;
  $(this).one("touchmove", function (event) {
    var xMove = event.originalEvent.touches[0].pageX;
    if (Math.floor(xClick - xMove) > 5) {
      $(this).carousel("next");
    } else if (Math.floor(xClick - xMove) < -5) {
      $(this).carousel("prev");
    }
  });
  $("#productCarousel").on("touchend", function () {
    $(this).off("touchmove");
  });
});

//product detail page reviewpanel
$("#reviewbtn").click(function () {
  $(".customerreviews").hide();
  $(".writereview").show();
});
$("#closebtn").click(function () {
  $(".customerreviews").show();
  $(".writereview").hide();
});

//Wishlist heart button for mycart
var heart = $(".wishheart");

var addwishlist = heart.click(function () {
  var $n = $(this)
    .parent(".favourite")
    //        .parent(".container")
    .find(".wishheart");
  $n.toggleClass("wishheartt");
});

// Svg Background color change
$(function () {
  jQuery("img.svg").each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");

    jQuery.get(
      imgURL,
      function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find("svg");

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr("xmlns:a");

        // Check if the viewport is set, else we gonna set it if we can.
        if (
          !$svg.attr("viewBox") &&
          $svg.attr("height") &&
          $svg.attr("width")
        ) {
          $svg.attr(
            "viewBox",
            "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
          );
        }

        // Replace image with new SVG
        $img.replaceWith($svg);
      },
      "xml"
    );
  });
});

//bundle modal script
$(document).ready(function () {
  $(".lab-slide-up")
    .find("a")
    .attr("data-toggle", "modal");
  $(".lab-slide-up")
    .find("a")
    .attr("data-target", "#lab-slide-bottom-popup");
});

function showAlert() {
  $("#lab-slide-bottom-popup").modal("hide");
  $.notify({
    title: "<strong>Heads up!</strong>",
    message: "You can use any of bootstraps other alert styles as well by default."
  }, {
    type: "success"
  });
}

function alertShow() {
  $.notify({
    title: "<strong>Heads up!</strong>",
    message: "You can use any of bootstraps other alert styles as well by default."
  }, {
    type: "success"
  });
}
/**
 * Add hover effect to the main category when hovering on the subcategory
 */
$(document).ready(function () {
  var maincat_id, scat_block_id, $c;
  $(".lnt-category a").on("mouseover", function () {
    maincat_id = $(this).attr("data-root");
    $(".lnt-category a").removeClass("highlight");
  });
  $(".lnt-subcategory a").on("mouseover", function () {
    scat_block_id = $(".lnt-subcategory").parent().hasClass("active");
    if (scat_block_id == true) {
      $c = $(".lnt-category a[data-root='" + maincat_id + "']").addClass("highlight");
    }
    $('.lnt-category a.highlight').not($c).removeClass('highlight');
  });
  $(".lnt-subcategory a").on("mouseout", function () {
    $(".lnt-category a").removeClass("highlight");
  });
});

// pagetotop

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("gotoTop").style.display = "block";
  } else {
    document.getElementById("gotoTop").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  $('html, body').animate({
    scrollTop: 0
  }, 'slow');
}

$('.vc-bn-carousel').owlCarousel({
  loop: false,
  nav: true,
  items: 1,
  dots: true,
  autoplay: true
});

$('.pro-cr-1').owlCarousel({
  loop: false,
  nav: true,
  responsive: {
    0: {
      items: 1,
      nav: true
    },
    600: {
      items: 3,
      nav: false
    },
    1000: {
      items: 4,
      nav: true,
    },
    1248: {
      items: 5,
    }
  }
});

$('.pro-cr-2').owlCarousel({
  loop: false,
  nav: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 2,
      nav: true,
    },
    1000: {
      items: 3,
      nav: true,
    },
    1248: {
      items: 4,
    },
    1366: {
      items: 4,
    },
    1440: {
      items: 4,
    },
    1920: {
      items: 6
    }
  }
});

$('.pro-cr-3').owlCarousel({
  loop: false,
  nav: true,
  responsive: {
    0: {
      items: 1,
      nav: true
    },
    600: {
      items: 2,
      nav: false
    },
    1000: {
      items: 4,
      nav: true,
    },
    1248: {
      items: 6,
    }
  }
});

$('.searchnavMob').click(function () {
  $(this).toggleClass('active');

  if ($(this).hasClass('active')) {
    $('.mob-search').slideDown();
  } else {
    $('.mob-search').slideUp();
  }
});

function catResize() {
  if ($(window).height() < 1058) {
    var categoryList = $(window).height();
    $('.lnt-category').height(categoryList - 207);
    $('.lnt-subcategory').height(categoryList - 207);
  }
}

catResize();

$(window).resize(function () {
  catResize();
});

$('.input-fld').blur(function () {
  var inVal = $(this).val();
  if (inVal != "") {
    $(this).parent().addClass('filled');
  } else {
    $(this).parent().removeClass('filled');
  }
});

$('.bundle-cr').owlCarousel({
  loop: false,
  nav: true,
  margin: 15,
  responsive: {
    0: {
      items: 1,
      nav: true
    },
    600: {
      items: 1,
      nav: false
    },
    1000: {
      items: 2,
      nav: true,
    },
    1248: {
      items: 3,
    }
  }
});