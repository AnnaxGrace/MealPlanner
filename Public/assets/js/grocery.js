$(document).ready(function() {
     
    let id;

    renderList();

    async function renderList() {
        
        //Gets the TeamId to grab from our grocery model
        await $.get("/api/user_data").then( data => {
            let thisId = data.id
            $.get("/api/users/id/" + thisId).then( results => {
                id = results[0].TeamId

                //calls all of the grocery items in our grocery model
                $.get("/api/grocery/" + id).then( data => {
                
                    $("#listContainer").html("");
                    for (i = 0; i < data.length; i++) {
                        //Creates the grocery list item, with its checkmark and delete button
                        $("#listContainer").prepend(`<div class="row mt-1 mb-1"><input type="checkbox" class="ml-3 mr-3 checkbox">
                    <label for="vehicle3"><h3 class="grocery-list">${data[i].listItem}</h3></label><div class="row full"> <div class="col-12">
                    <button id="someString2" value="${data[i].id}" class="ml-3 btn btn-danger btn-sm delete">Delete</button></div></div></div>`)
                    
                    }
                });

            });
        });
    
       

    }


    //When the Clear list button is clicked, delete all items from the grocery model
    //And then calls the renderList function
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
  
    //Submit a new grocery list by form
    //Runs the create and get function to add to table and create list
    $("#submitGrocery").on('click', function(){
        let grocery = $("#groceryInput").val().trim();
        if(grocery){
        
            createAndGet(grocery);
        } 
      
    });

    //Function adds the new item to the grocery model and runs renderList
    const createAndGet = newItem => {
        
        $.post("/api/grocery", {
            listItem: newItem,
            TeamId: id,
        }).then( () => {
            console.log("new item added");
            renderList();
        });
    }
    
    //When the delete button is clicked, remove the item from the grocery table and then render the updated model
    $(document).on("click", ".delete", function() {
        
         let user = this.value

         $.ajax({
            type: "DELETE",
            url: "/api/grocery/" + user
          }).then(function() {
              console.log("deleted itm" + user);
              renderList();
            }
          );
             
    })

    //When we click on our button to get our list from our created recipes
    $("#meal-list").on("click", function() {
        
        //Grabs each meal that a team has to grab the ingredients
        $.get("/api/meal/" + id, (data) => { 
            for (i = 0; i < data.length; i++) {
                let ingredients = JSON.parse(data[i].recipeIngredients); 
                listIngredients(ingredients)
            }
        })
    })

    //Takes the ingredients list from our grabbed recipes
    function listIngredients(takenList) {
        
        //Create a new list for each ingredient
        for (j = 0; j < takenList.length; j++) {
            createAndGet(takenList[j]);
        }
    };
    
});

