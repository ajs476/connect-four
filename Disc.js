/*
* Created by Alexander Sears on 4/26/2017
*
* Disc is the game-piece that players drop into the board in connect-four
* A disk simply holds a color, usually red or yellow
*
*/

class Disc{
	constructor(color){
		this.color = color;
	}
	// getColor() simply returns the color of the current disc
	getColor(){
		return this.color;
	}
}

module.exports = Disc;
