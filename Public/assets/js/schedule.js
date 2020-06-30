$(document).ready( () => {


    //Calls our function that runs our initial necessary buttons and meals
    startMeal();

    async function startMeal() {
        let id;

        //get user's teamId
        await $.get("/api/user_data").then((data) => {
            const thisId = data.id
            $.get("/api/users/id/" + thisId).then( results => {
                id = results[0].TeamId

                //Calls our functions to render our meals with necessary parameters
                renderScheduleMeals("Monday", "Breakfast", id);
                renderScheduleMeals("Monday", "Lunch", id);
                renderScheduleMeals("Monday", "Dinner", id);

                renderScheduleMeals("Tuesday", "Breakfast", id);
                renderScheduleMeals("Tuesday", "Lunch", id);
                renderScheduleMeals("Tuesday", "Dinner", id);

                renderScheduleMeals("Wednesday", "Breakfast", id);
                renderScheduleMeals("Wednesday", "Lunch", id);
                renderScheduleMeals("Wednesday", "Dinner", id);

                renderScheduleMeals("Thursday", "Breakfast", id);
                renderScheduleMeals("Thursday", "Lunch", id);
                renderScheduleMeals("Thursday", "Dinner", id);

                renderScheduleMeals("Friday", "Breakfast", id);
                renderScheduleMeals("Friday", "Lunch", id);
                renderScheduleMeals("Friday", "Dinner", id);

                renderScheduleMeals("Saturday", "Breakfast", id);
                renderScheduleMeals("Saturday", "Lunch", id);
                renderScheduleMeals("Saturday", "Dinner", id);

                renderScheduleMeals("Sunday", "Breakfast", id);
                renderScheduleMeals("Sunday", "Lunch", id);
                renderScheduleMeals("Sunday", "Dinner", id);
           
            });
        });
    }



    const renderScheduleMeals = (day, time, id) => {
        $("." + day + "-" + time).empty();
        //Gets all meals for this day and time in this team
        $.get("/api/meal/" + day + "/" + time + "/" + id).then( data => {

            for (i = 0; i < data.length; i++) {

                //Creates our divs and buttons and then appends them to the page

                let newDiv = $("<div></div>").addClass("more-space")
                let pText = $("<p></p>").text(data[i].recipeTitle)
                pText.addClass("get-together")
                
                
                let deleteButton = $("<button></button>");
                let viewButton = $("<button></button>");
                
                deleteButton.text("delete");
                deleteButton.addClass("delete-button btn btn-primary ingredBtn button-space");

                viewButton.text("View Recipe");
                viewButton.addClass("view-button btn btn-primary ingredBtn");

                viewButton.attr("value", data[i].id);
                deleteButton.attr("value", data[i].id);   

                newDiv.append(pText);
                newDiv.append(viewButton);
                newDiv.append(deleteButton);
            
                $("." + day + "-" + time).append(newDiv);
                    
            }
        });

    }

    //This renders our meal to our view meal column
    const  renderViewMeal = data => {
        
        let ingredients = JSON.parse(data[0].recipeIngredients);
        let instructions = JSON.parse(data[0].recipeInstructions);
        listIngredients(ingredients);
        listInstructions(instructions[0].steps);
        $(".meal-text").html("&nbsp;" + data[0].recipeTitle);
        $(".chef-name").text("Chef: " + data[0].mealChef);
    
    }
    
    //This puts our list of ingredients in an unordered list
    const listIngredients = takenList => {
        let ingredsP = $("<p>");
        
        let newUL = $("<ul>");
        for (i = 0; i < takenList.length; i++) {
            let newListItem = $("<li>").text(takenList[i]);
            newUL.append(newListItem);
        }
        ingredsP.append(newUL);
        $(".ingredients-list").html(ingredsP);
    };

    //This puts our list of instructions in an ordered list
    const listInstructions = takenList => {
        let instructP = $("<p>");
        let newOL = $("<ol>");
        
        for (i = 0; i < takenList.length; i++) {
            let newListItem = $("<li>").text(takenList[i]);
            newOL.append(newListItem);
        }
        instructP.append(newOL);
        $(".instructions-list").html(instructP)
    };

    //When a specific view button is clicked on, render that meal's information
    $(document).on("click", ".view-button", function(event) {
        
        let user = this.value
        
        $.get("/api/meal/schedule/" + user).then( data => {
            renderViewMeal(data);
        })
    });

    //When a specific delete button is clicked, delete that Id
    $(document).on("click", ".delete-button", function(event) {
        
        let user = this.value
        
        $.ajax({
            type: "DELETE",
            url: "/api/meal/" + user
          }).then(function() {
              console.log("deleted meal" + user);
              startMeal()
            }
          );
        
    });

   

});