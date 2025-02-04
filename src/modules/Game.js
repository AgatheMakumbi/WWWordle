"use strict";
import Answer from "./Answer.js";

//Rôle : Piloter la progression de la partie et gérer l’ensemble des tentatives.

class Game {
    #tentatives = [];
    #activeTentative = 0;
    constructor(nbTentatives) {
        this.#tentatives = this.generateTentatives(nbTentatives);
        //Au moment de l’instanciation de Game, il est important de changer l’activation de la première tentative
        
    };

    startTentative(){
        if(this.#activeTentative < this.#tentatives.length){
            this.#tentatives[this.#activeTentative].toggleState();
            this.#tentatives[this.#activeTentative].sendAnswer();
            this.nextTentative();
        }
    }
    //Générer un tableau de tentatives
    generateTentatives(nbTentatives) {
        //Pour chacune de ces tentatives, créez une instance de Answer et stockez ces instances dans un tableau.
        
        for (let i = 0; i < nbTentatives; i++) {
            const answer = new Answer();
            this.#tentatives.push(answer);
        }
        return this.#tentatives;
    };

    //Créez une méthode permettant de passer à la tentative suivante, qui désactivera la tentative courante et activera la suivante
    nextTentative() {

        //si la tentive courante est la dernière, alors la tentive suivante est la première
        if(this.#activeTentative === this.#tentatives.length - 1){
            this.displayMessage('Game over');
            this.#activeTentative[this.#tentatives.length - 1].toggleState;
        }else{
            this.#activeTentative++;

        }
    };

    //Créez une méthode qui accepte un message en paramètre et l'affiche dans l'élément avec la classe .message.
    displayMessage(message) {
        const messageElement = document.querySelector(".message");
        messageElement.textContent = message;
    };
};

export default Game;