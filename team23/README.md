# Loud Farm

## Problem statement 
There's a bunch of screaming animals, and they get louder and louder unless they are fed. The noises of the animals play over a chosen background song playlist selected by the user. Each playlist is roughly the same duration, but the music is of a difference genre. The goal is to quiet down the animals so you can hear the music, gaining points for each animal quieted. The game ends if the farm gets too loud (lose). High scores are stored in the database to compare high scores globally. 

## How do you solve the problem? 
The player has to collect tree branches to give the animals to gnaw on to quiet them down. The round ends when all the animals have stopped screaming. Each animal quieted gives 10 points, and users try to achieve the max score without losing.

## List of all the features 
* Front End Framework
    * Bootstrap will be used for the HTML, CSS, and Javascript for the webpages, allowing for both desktop and mobile versions depending on viewport size
* Restful API
    * We will be using Soundcloud to play the music playlists and animal sounds.
* Server-Side Data Persistance
    * We will be using Node.js to run the web server that hosts the game
    * We will be using MongoDB for data persistence to score high scores and usernames to create a global leaderboard

## Data usage and collection
* Program will prompt the user for a user name
* Each score will be saved in the database
* This data will be stored in a global leaderboar

## Algorithms and Special Techniques
* Drag and drop using HTML5 or a Javascript game engine like Phaser.io

## Mockups

![Mockup 1](Mockups/mockup1.png?raw=true "Markup1")
![Mockup 2](Mockups/mockup2.png?raw=true "Markup2")

# Comments by Ming
* This proposal is painful to read.  The game idea is fun but for what will you be using server-side for?  What will a RESTful API be used for?  Need more specifity.  Drag-and-drop is now available for HTML5.  How will you generate animal noises?  How do you tone down animal noises?  This need to be more thought out.
