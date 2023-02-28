function CreateGallery(work, sectionGallery, categoryIdNeeded) {
  // console.log(categoryIdNeeded);
  if (categoryIdNeeded == 0 || work.categoryId == categoryIdNeeded) {
    const CreateFigure = document.createElement("figure");

    let CreateImageInFigure = document.createElement("img");
    CreateImageInFigure.src = work.imageUrl;
    CreateImageInFigure.alt = work.title;

    let CreateFigcaptionInFigure = document.createElement("figcaption");
    CreateFigcaptionInFigure.innerText = work.title;

    CreateFigure.appendChild(CreateImageInFigure);
    CreateFigure.appendChild(CreateFigcaptionInFigure);

    sectionGallery.appendChild(CreateFigure);
  }
}

function getWorks() {
  fetch("http://localhost:5678/api/categories") // ici l'url de la liste des categorie
    .then((reponse) => reponse.json())
    .then((category_infos) => {
      console.log(category_infos);

      for (let category_info of category_infos) {
        // Création de l'élément de bouton en JavaScript

        const filterBtn = document.createElement("button");

        // Ajout de la classe CSS au bouton
        filterBtn.classList.add("btn-style");

        // Ajout de l'attribut de données au bouton
        filterBtn.setAttribute("data-category-id", category_info.id);

        // Ajout du texte au bouton
        filterBtn.innerText = category_info.name;

        // Ajout du bouton au document

        const parentDiv = document.querySelector(".btn-parrent");

        // Ajout du bouton à la div parent
        parentDiv.appendChild(filterBtn);
      }

      fetch("http://localhost:5678/api/works")
        .then((reponse) => reponse.json())
        .then((works) => {
          console.log(works);
          let sectionGallery = document.querySelector("#gallery");

          for (let work of works) {
            CreateGallery(work, sectionGallery, 0);
          }

          let allBtn = document.querySelectorAll(".btn-style");

          for (let btn of allBtn) {
            btn.addEventListener("click", function (event) {
              for (let myButton of allBtn) {
                //
                myButton.classList.remove("active");
              }

              btn.classList.add("active");

              sectionGallery.innerHTML = "";
              const categoryIdNeeded = btn.getAttribute("data-category-id");

              for (let work of works) {
                CreateGallery(work, sectionGallery, categoryIdNeeded);
              }
            });
          }
        });
    });
}

function bandeauModifier() {
  // Ajout une classe prévu pour baissé le body car la barre noir que l'on vas ajotuer sera en position fixed
  document.querySelector("body").classList.add("connected");

  let link_login_page = document.querySelector("#login_page");
  link_login_page.innerText = "logout";
  link_login_page.addEventListener("click", function (event) {
    // on vide le local storage donc on se deconnecte
    localStorage.clear();
    // On redirige
    window.location.href = "index.html";
    // On prevent
    event.preventDefault();
  });

  // on crée le code pour afficher le bandeaux
  const bandeaux_black = document.createElement("div");

  bandeaux_black.classList.add("bandeaux-black");

  const bandeaux_black_span = document.createElement("span");
  bandeaux_black_span.innerText = "Mode édition";

  const bandeaux_black_button = document.createElement("button");
  bandeaux_black_button.innerText = "publier les changements";

  bandeaux_black.appendChild(bandeaux_black_span);
  bandeaux_black.appendChild(bandeaux_black_button);

  document.querySelector("header").appendChild(bandeaux_black);

  // creation boutton modifier
  const introduction_figure = document.querySelector(
    "section#introduction figure"
  );

  const introduction_figure_button = document.createElement("button");
  introduction_figure_button.innerText = "modifier";

  introduction_figure.appendChild(introduction_figure_button);

  // Créer un élément div avec la classe "modifier-liens"
  const divModifierH2 = document.createElement("div");
  divModifierH2.classList.add("modifier-liens");

  // Créer un élément button avec le texte "Modifier"
  const buttondivModifierH2 = document.createElement("button");
  buttondivModifierH2.innerText = "Modifier";

  // Ajouter l'élément button à l'élément div
  divModifierH2.appendChild(buttondivModifierH2);

  document.querySelector(".modifierprojets").appendChild(divModifierH2);
}

document.addEventListener("DOMContentLoaded", function (event) {
  getWorks();

  // if connected
  if (localStorage.getItem("token")) {
    const jwt = localStorage.getItem("token");

    const [header, payload, signature] = jwt.split(".");

    console.log(payload);
    // La fonction prend en entrée une chaîne de caractères qui est codée en base64
    //  et renvoie une chaîne de caractères en texte brut.tokens d'authentification.
    const decodedPayload = JSON.parse(atob(payload));
    const exp = decodedPayload.exp;

    const currentDate = new Date();
    // appel Date pour récupérer le temps écoulé en millisecondes depuis le 1er janvier 1970 00:00:00 UTC.
    if (currentDate.getTime() > exp * 1000) {
      localStorage.clear();
      // window.location.href = "index.html";
    } else {
      bandeauModifier();
    }
  }
});
