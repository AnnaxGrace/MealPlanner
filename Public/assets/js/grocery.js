$(document).ready(function() {
     
    let id;

    renderList();

    async function renderList() {
        console.log("broken here?")
        await $.get("/api/user_data").then( data => {
            let thisId = data.id
            $.get("/api/users/id/" + thisId).then( results => {
                id = results[0].TeamId

                $.get("/api/grocery/" + id).then( data => {
                    console.log(data);
                    $("#listContainer").html("");
                    for (i = 0; i < data.length; i++) {
                        $("#listContainer").prepend(`<div class="row mt-1 mb-1"><input type="checkbox" class="ml-3 mr-3 checkbox">
                    <label for="vehicle3"><h3 class="grocery-list">${data[i].listItem}</h3></label><button id="someString" class="btn btn-success ml-29 btn-sm complete">Complete</button>
                    <button id="someString2" value="${data[i].id}" class="ml-3 btn btn-danger btn-sm delete">Delete</button></div>`)
                    
                    }
                });

            });
        });
    
       

    }


    $(".clear").on("click", function(){
        $.ajax({
            type: "DELETE",
            url: "/api/grocery/clear/" + id
          }).then(function() {
              console.log("deleted all");
              renderList();
            }
          );
    })
  

    $("#submitGrocery").on('click', function(){
        let grocery = $("#groceryInput").val().trim();
        if(grocery){
        //      $("#listContainer").prepend(`<div class="row mt-1 mb-1"><input type="checkbox" class="ml-3 mr-3 checkbox">
        // <label for="vehicle3"><h3 class="grocery-list">${grocery}</h3></label><button id="someString" class="btn btn-success ml-29 btn-sm complete">Complete</button>
        // <button id="someString2" class="ml-3 btn btn-danger btn-sm delete">Delete</button></div>`)
        
        createAndGet(grocery);
        } 
      
    });

    const createAndGet = newItem => {
        
        $.post("/api/grocery", {
            listItem: newItem,
            TeamId: id,
        }).then( () => {
            console.log("new item added");
            renderList();
        });
    }
    
    $(document).on("click", ".complete", function() {
        var $grocerylist = $(this).siblings().children()
        $grocerylist.addClass("line-over")
    })
    
    $(document).on("click", ".delete", function() {
        var $grocerylist = $(this).siblings().children()    
         $grocerylist.parent().parent().remove();
         

         let user = this.value

         $.ajax({
            type: "DELETE",
            url: "/api/grocery/" + user
          }).then(function() {
              console.log("deleted itm" + user);
            }
          );
             
    })

    $("#meal-list").on("click", function() {
        
        $.get("/api/meal/" + id, (data) => { 
            for (i = 0; i < data.length; i++) {
                let ingredients = JSON.parse(data[i].recipeIngredients); 
                listIngredients(ingredients)
            }
        })
    })

    function listIngredients(takenList) {
        
        for (j = 0; j < takenList.length; j++) {
            createAndGet(takenList[j]);
        }
    };
    
});

