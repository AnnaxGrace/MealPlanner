$(document).ready(() =>  {  

    //Grab our input from our table/team name form
    const teamInput = $("#teamname-input");
    const sent = $("#sent-message");

    //define necessary global variables
    let thisId;
    let indexNum;

    let teams = [];

    //grabs the id of the current user
    $.get("/api/user_data", function(data) {

        thisId = data.id
        
        
    });

    
   
    //when the table form button is click on
    $(".signup").on("submit", function(event) {
        event.preventDefault();

        //Creates a random key for the team, that will be used for our activation link
        const arrayKey = []
        for (i = 0; i < 10; i ++) {
            let randomKey = Math.floor(Math.random() * 10);
            arrayKey.push(randomKey)
        }
        const finalKey = arrayKey.join("");
        
    

        const newTeam = {
            newUsername: teamInput.val().trim(),
            key: finalKey
        }

        
        makeNewTeam();

        async function makeNewTeam () {
            
            //API call to create a new team
            await $.post("/api/team", {
                username: newTeam.newUsername,
                key: newTeam.key,
            }).then( () => {
                console.log("new team added");
            });

            //then puts the data in an array, and grabs the team just created
            await $.get("/api/team", function(data) {
                teams = data;
                indexNum = (teams.length -1 )
            })

            //Then updates the current user's teamId to the teamId just created
            $.ajax({
                method: "PUT",
                url: "/api/users/" + thisId,
                data: {
                    TeamId: teams[indexNum].id
                }
            }).then( () => {
                console.log("id updated")
            })

        }
        
    })
   
 
    //When the send button in the modal is clicked
    $("#send-btn").on("click", function (event) {

        event.preventDefault();

        
        const emailForm = $("#team-email").val().trim();
        
        //Grabs the email inputted and the key of our current team
        //and send it to our nodemail email
        const nodemail = {
            email: emailForm,
            key: teams[indexNum].key
        }
        
        $.post("/email", nodemail, function() {
            console.log("Server received our data");
        });

        //clears the email value so another email can be sent
        //gives text to let the user know it worked
        //Changes the text on the button that redirects to the home page
        $("#team-email").val("");
        showMessage(sent);
        $("#later-btn").text("I'm done adding!")

        
    });

    //If the "I'll add later" or "I'm done adding" button is clicked
    //Redirect to members
    $("#later-btn").on("click", function() {
        window.location.replace("/members");
    })

    //Function that shows a message that your message has sent
    const showMessage = (sent) => {
        sent.attr("style", "color: black");
        setTimeout(function(){
            sent.attr("style", "color: white");
        }, 3000);
    }

});