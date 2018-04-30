/*
* Created by Alexander Sears on 4/26/2017
*
* Main/driver class for connect-four game
* This file uses node.js modules to group multiple js classes together, so node will be required to run this successfully
* I'm really only leveraging the modules-feature that node.js offers in order to use multiple classes together (in a Java-style manner)
*
*/


// var http = require('http');
var Disc = require('./Disc.js');
var Board = require('./Board.js');
const readline = require('readline');

// create the readline interface so we can take user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// initialize our game objects
// create a red disc
let redDisc = new Disc("red");
// create a yellow disc
let yellowDisc = new Disc("yel");
// create the game board
let gameBoard = new Board();

// keep track of the game-state with boolean gameOver
let gameOver = false;
// keep track of whos turn it is with boolean redTurn
let redTurn = true;
var currentTurn = "RED";
var matchWinner = "";


// ask the user if they want to play connect-four
var askToPlayGame = function () {
    // ask the question
    rl.question("Play Connect-Four? (Y/N)\n"
        , function (line) {
            // uppercase the user's input so we can easily check what they said
            switch(line.toUpperCase()){
              case "Y":
                // the user said yes, reset the board and begin asking for their moves
                gameBoard.resetBoard();
                takeDiscDropLocation();
                break;
              case "N":
                // the user said no, cry a little bit
                console.log(":(");
                break;
              default:
                // the user didn't follow simple instructions...
                console.log("Invalid choice. Please enter (Y/N)");
                askToPlayGame();
                break;
            }
    });
};

// prompt user to play connect-four
askToPlayGame();

// continually as the user where they would like to drop the next disc on their turn
var takeDiscDropLocation = function () {
  // display the game board in the console
  gameBoard.displayBoard();
  // ask the user for a column value to drop their piece into
  rl.question("Current Turn: "+ currentTurn + " \nEnter a Column to drop your disc (1-7)\n"
        , function (colVal) {
            if(isNaN(colVal) || Number(colVal) < 1 || Number(colVal) > 7){
              console.log("Invalid column value: "+Number(colVal)+". Enter a value 1 to 7.");
            }else{
              // if it's reds turn, place a red disc and change it to yellows turn
              if(redTurn){
                gameOver = gameBoard.dropDisc(colVal,redDisc);
                if(gameOver != "FULL"){
                  redTurn = false;
                  currentTurn = "YELLOW";
                }else{
                  gameOver = false
                }

              // if it's not reds turn, it's yellows turn
              // remember to reset the next turn to reds
              }else{
                gameOver = gameBoard.dropDisc(colVal,yellowDisc);
                if(gameOver != "FULL"){
                  redTurn = true;
                  currentTurn = "RED";
                }else{
                  gameOver = false;
                }
              }
            }

    // if the game isn't over yet, we will keep taking discs
    if(!gameOver){
      takeDiscDropLocation(); //Calling this function again to ask new question
    }else{
      // the game is over
      switch (currentTurn) {
        case "RED":
          matchWinner = "YELLOW";
          break;
        case "YELLOW":
          matchWinner = "RED";
          break;
        default:

      }
      if(gameOver == "DRAW"){
        console.log("GAME OVER! DRAW!");
      }else{
        console.log("GAME OVER! "+matchWinner+ " WON THE MATCH!");
      }

      // display the winning board layout, and ask if the user wants to play again
      gameBoard.displayBoard();
      askToPlayGame();
    }
    });
};

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
// }).listen(8080);
