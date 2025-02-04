"use strict";
import Answer from "./modules/Answer.js";
import Game from "./modules/Game.js";

//Dans le module d’entrée app.js, instantiez Game avec 5 tentatives en paramètre. 
const myGame = new Game(5);
console.log(myGame);