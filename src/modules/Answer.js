"use strict";
import Game from "./Game.js";
//Rôle : Gérer la saisie d’une proposition par l’utilisateur pour un essai précis (une ligne du jeu).

class Answer {
  #AnswerNumber = -1;
  #Line = null;
  #Game = null;
  
  constructor(game) {
    this.#AnswerNumber++;
    this.#Line = this.generateForm();
    this.#Game = game;
  }

  //Envoi de la tentative au serveur
  sendAnswer() {
    //Créez un Event Listener qui s’active lors de la soumission du formulaire.
    this.#Line.addEventListener("submit", (e) => {
      e.preventDefault();
      //Récupérez les valeurs des champs <input> du formulaire, puis transformez-les en une chaîne de 5 lettres
    const data = null;
      const formData = Object.fromEntries(new FormData(this.#Line));
      const answer = Object.values(formData).join("");
      console.log(answer);
      if (/^[a-zA-Z]+$/.test(answer)) {
        if (answer.length !== 5) {
          const message = `Answer must contain 5 letters `;
          this.#Game.displayMessage(message);
        }
      } else {
        const message = `Answer must contain only letters `;
        this.#Game.displayMessage(message);
      }

      const options = {
        method: "POST",
        body: `guess:${JSON.stringify(answer)}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      fetch("https://progweb-wwwordle-api.onrender.com/guess", options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.status ==='invalid') {
                throw new Error("Invalid answer");
                this.#Game.displayMessage(data.message);
              }else{
                this.#Game.displayMessage(data.message);
              }
        
                return data;
        })
        .catch((err) => console.error(err));
      
    });
  }
  //Générer et insérer un formulaire de saisie (un ensemble de champs pour la proposition).
  /* Générez un formulaire contenant 5 champs <input> (un par lettre). Réglez la longueur maximale de chaque champ à un caractère pour forcer l’utilisateur à ne saisir qu’une lettre */
  generateForm() {
    const conteneur = document.querySelector(".board");

    const formLine = document.createElement("form");
    formLine.classList.add("row");
    formLine.setAttribute("id", `row-${this.#AnswerNumber}`);
    formLine.setAttribute("inert", "true");
    //Créez un événement de type keyup sur chaque input
    for (let i = 0; i <= 4; i++) {
      const input = document.createElement("input");
      input.classList.add("letter");
      input.setAttribute("type", "text");
      input.setAttribute("name", `letter-${i}`);
      input.setAttribute("id", `row-${this.#AnswerNumber}-${i}`);
      input.setAttribute("maxlength", "1");
      input.addEventListener("keyup", (e) => {
        //Pour connaître la touche sur laquelle l'utilisateur appuie lors d'un événement keyup
        const keyValue = e.key;
        /* Si l'utilisateur saisit un caractère alphanumérique ou appuie sur la flèche droite, le focus passe automatiquement à l'input suivant. */
        if (
          /^([\x30-\x39]|[\x61-\x7a])$/i.test(keyValue) ||
          keyValue === "ArrowRight"
        ) {
          const nextInput = e.target.nextElementSibling;
          if (nextInput) {
            nextInput.focus();
          }
        } else if (keyValue === "ArrowLeft") {
          const previousInput = e.target.previousElementSibling;
          if (previousInput) {
            previousInput.focus();
          }
        }
      });
      formLine.appendChild(input);
    }
    const sumbitField = document.createElement("input");
    sumbitField.setAttribute("type", "submit");
    sumbitField.setAttribute("hidden", "true");
    formLine.appendChild(sumbitField);
    conteneur.appendChild(formLine);

    return formLine;
  }

  //Envoyer la proposition au serveur et traiter la réponse (colorisation, affichage du résultat).
 
  //Alterner entre un état actif et inactif, selon la progression du jeu.
  toggleState() {
    if (this.#Line.hasAttribute("inert")) {
      this.#Line.removeAttribute("inert");
    }
  }
}

export default Answer;
