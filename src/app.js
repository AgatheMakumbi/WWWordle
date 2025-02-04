"use strict";
import Answer from "./modules/Answer.js";
import Game from "./modules/Game.js";


//Dans le module d’entrée app.js, instantiez Game avec 5 tentatives en paramètre. 
//Créer et initialiser le jeu avec un nombre déterminé de tentatives.
const myGame = new Game(5);
console.log(myGame);

//Assurer la mise en place de la partie dès le chargement de la page.
const pageLoad = async () => {
    
    myGame.startTentative();
  };
  
  pageLoad();