




$(document).ready(function() {
  var rat = $("#rat");

// ----------------------------- settings ---------------------------------


  $("#selectmickey").on("click", function(event){
    event.preventDefault();
    rat.attr("src","assets/TT Images/mickey.png");
    rat.attr("style", "display: block");
    $("#selectavatar").attr("style", "display: none");
  }); 

  $("#selectrat").on("click", function(event){
    event.preventDefault();
    rat.attr("src","assets/TT Images/ratatouille carrot.png");
    rat.attr("style", "display: block");
    $("#selectavatar").attr("style", "display: none");
  }); 

  $("#selectbob").on("click", function(event){
    event.preventDefault();
    rat.attr("src","assets/TT Images/spongebob.png");
    rat.attr("style", "display: block");
    $("#selectavatar").attr("style", "display: none");
  }); 

  $("#selectgustav").on("click", function(event){
    event.preventDefault();
    rat.attr("src","assets/TT Images/gustav.png");
    rat.attr("style", "display: block");
    $("#selectavatar").attr("style", "display: none");
  }); 


  // ------------------ Avatar animation ---------------------

  $("#rat").on("click", function(event){
    for (i=0; i<5; i++){
      event.preventDefault();
      event.stopPropagation();
      // rat.attr("style", "transform: rotate(360deg)");
      rat.animateRotate(2160, 5000);
      rat.animate ({
        height: (Math.random() * 200),
        top: (Math.random() * 800),
        left:  (Math.random() * 1500),
      }, 1000);
      rat.css({height:"70px"});
    }
  });

// ------------------ scroll up and down ---------------------


  // $("#collapse").on("click", function(event){
  //   event.preventDefault();
  //   $('html, body').animate({
  //     scrollTop: $("nav").offset().top
  // }, 2000);
  // });

  // $("#settings").on("click", function(event){
  //   event.preventDefault();
  //   $('html, body').animate({
  //     scrollTop: $("#fooddiv").offset().top
  // }, 2000);
  // });

 

  // ------------------ chef's superpower --------------------

  $(".chef").on("click",function(event) {
    event.preventDefault();
    event.stopPropagation();
    $(".confetti").attr("style", "display:block");

    $("#wine").css({height:"10px", left:0, top: '-10px'});
    $("#wine").animate({
      left: '+=280px',
      top: '-=300px',
      width: '60px'
    }, 500)

    $("#squid").css({height:"10px", left:0, top: '-10px'});
    $("#squid").animate({
      left: '+=210px',
      top: '-=250px',
      width: '60px'
    }, 500)

    $("#milk").css({height:"10px", left:0, top: '-10px'});
    $("#milk").animate({
      left: '+=290px',
      top: '-=200px',
      width: '60px'
    }, 500)

    $("#tomato").css({height:"10px", left:0, top: '-10px'});
    $("#tomato").animate({
      left: '+=220px',
      top: '-=150px',
      width: '60px'
    }, 500)

    $("#lettuce").css({height:"10px", left:0, top: '-10px'});
    $("#lettuce").animate({
      left: '+=290px',
      top: '-=100px',
      width: '60px'
    }, 500)

    $("#eggplant").css({height:"10px", left:0, top: '-10px'});
    $("#eggplant").animate({
      left: '+=220px',
      top: '-=50px',
      width: '60px'
    }, 500)

    $("#banana").css({height:"10px", left:0, top: '-10px'});
    $("#banana").animate({
      left: '+=290px',
      top: '-=1px',
      width: '60px'
    }, 500)
  })

  // to close chef superpower
  $(document).click(function(event){
    // event.preventDefault();
    $(".confetti").attr("style", "display: none");
  });

// -------------------- click to change placemat (background image) ----------------------


  $("#tomato").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("body").attr("style","background-image: url('assets/TT Images/italian.png')")
  });

  $("#lettuce").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("body").attr("style","background-image: url('assets/TT Images/embroidery.png')")
  });

  $("#milk").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("body").attr("style", "background-image: url('assets/TT Images/color grid 3.png')")
  });

  $("#squid").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("body").attr("style","background-image: url('assets/TT Images/kid.jpg')")
  });

  $("#banana").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("body").attr("style","background-image: url('assets/TT Images/wood.jpg')")
  });

  $("#eggplant").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("body").attr("style","background-image: url('assets/TT Images/marble.png')")
  });

  $("#wine").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("body").attr("style","background-image: url('assets/TT Images/bamboo.png')");
  });

  

  // ----------- Virtual Garden -------------

  $("#gardenbtndiv").on("click", function(event){
    event.preventDefault();
    event.stopPropagation();
    $("#whiteout").attr("style", "display: block");
  }); 

  $("#mushroom3").on("click", function(event){
    event.preventDefault();
  $("#mushroom3").animate({
    height: '+=30px',
    top: '-=30px', 
    left: '-=15px', 
  }, 500);
  }); 

  $("#mushroom4").on("click", function(event){
    event.preventDefault();
  $("#mushroom4").animate({
    height: '+=30px',
    top: '-=30px',
    left: '-=15px', 
  }, 500);
  }); 

  $("#mushroom1").on("click", function(event){
    event.preventDefault();
  $("#mushroom1").animate({
    height: '+=30px',
    top: '-=30px',
    left: '-=15px', 
  }, 500);
  }); 

  $("#mushroom2").on("click", function(event){
    event.preventDefault();
  $("#mushroom2").animate({
    height: '+=30px',
    top: '-=30px',
    left: '-=15px', 
  }, 500);
  }); 


    // to close virtual garden
    $(document).click(function(event){
      // event.preventDefault();
      $("#whiteout").attr("style", "display: none");
    });

    $("#gardendiv").click(function(event){
      event.preventDefault();
      event.stopPropagation();
    });

  
  // --------------- rotate avatar --------------------
  $.fn.animateRotate = function(angle, duration, easing, complete) {
    return this.each(function() {
      var $elem = $(this);
  
      $({deg: 0}).animate({deg: angle}, {
        duration: duration,
        easing: easing,
        step: function(now) {
          $elem.css({
             transform: 'rotate(' + now + 'deg)'
           });
        },
        complete: complete || $.noop
      });
    });
  };
  


}); 


