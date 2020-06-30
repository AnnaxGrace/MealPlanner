const user = {
    id: 1,
    name: "TT"
  }
  
  const maturities = {
    "parsley": 70,
    "basil": 50,
    "rosemary": 180,
    "cilantro": 21,
    "pepper": 60,
    "tomato": 100,
    "mushroom": 90
  }
  
  const imgs = {
    parsley: "assets/TT Images/parsley.png",
    basil: "assets/TT Images/basil.png",
    rosemary: "assets/TT Images/rosemary.png",
    cilantro: "assets/TT Images/cilantro.png",
    pepper: "assets/TT Images/pepper.png",
    tomato: "assets/TT Images/tomato1.png",
    mushroom: "assets/TT Images/mushroom.png"
  }
  
  
  function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
    event.dataTransfer.setData("Text", str);
  }
  
  function drop(event) {
    var offset = event.dataTransfer.getData("Text").split(',');
    console.log(offset)
    var dm = document.getElementById(offset[2]);
    dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    event.preventDefault();
  
    
    console.log(dm.style.left, dm.style.top);
    updatePosition(dm.style.left.replace("px", ''), dm.style.top.replace('px', ''), offset[2])
    return false;
  }
  
  function drag_over(event) {
    event.preventDefault();
    return false;
  }
  
  
  function updatePosition (left,top,id){
    console.log(left,top)
      $.ajax({
        method: "PUT",
        url: "/api/garden/location/"+id,
        data: {left,top}
      }).then(data=> console.log(data))
    }
  
  $(document).ready(function() {
  
    const date = new Date();
  console.log(date.valueOf());
  $.get("/api/user_data").then(user=>console.log(user))
    $.get('/api/all/garden').then(data=> {
      renderGarden(data)
    }).catch(err=>console.log(err))
  
  function renderGarden(garden){
    for (i=0; i<garden.length; i++) {
    console.log("days" + (date.valueOf() - garden[i].dayPlanted)/86400000);
      let daysToMature = Math.min(~~((date.valueOf() - garden[i].dayPlanted)/86400000), garden[i].maturity);
      let height = Math.max(daysToMature/garden[i].maturity * 200, 40);
      $("#plantsDiv").prepend(`<p>${garden[i].name}: ${daysToMature}/${garden[i].maturity}<p>`);
      $("#gardendiv").append(`<img id="${garden[i].id}" draggable="true" ondragstart="drag_start(event)" class="plants" src="${garden[i].img}" style="position:fixed; top:${garden[i].positionTop}px; left:${garden[i].positionLeft}px; height:${height}px">`);
  }
  }
  
  
      // to open virtual garden
      $("#gardenbtndiv").on("click", function(event){
        event.stopPropagation();
          $("#whiteout").attr("style", "display: block");
      }); 
  
      $("#addPlantBtn").on("click", function(event){
        event.stopPropagation();
        $('#plantsModal').modal({
          show: true
      });
    }); 
  
    $("#gardendiv").on("click", ".plants", function(event){
      console.log("CLICKED TO GROW!")
      event.stopPropagation();
      $(this).animate({
        height: '+=30px',
        top: '-=30px', 
        left: '-=15px', 
      }, 500);
    }); 
  
    $("#plantsModal").on("click", function(event){
      event.stopPropagation();
    }); 
  
    $("#savePlantBtn").on("click", function(event){
      event.stopPropagation();
      let newPlant = $("#plantSelector").val();
      let plantDate = $("#plantDate").val();
  
      console.log((~~((date.valueOf()-Date.parse(plantDate))/86400000)));
      console.log(imgs.newPlant);
  
      $.post("/api/garden/new/" + user.id, 
      {
        name: newPlant,
        dayPlanted: Date.parse(plantDate),
        maturity: maturities[newPlant],
        img: imgs[newPlant],
        positionTop: 200,
        positionLeft: 100
      })
        .then(function() {
          window.location.replace("/index");
          $('#plantsModal').modal({
            show: false
          });
  // add a get
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  
  
  
      // to close virtual garden
      $(document).click(function(event){
        $("#whiteout").attr("style", "display: none");
      });
  
      $("#gardendiv").click(function(event){
        event.stopPropagation();
      });
  
  })
  