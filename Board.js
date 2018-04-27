/*
* Created by Alexander Sears on 4/26/2017
*
* Board is quite literally the connect-four board. The standard board is 6x7 in dimension and is reflected in the code below.
* An empty cell in the board is represented by 3 spaces. A filled cell contains a string representing the color of the disc within.
*
*/

class Board{
  // create the boardArray, which is an Array holding 6 other arrays.
  constructor(){
    let boardRow1 = ["   ","   ","   ","   ","   ","   ","   "],
        boardRow2 = ["   ","   ","   ","   ","   ","   ","   "],
        boardRow3 = ["   ","   ","   ","   ","   ","   ","   "],
        boardRow4 = ["   ","   ","   ","   ","   ","   ","   "],
        boardRow5 = ["   ","   ","   ","   ","   ","   ","   "],
        boardRow6 = ["   ","   ","   ","   ","   ","   ","   "];
    let boardArray = [boardRow1, boardRow2, boardRow3, boardRow4, boardRow5, boardRow6];
    this.boardArray = boardArray;
  }

  // resetBoard() resets the contents of boardArray to empty arrays
  resetBoard(){
    for(let i=0; i<this.boardArray.length; i++){
      this.boardArray[i] = ["   ","   ","   ","   ","   ","   ","   "];
    }
  }

  // checkWin() takes a disc color(string), a row(int), and a col(int) that will be used to check surrounding discs to see if a player has won the game
  // checkWin() will check the left, right, below, and in the diagonal directions for similar colored discs
  // if a player wins by having 4 similar-colored discs in any of the checked directions, checkWin() returns true and a message is logged in the console
  checkWin(color, row, col){
    let rightScore = 0;
    let downScore = 0;
    let leftScore = 0;
    let diagLeftDownScore = 0;
    let diagLeftUpScore = 0;
    let diagRightUpScore = 0;
    let diagRightDownScore = 0;
    let rowNum = row;
    let colNum = col;
    // begin checking the discs below THIS disc for similar colored discs
    rowNum = row;
    while(rowNum+1 < this.boardArray.length){
      if(this.boardArray[rowNum+1][col] != color){
        break;
      }else{
        downScore++;
      }
      rowNum++;
    }
    // begin checking the discs to the right of THIS disc for similar colored discs
    colNum = col;
    while(colNum+1 < 6){
      if(this.boardArray[row][colNum+1] != color){
        break;
      }else{
        rightScore++;
      }
      colNum++;
    }
    // check for the same colored discs to the left
    colNum = col;
    while(colNum-1 >= 0){
      if(this.boardArray[row][colNum-1] != color){
        break;
      }else{
        leftScore++;
      }
      colNum--;
    }
    // check for the same colored discs in the diagonal-left-down direction
    colNum = col;
    rowNum = row;
    while(colNum-1 >= 0 && rowNum+1 < 6){
      if(this.boardArray[rowNum+1][colNum-1] != color){
        break;
      }else{
        diagLeftDownScore++;
      }
      colNum--;
      rowNum++;
    }
    // check for the same colored discs in the diagonal-left-up direction
    colNum = col;
    rowNum = row;
    while(colNum-1 >= 0 && rowNum-1 >= 0){
      if(this.boardArray[rowNum-1][colNum-1] != color){
        break;
      }else{
        diagLeftUpScore++;
      }
      colNum--;
      rowNum--;
    }
    // check for the same colored discs in the diagonal-right-up direction
    colNum = col;
    rowNum = row;
    while(colNum+1 < 6 && rowNum-1 >= 0){
      if(this.boardArray[rowNum-1][colNum+1] != color){
        break;
      }else{
        diagRightUpScore++;
      }
      colNum++;
      rowNum--;
    }
    // check for the same colored discs in the diagonal-right-down direction
    colNum = col;
    rowNum = row;
    while(colNum+1 < 6 && rowNum+1 < 6){
      if(this.boardArray[rowNum+1][colNum+1] != color){
        break;
      }else{
        diagRightDownScore++;
      }
      colNum++;
      rowNum++;
    }
    // return true if there is a winner, the current game is over
    if(downScore >= 3 || diagRightDownScore >= 3 || rightScore >= 3 || diagRightUpScore >= 3 || diagLeftUpScore >= 3 || leftScore >= 3 || diagLeftDownScore >= 3){
      console.log("Game Over. "+color+" wins!");
      return true;
    }
  }

  // dropDisc() takes a column(int) and a disc(Disc object)
  // dropDisc() places the passed Disc object in the passed column
  dropDisc(column, disc){
    // check if the given column is valid
    if(column > 7 || column < 1){
      console.log("Invalid column. Enter a column value 1 to 7")
      return;
    }else{
      // the passed column is valid, so grab that column
      let index = column-1;
      let selectedColumn = [];
      for(let i=0; i<6; i++){
        selectedColumn[i] = this.boardArray[i][index];
      }
      let lastEmptyIndex = 0;
      // loop through the grabbed column and find the last open index that the disc will fall to
      while(lastEmptyIndex<selectedColumn.length && selectedColumn[lastEmptyIndex] == "   "){
        lastEmptyIndex++;
      }
      lastEmptyIndex--;
      // check to see if the disc will actually fall at all
      if(lastEmptyIndex < 0){
        // the disc will not fall into the column, becuase it is full of discs
        console.log("Invalid column. Column is full...");
        return;
      }else{
        // the disc will fall, so put it in the correct cell in the column
        console.log("Dropped a "+disc.getColor()+ " disc at: [Row: "+lastEmptyIndex+" Col: "+index+"]");
        this.boardArray[lastEmptyIndex][index] = disc.getColor();
      }
      return this.checkWin(this.boardArray[lastEmptyIndex][index], lastEmptyIndex, index); // this will return true if the last dropped disc causes a win for a player
    }
  }

  // displayBoard() loop through the board and print out the rows to the console
  displayBoard(){
    for(let i=0; i<this.boardArray.length; i++){
      console.log(this.boardArray[i]);
    }
  }
}

module.exports = Board;
