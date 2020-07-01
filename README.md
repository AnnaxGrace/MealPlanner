



[![made-with-VSCode](https://img.shields.io/badge/Made%20with-VSCode-1f425f.svg)](https://code.visualstudio.com/)
# CookingTogether

<img src="Public/assets/TT Images/Meal Planner.png"
     alt="Log-in Page"
     style="margin-right: 10px; height: 300px;" />


## Description
The mental load is an issue that is gaining attention all over the world. It's the mental management of chores and it is it's own chore in and of itself. Our meal-planning website knows that households want to cook and plan together. CookingTogether is a one-stop for meal-planning as a household, and it helps to divide the mental load - and it even takes care of some of it on its own, such as keeping track of the schedule, and dietary restrictions.
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Pitch](#pitch)
* [Contributing](#contributing)
* [Links](#Links)
* [Tenchnologies](#Technologies)
* [Icebox](#Icebox)
* [Developers](#Developers)

## Installation
npm i
## Usage
You run this application in terminal or bash with server.js locally with 8080 in conjunction with MySql.

* DROP DATABASE IF EXISTS mealplanner_db;
* CREATE DATABASE mealplanner_db;
* USE mealplanner_db;

 It is run not locally with heroku.

 NOTE: Photos are uploaded with AWS, you will not have access locally, as AWS keys are saved in .env file for security purposes.

## License
MIT

## Contributing
No contributors allowed.

## Pitch

Click to Watch!

<a href = "https://youtu.be/EL-TKikd8Dk/" target= "_blank">
<img alt="Image of Homepage" style ="height: 300px;" src = "Public/assets/TT Images/PancakesHomepage.PNG"> 
</a>

## Links
* GitHub repository URL: https://github.com/annaxgrace/MealPlanner
* Heroku deployed URL: https://cooking-together.herokuapp.com/

## Technologies

### API
* Recipe Puppy: http://www.recipepuppy.com/
     - Searches the web based on type of meal you want and returns URLs
* MyCookBook: https://rapidapi.com/mycookbook/api/mycookbook-io1
     - Takes the necessary recipe information from the URL page and returns it in object form

### Languages 
* HTML, CSS, JavaScript, Node.js

### FrameWorks
* Bootstrap, Express

### Dependencies
* passport
     - Authentication so we can log in/store users safely
* express-fileupload
     - Allows our data to be updated to formData, so it can be uploaded
* aws-sdk
     - Gives us access to our s3 images bucket
* bcryptjs
     - Encrypts our passwords for security
* bs-custom-file-input
     - Allows bootstrap to grab files from client
* express-session
     - Allows us to use cookies
* mysql2
     - allows us to connect to a MySql database
* sequelize
     - ORM for sequelize for efficiency
* nodemailer
     - Sends our email for us


## Icebox

* Ability to save recipes as favorites
* Ability for a user to have multiple teams
* Add a default image in case a user does not want to add an image
* Upload images in tablets and phones from images apps
* Ability to update your dietary restrictions and photo from Table page
* User chooses what time each "meal time" is - right now breakfast ends at 9:00 and lunch ends at 15:00
* Garden also keeps track of when to water your plants
* The user has the ability to remove themself from a team


## Developers

### Anna Conover

<img src="Public/assets/TT Images/annachef.png"
     alt="Picture of Developer Anna"
     style="margin-right: 10px; height: 200px;" />

* Github username: annaxgrace
* Email: anna.grace.conover@gmail.com
* GitHub Profile URL: https://github.com/AnnaxGrace



### Tingting Chen

<img src="Public/assets/TT Images/ttchef.png"
     alt="Picture of Developer TingTing"
     style="margin-right: 10px; height: 200px;" />

* Github username: tingtingctt
* Email: tingtingctt@gmail.com
* GitHub Profile URL: https://github.com/tingtingctt



### Joe Mastropieri

<img src="Public/assets/TT Images/joechef.png"
     alt="Picture of Developer Joe"
     style="margin-right: 10px; height: 200px;" />

* Github username: jcmastropieri
* Email: jcmastro5@gmail.com
* GitHub Profile URL: https://github.com/jcmastropieri




### Oleksandr Prykotenko

<img src="Public/assets/TT Images/alexchef.png"
     alt="Picture of Developer Oleksandr"
     style=" margin-right: 10px; height: 200px;" />

* Github username: prikat
* Email: aprykotenko@gmail.com
* GitHub Profile URL: https://github.com/prikat



