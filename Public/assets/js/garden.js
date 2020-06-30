
    // let id;
    // const date = new Date();
    // const addedPlant = $("#plant-added")

    //Tells us when the plants need to be harvested
    const maturities = {
        "parsley": 70,
        "basil": 50,
        "rosemary": 180,
        "cilantro": 21,
        "pepper": 60,
        "tomato": 100,
        "mushroom": 90
    }

    //Grabs our images for each of our plants
    const imgs = {
        parsley: "assets/TT Images/parsley.png",
        basil: "assets/TT Images/basil.png",
        rosemary: "assets/TT Images/rosemary.png",
        cilantro: "assets/TT Images/cilantro.png",
        pepper: "assets/TT Images/pepper.png",
        tomato: "assets/TT Images/tomato1.png",
        mushroom: "assets/TT Images/mushroom.png"
      }

    //gets the current user's id
    
// const user = {
//     id: 1,
//     name: "TT"
//   }
  
  //Tells us when the plants need to be harvested
//   const maturities = {
//     "parsley": 70,
//     "basil": 50,
//     "rosemary": 180,
//     "cilantro": 21,
//     "pepper": 60,
//     "tomato": 100,
//     "mushroom": 90
//   }
  
//   const imgs = {
//     parsley: "assets/TT Images/parsley.png",
//     basil: "assets/TT Images/basil.png",
//     rosemary: "assets/TT Images/rosemary.png",
//     cilantro: "assets/TT Images/cilantro.png",
//     pepper: "assets/TT Images/pepper.png",
//     tomato: "assets/TT Images/tomato1.png",
//     mushroom: "assets/TT Images/mushroom.png"
//   }
  
  //Allows our image to be moved by grabbing it by our mouse
  function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    console.log(event.target.id)
    var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
    event.dataTransfer.setData("Text", str);
  }
  
  //Sets our image's position when it is let go of
  function drop(event) {
    var offset = event.dataTransfer.getData("Text").split(',');
    // console.log(offset)
    var dm = document.getElementById(offset[2]);
    dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    event.preventDefault();
  
    updatePosition(dm.style.left.replace("px", ''), dm.style.top.replace('px', ''), offset[2])
    return false;
  }
  
  //Allows the plant to be moved without issue, called in HTML
  function drag_over(event) {
    event.preventDefault();
    return false;
  }
  
  //This function updates our garden model
  function updatePosition (left,top,id){
    console.log(left,top)
      $.ajax({
        method: "PUT",
        url: "/api/garden/location/"+id,
        data: {left,top}
      }).then(data=> console.log(data))
    }
  
  
    
  
    // const date = new Date();
//   console.log(date.valueOf());
//   $.get("/api/user_data").then(user=>console.log(user))
$(document).ready(function() {

    let id;
    const date = new Date();
    const addedPlant = $("#plant-added")

    $.get("/api/user_data").then( data => {
        thisId = data.id
    
        //Then we use the variable to get the teamid from the user
        //And then stores the teamid in id
        $.get("/api/users/id/" + thisId).then( results => {
            id = results[0].TeamId
            renderMatureDays();
        });
    });

    //This grabs all the plants in the user's team
    function renderMatureDays() {
        $.get('/api/all/team/' + id).then(data=> {
            console.log("hi")
            renderGarden(data)
        }).catch(err=>console.log(err))
    };
  
    function renderGarden(garden){
        $("#plantsDiv").html("");
            $("#newPlants").html("");
        for (i=0; i<garden.length; i++) {
            console.log("bye")
            // console.log("days" + (date.valueOf() - garden[i].dayPlanted)/86400000);
            let daysToMature = Math.min(~~((date.valueOf() - garden[i].dayPlanted)/86400000), garden[i].maturity);
            let height = Math.max(daysToMature/garden[i].maturity * 200, 40);
            $("#plantsDiv").prepend(`<p>${garden[i].name}: ${daysToMature}/${garden[i].maturity}<p>`);
            $("#newPlants").append(`<img id="${garden[i].id}" draggable="true" ondragstart="drag_start(event)" class="plants" src="${garden[i].img}" style="position:fixed; top:${garden[i].positionTop}px; left:${garden[i].positionLeft}px; height:${height}px">`);
        }
    } 
    
  
  
    // to open virtual garden
    $("#gardenbtndiv").on("click", function(event){
        event.stopPropagation();
        $("#whiteout").attr("style", "display: block");
    }); 
  
    //Opens the plant modal
    $("#addPlantBtn").on("click", function(event){
        event.stopPropagation();
        $('#plantsModal').modal({
          show: true
        });
    }); 
  
    //When you click on the plants, they grow
    $("#gardendiv").on("click", ".plants", function(event){
      console.log("CLICKED TO GROW!")
      event.stopPropagation();
      $(this).animate({
        height: '+=30px',
        top: '-=30px', 
        left: '-=15px', 
      }, 500);
    }); 
  
    //Stops the modal from reacting to inside functions
    $("#plantsModal").on("click", function(event){
      event.stopPropagation();
    }); 
  
    //When the save button is clicked on
    $("#savePlantBtn").on("click", function(event){
      event.stopPropagation();
      let newPlant = $("#plantSelector").val();
      let plantDate = $("#plantDate").val();
  
    //   console.log((~~((date.valueOf()-Date.parse(plantDate))/86400000)));
    //   console.log(imgs.newPlant);
  
      $.post("/api/garden/new", 
      {
        name: newPlant,
        dayPlanted: Date.parse(plantDate),
        maturity: maturities[newPlant],
        img: imgs[newPlant],
        positionTop: 200,
        positionLeft: 100,
        TeamId: id
      })
        .then(function() {
            renderMatureDays();
            showMessage(addedPlant);

        //   window.location.replace("/index");
        //   $('#plantsModal').modal({
        //     show: false
        //   });
  // add a get
        })
        .catch(function(err) {
          console.log(err);
        });
    });

     //Function that shows a message that your message has sent
     const showMessage = (added) => {
        added.attr("style", "color: black");
        setTimeout(function(){
            added.attr("style", "color: white");
        }, 3000);
    }
  
  
  
      // to close virtual garden
      $(document).click(function(event){
        $("#whiteout").attr("style", "display: none");
      });
  
      $("#gardendiv").click(function(event){
        event.stopPropagation();
      });
  
  })
  