# Status Report #3

## Issues
* We decided to not create user logins, but to instead just have users add a username to the global leaderboard once they achieve a high score
* After experimenting with Drag and Drop in HTML5 and the Google Maps API to create our game, we decide to switch to Phaser.io to create the game engine
* We were originally planning on having the game play over the a Google Map of the user's location but decided against that (may use Geolocation to change the background of the game)
* We thought there was a problem with our web app on Heroku, but there was a error in the index.html page preventing the app from loading.

## Accomplished
* Added the leaderboard route to server.js (gets the top 5 scores from the Mongo Database)
* Created a highscore html page (just in template form at the moment, will be update with information from the database)
* Gameplay.html is the start of the game using animals as markers, however, this is probably gonna get scrapped
* Created the homepage that asks for a username and starts the game
* Decided how the game will work. There will be a bucket of twigs in one corner of the screen and animals will spawn in at a random location on the screen. The faster you drag the twigs to the animals, the more points you get for the animal. The animals start crying after being on the screen for more than 2 seconds.

## Goals
* Create the game using Phaser.io
* Add the soundcloud API to have music playing in the background of the game
* Use geolocation to determine the closest geographical background (Fenway for Boston, Times Square for New York, etc).

# Comments By Ming
* "* Add the soundcloud API to have music playing in the background of the game" => why? https://phaser.io/examples/v2/audio/sound-complete.  The doc: https://phaser.io/docs/2.3.0/Phaser.Sound.html
