"use strict";

//Rôle : Gérer la saisie d’une proposition par l’utilisateur pour un essai précis (une ligne du jeu).

class Answer {
  #AnswerNumber = -1;
  #Line = null;
  constructor() {
    this.#AnswerNumber++;
    this.#Line = this.generateForm();
  }

  //Générer et insérer un formulaire de saisie (un ensemble de champs pour la proposition).
  /* Générez un formulaire contenant 5 champs <input> (un par lettre). Réglez la longueur maximale de chaque champ à un caractère pour forcer l’utilisateur à ne saisir qu’une lettre */
  generateForm() {
    const conteneur = document.querySelector(".board");

    const formLine = document.createElement("form");
    formLine.classList.add("row");
    formLine.setAttribute("id", `row-${this.#AnswerNumber}`);
    formLine.setAttribute("inert");
    //Créez un événement de type keyup sur chaque input
    for (let i = 0; i <= 4; i++) {
      const input = document.createElement("input");
      input.classList.add("letter");
      input.setAttribute("type", "text");
      input.setAttribute("name", `letter-${i}`);
      input.setAttribute("id", `row-${this.#AnswerNumber}-${i}`);
      input.setAttribute("maxlength", "1");
      input.addEventListener("keyup", handleKeyup(e));
      formLine.appendChild(input);
    }
    const sumbitField = document.createElement("input");
    sumbitField.setAttribute("type", "submit");
    sumbitField.setAttribute("hidden");
    formLine.appendChild(sumbitField);
    conteneur.appendChild(formLine);

    return formLine;
  }
  isAlphaNumericKey(key) {
	return /^([\x30-\x39]|[\x61-\x7a])$/i.test(key);
}

    //Gérer la navigation dans les champs de saisie.
    handleKeyup(e) {
        //Pour connaître la touche sur laquelle l'utilisateur appuie lors d'un événement keyup
        const keyValue = e.key;
        /* Si l'utilisateur saisit un caractère alphanumérique ou appuie sur la flèche droite, le focus passe automatiquement à l'input suivant. */
        if (isAlphaNumericKey(keyValue) || keyValue === "ArrowRight") {
            const nextInput = e.target.nextElementSibling;
            if (nextInput) {
                nextInput.focus();
            }
            
        }else if (keyValue === "ArrowLeft") {
            const previousInput = e.target.previousElementSibling;
            if (previousInput) {
                previousInput.focus();
            }
        }

    };
  
  //Envoyer la proposition au serveur et traiter la réponse (colorisation, affichage du résultat).
  checkAnswer() {
    nextTentative
  };
  //Alterner entre un état actif et inactif, selon la progression du jeu.
  toggleState() {
    if (this.#Line.hasAttribute("inert")) {
      this.#Line.removeAttribute("inert");
      handleKeyup();
    }
  }
}

export default Answer;
