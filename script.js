function CreateGallery(work, sectionGallery, categoryIdNeeded) {
  if (categoryIdNeeded == 0 || work.categoryId == categoryIdNeeded) {
    // Vérifie si l'ID de la catégorie est nécessaire ou si elle est égale à zéro, pour afficher tous les éléments

    const CreateFigure = document.createElement("figure"); // Crée un élément HTML de type "figure" pour chaque élément de travail

    let CreateImageInFigure = document.createElement("img"); // Crée un élément HTML de type "img" pour l'image de l'élément de travail
    CreateImageInFigure.src = work.imageUrl; // Définit la source de l'image en utilisant l'URL stockée dans l'objet "work"
    CreateImageInFigure.alt = work.title; // Définit le texte alternatif de l'image en utilisant le titre stocké dans l'objet "work"

    let CreateFigcaptionInFigure = document.createElement("figcaption"); // Crée un élément HTML de type "figcaption" pour le titre de l'élément de travail
    CreateFigcaptionInFigure.innerText = work.title; // Ajoute le titre de l'élément de travail à l'élément "figcaption"
    CreateFigure.appendChild(CreateImageInFigure); // Ajoute l'élément "img" dans l'élément "figure"
    CreateFigure.appendChild(CreateFigcaptionInFigure); // Ajoute l'élément "figcaption" dans l'élément "figure"

    sectionGallery.appendChild(CreateFigure); // Ajoute l'élément "figure" créé pour l'élément de travail dans la section de galerie spécifiée
  }
}

function getCategories() {
  // La fonction renvoie une promesse avec deux fonctions de rappel en argument, resolve et reject.
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5678/api/categories") // ici l'url de la liste des categorie
      .then((reponse) => reponse.json()) // La méthode then est utilisée pour extraire les données de réponse et les formater en JSON.
      .then((category_infos) => {
        // La méthode then est utilisée pour extraire les données JSON et les passer à une fonction de rappel.

        const parentDiv = document.querySelector(".btn-parrent"); // La constante parentDiv est utilisée pour stocker l'élément parent qui contiendra les boutons de catégorie.
        parentDiv.innerHTML = ""; // L'attribut innerHTML de parentDiv est effacé pour supprimer tout contenu existant.

        const buttonAll = document.createElement("button"); //création butoon all cathegories
        buttonAll.setAttribute("data-category-id", "0"); // L'attribut "data-category-id" du bouton est défini sur 0, indiquant que toutes les catégories sont sélectionnées.
        buttonAll.setAttribute("class", "btn-style active"); // L'attribut "class" du bouton est défini sur "btn-style active", avec les styles CSS correspondants.
        buttonAll.textContent = "Tous"; // Le texte affiché sur le bouton est défini sur "Tous".

        parentDiv.appendChild(buttonAll); // Ajouter l'élément de bouton au document HTML

        for (let category_info of category_infos) {
          const filterBtn = document.createElement("button"); // Création de l'élément de bouton en JavaScript
          filterBtn.classList.add("btn-style"); // Ajout de la classe CSS au bouton
          filterBtn.setAttribute("data-category-id", category_info.id); // Ajout de l'attribut de données au bouton
          filterBtn.innerText = category_info.name; // Ajout du texte au bouton
          parentDiv.appendChild(filterBtn); // Ajout du bouton à la div parent
        }
        //résout la promesse avec les données de catégorie récupérées
        resolve(category_infos); // getCategories() est appelée, Les données peuvent ensuite être utilisées par la fonction getCategories() pour afficher les boutons de catégorie
      });
  });
}

function getWorks() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:5678/api/works")
      .then((reponse) => reponse.json())
      .then((works) => {
        let sectionGallery = document.querySelector("#gallery");
        sectionGallery.innerHTML = ""; // L'attribut innerHTML de parentDiv est effacé pour supprimer tout contenu existant.

        for (let work of works) {
          // parcour "works"et créer une galerie d'images correspondante index 0

          CreateGallery(work, sectionGallery, 0);
        }

        resolve(works); //renvoi une valeur réussie à partir d'une promesse, ce qui indique que la tâche asynchrone a été effectuée avec succès.
      });
  });
}

function bandeauModifier() {
  // Ajout une classe prévu pour baissé le body car la barre noir que l'on vas ajotuer sera en position fixed
  document.querySelector("body").classList.add("connected");

  let link_login_page = document.querySelector("#login_page"); //change login par logout si connect
  link_login_page.innerText = "logout";
  link_login_page.addEventListener("click", function (event) {
    localStorage.clear(); // on vide le local storage donc on se deconnecte

    window.location.href = "index.html"; // On redirige

    event.preventDefault(); //Stop la propagation,On prevent
  });

  // on crée le code pour afficher le bandeaux
  const bandeaux_black = document.createElement("div");

  bandeaux_black.classList.add("bandeaux-black"); // ajout du css

  const bandeaux_black_span = document.createElement("span"); //création balise
  bandeaux_black_span.innerText = "Mode édition"; // ajout du text

  const bandeaux_black_button = document.createElement("button"); // création button
  bandeaux_black_button.innerText = "publier les changements"; // ajout text

  bandeaux_black.appendChild(bandeaux_black_span); //ajout enfant
  bandeaux_black.appendChild(bandeaux_black_button); //ajout enfant

  document.querySelector("header").appendChild(bandeaux_black); // select 1er element header, ajout bandeaux black

  const introduction_figure = document.querySelector(
    "section#introduction figure" //select figure
  );

  const introduction_figure_button = document.createElement("button"); //creation button
  introduction_figure_button.innerText = "modifier"; // ajout text
  // AJouter un evenement on clock pour ourir la modal
  introduction_figure_button.addEventListener("click", function (event) {
    modal.style.display = "flex"; // de display en flex rend visible la modal
  });

  introduction_figure.appendChild(introduction_figure_button); // ajout introduction_figure_button à introduction_figure

  // Créer un élément div avec la classe "modifier-liens"
  const divModifierH2 = document.createElement("div"); // création
  divModifierH2.classList.add("modifier-liens"); //ajout css

  // Créer un élément button avec le texte "Modifier"
  const buttondivModifierH2 = document.createElement("button");
  buttondivModifierH2.innerText = "Modifier";
  buttondivModifierH2.addEventListener("click", function (event) {
    modal.style.display = "flex"; // de display en flex rend visible la modal
  });

  // Ajouter l'élément button à l'élément div
  divModifierH2.appendChild(buttondivModifierH2);

  document.querySelector(".modifierprojets").appendChild(divModifierH2); // select .modifierprojets, ajout divModifierH2
}

// Global variable pour modal //
let modal = document.querySelector(".modal"); //select css .modal

let position_modal = 0; //position de départ  Ceci initialise la variable position_modal à 0. Cette variable peut être utilisée pour stocker la position actuelle de l'élément modal.

let cnt_gallery = document.querySelector(".modal .asidemodal.gallery"); //select
let cnt_image_upload = document.querySelector(
  ".modal .asidemodal.image-upload"
); //select
let h2_modal = document.querySelector(".modalheader h2"); //select
let select_modal_category = document.querySelector(
  ".modal .asidemodal.image-upload select"
); //select

//Defini function pour modal //
function updateGalleryModal() {
  //fonction mettra à jour la galerie d'images dans une page web
  // On récupère les projets
  getWorks().then((data) => {
    cnt_gallery.innerHTML = ""; // On vide la galerie
    let cnt = 0;
    for (let work of data) {
      //parcours data

      const myDiv = document.createElement("div"); //creation
      myDiv.classList.add("fotos"); //ajout de fotos

      if (cnt == 0) {
        //si == 0 alors rempli le html
        myDiv.innerHTML = `
      <div class="image-zone">
        <button class="move"></button>
        <button class="trash" data-work-id="${work.id}"></button>
        <img src="${work.imageUrl}" alt="">
      </div>
      `;
      } else {
        //sinon rempli le html
        myDiv.innerHTML = `
      <div class="image-zone">
        <button class="trash" data-work-id="${work.id}"></button>
        <img src="${work.imageUrl}" alt="">
      </div>
      `;
      }

      cnt++; //accrementation

      cnt_gallery.appendChild(myDiv); //ajout myDiv à cnt_gallery
    }
  });

  getCategories().then((data) => {
    // On récupère les catégories

    document.querySelector(".modal .asidemodal.image-upload select").innerHTML =
      ""; // On vide la liste des catégories
    // On crée une option vide
    const my_option = document.createElement("option"); // On crée une option vide
    my_option.innerText = "";
    // On ajoute l'option à la liste

    document
      .querySelector(".modal .asidemodal.image-upload select")
      .appendChild(my_option);

    for (let category of data) {
      // On parcours les catégories
      const my_option = document.createElement("option"); // On crée une option
      my_option.setAttribute("value", category.id); // On lui donne une valeur et un texte
      my_option.innerText = category.name;
      // On ajoute l'option à la liste
      document
        .querySelector(".modal .asidemodal.image-upload select") //select
        .appendChild(my_option); //ajout
    }
  });
}
function resetModal() {
  const mybutton_prev = document.querySelector(".modalheader button#prevBtn"); //select
  if (mybutton_prev) {
    //si c'est == à mybutton_prev ont retire mybutton_prev
    mybutton_prev.remove(); //Si le bouton précédent existe, on le supprime de la fenêtre modale.
  }
  h2_modal.innerText = "Galerie photo"; // change le titre en Galerie photo
  cnt_gallery.style.display = "grid"; // On affiche la galerie et on cache ajout photo
  cnt_image_upload.style.display = "none"; //On affiche la galerie d'images et on cache la zone d'ajout d'images.
  // On remet la position de la modal à 0
  position_modal = 0;

  document.querySelector(".modalfooter button").removeAttribute("disabled"); // On supprime l'attribut "disabled" du bouton "Ajouter une photo" dans la zone de pied de page de la fenêtre modale.

  document.querySelector(".modalfooter button").innerText = "Ajouter une photo"; // select et ajourte text
  document.querySelector(".modalfooter .remove-gallery").style.display =
    "block"; // select et le met en display block On affiche le bouton "Supprimer la galerie" dans la zone de pied de page de la fenêtre modale.
  updateGalleryModal(); // met a jour la gallery modal
  resetZoneUpload(); // On réinitialise la zone d'ajout d'images.
}

function resetZoneUpload() {
  // On remet la zone d'upload à zéro
  document.querySelector(".zone-upload").classList.remove("loaded"); // supprime css loaded
  document.querySelector(".zone-upload img").classList.remove("loaded"); //supprime css loaded
  document.querySelector(".zone-upload span").style.display = "block"; // met en block
  document.querySelector(".zone-upload p").style.display = "block"; // met en block
  document
    .querySelector(".zone-upload img") // select
    .setAttribute("src", "assets/icons/picture-icon.svg"); // ajout val
}

// Fermer la modale
function closeModal() {
  // On selectionne le bouton précédent si il existe

  // On change le titre de la modal
  resetModal();
  // On cache la modal
  modal.style.display = "none";

  // On remet la zone d'upload à zéro
  resetZoneUpload();

  // Si le bouton précédent existe on le supprime
}

function callModal() {
  // On affiche la modal

  /* Modal */
  // Récupérer la modale

  // Récupérer le bouton Fermer
  let closeBtn = document.querySelector("#closeBtn"); //select

  updateGalleryModal();
  // Position de la modal pour savoir si on est sur la galerie ou sur envoi d'image
  // Par défaut on est sur la galerie

  // Effectuer une action au clic sur le bouton précédent qui nous ramène à la galerie
  document.querySelector(".modal").addEventListener("click", function (e) {
    //console.log("click " + e.target);

    // Si la cible du clic est le bouton précédent et que la position de la modal est à 1
    if (e.target.matches(".modalheader button#prevBtn") && position_modal) {
      // On change le titre de la modal
      resetModal();
      // On remet la zone d'upload à zéro
      resetZoneUpload();
    }
    // Si la cible du click et le bouton supprimer et que la position de la modal est à 0
    if (
      e.target.matches(".modal-content .asidemodal.gallery .fotos .trash") &&
      !position_modal
    ) {
      let id_work = e.target.getAttribute("data-work-id");
      // requette feach delete

      // crée une requette fetch pour supprimer un projet

      fetch("http://localhost:5678/api/works/" + id_work, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          //et la
          // reponse ok
          // Gérer la réponse du serveur
          resetModal(); //la fonction resetModal() est appelée pour remettre la zone d'upload à zéro
          // On remet la zone d'upload à zéro
          resetZoneUpload(); //fonction resetZoneUpload() est également appelée pour remettre la zone d'upload à zéro.
        })
        .catch((error) => {
          alert("Une erreur s'est produite : " + error.message); //reponse pas ok
          // Gérer les erreurs de la requête

          resetModal();
          // On remet la zone d'upload à zéro
          resetZoneUpload();
        });
    }
  });

  // Affiche la modal image upload
  document
    .querySelector(".modalfooter button") // select
    .addEventListener("click", function (e) {
      if (position_modal == 0) {
        document
          .querySelector(".modalfooter button") //select
          .setAttribute("disabled", "disabled");
        document.querySelector(".modalfooter .remove-gallery").style.display =
          "none";
        document.querySelector(".modalfooter button").innerText = "Valider"; //modifie le texte à l'intérieur du bouton sélectionné pour qu'il affiche "Valider".
        // On cache la galerie et on affiche ajout photo
        cnt_gallery.style.display = "none"; //cache l'élément qui a l'ID "cnt_gallery".
        cnt_image_upload.style.display = "grid"; //affiche l'élément qui a l'ID "cnt_image_upload" en utilisant une disposition de grille.
        // On defini la position de la modal à 1
        position_modal = 1;
        // Changement du titre de la modal
        h2_modal.innerText = "Ajout photo";
        // Création du bouton précédent
        const mybutton_prev = document.createElement("button");
        mybutton_prev.setAttribute("id", "prevBtn");
        // On ajoute le button dans le header de la modal
        document.querySelector(".modalheader").appendChild(mybutton_prev);
      } else if (position_modal == 1) {
        //  On récupère l'image
        const fileInput = document.querySelector(
          '.modal .asidemodal.image-upload input[type="file"]'
        );
        // Récupérer la valeur du titre
        const ImageTitle = document.querySelector(
          ".modal .asidemodal.image-upload #image-title"
        ).value;

        // Récupérer la valeur du select
        const select = document.querySelector(
          ".modal .asidemodal.image-upload select"
        );
        const selectValue = select.options[select.selectedIndex].value;

        const file = fileInput.files[0];
        const formData = new FormData(); //Cette ligne de code crée une nouvelle instance de l'objet FormData,
        //qui est un objet JavaScript intégré qui permet de créer facilement des paires clé/valeur à partir des données de formulaire.
        formData.append("image", file); // Cette ligne ajoute une paire clé/valeur à l'objet, créé précédemment.
        //La clé "image" est associée à la variable file, qui contient le fichier sélectionné par l'utilisateur.
        formData.append("title", ImageTitle); //Cette ligne ajoute une paire clé/valeur supplémentaire à l'objet FormData.
        // La clé "title" est associée à la variable ImageTitle, qui contient la valeur du champ de saisie de titre.
        formData.append("category", selectValue); // Cette ligne ajoute une troisième paire clé/valeur à l'objet FormData.
        //La clé "category" est associée à la variable selectValue, qui contient la valeur sélectionnée dans le champ de sélection.

        // Création de la requête d'envoi de l'image
        fetch("http://localhost:5678/api/works", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((response) => {
            // Gérer la réponse du serveur
            resetModal();
          })
          .catch((error) => {
            // Gérer les erreurs de la requête
            alert("Une erreur s'est produite : " + error.message);
            resetModal();
          });
      }

      e.preventDefault();
    });

  // Ajouter un événement au clic sur le bouton Fermer

  select_modal_category.addEventListener("change", function () {
    modalUnlockButton();
  });
  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  const fileInput = document.querySelector(
    '.modal .asidemodal.image-upload input[type="file"]' //selec t
  );
  const imagePhoto = document.getElementById("imagephoto"); //select id

  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    const fileSize = file.size / 1024 / 1024; // convertir la taille en Mo

    if (fileSize > 4) {
      alert("Le fichier sélectionné est trop volumineux.");
      return;
    }

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    modalUnlockButton();

    if (allowedExtensions.exec(file.name)) {
      //gere le type de l'image
      const reader = new FileReader();
      reader.onload = function () {
        document.querySelector(".zone-upload").classList.add("loaded");
        document.querySelector(".zone-upload img").classList.add("loaded");
        document.querySelector(".zone-upload span").style.display = "none";
        document.querySelector(".zone-upload p").style.display = "none";
        imagePhoto.src = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert("Le fichier sélectionné n'est pas une image.");
    }
  });
}
//si extension ok ou pas
function modalUnlockButton() {
  const fileInput = document.querySelector(
    '.modal .asidemodal.image-upload input[type="file"]' //select
  );
  const file = fileInput.files[0];
  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  if (!file) {
    // Le champ de fichier est vide
    return;
  } else if (!allowedExtensions.exec(file.name)) {
    // Le fichier n'a pas l'extension JPG ou PNG
    return;
  }
  // Obtenire la valeur du select .modal .asidemodal.image-upload select
  const select = document.querySelector(
    ".modal .asidemodal.image-upload select"
  );
  const selectValue = select.options[select.selectedIndex].value;
  if (selectValue == "") {
    return;
  }
  document.querySelector(".modalfooter button").removeAttribute("disabled");
}

document.addEventListener("DOMContentLoaded", function (event) {
  //mise à jour gallery
  getCategories();
  getWorks();

  document.addEventListener("click", function (e) {
    if (e.target.matches(".btn-style")) {
      let allBtn = document.querySelectorAll(".btn-style");
      let mthis = e.target;

      for (let btn of allBtn) {
        btn.classList.remove("active");
      }
      mthis.classList.add("active");
      getWorks().then((works) => {
        let sectionGallery = document.querySelector("#gallery");
        const categoryIdNeeded = mthis.getAttribute("data-category-id");
        sectionGallery.innerHTML = "";
        for (let work of works) {
          CreateGallery(work, sectionGallery, categoryIdNeeded);
        }
      });
    }
  });

  // if connected
  if (localStorage.getItem("token")) {
    //Vérifie si un jeton JWT est stocké dans le stockage local du navigateur sous la clé "token".
    const jwt = localStorage.getItem("token"); //Récupère le jeton JWT stocké dans le stockage local sous la clé "token" et le stocke dans une variable jwt.

    const [header, payload, signature] = jwt.split("."); //Divise le jeton en ses trois parties : l'en-tête, le corps et la signature, en utilisant le caractère "." comme délimiteur.
    //Les parties sont stockées dans les variables header, payload et signature.
    console.log(payload); //Affiche le corps du jeton (la partie encodée (base64) qui contient les informations sur l'utilisateur) dans la console du navigateur.
    const decodedPayload = JSON.parse(atob(payload)); //Décode le corps du jeton en utilisant la méthode atob() pour décoder la chaîne encodée en base64 et la méthode JSON.
    //parse() pour convertir la chaîne JSON résultante en un objet JavaScript. Le résultat est stocké dans la variable decodedPayload.

    const exp = decodedPayload.exp; //Récupère la date d'expiration du jeton stockée dans la propriété "exp" de l'objet decodedPayload et la stocke dans une variable exp.

    const currentDate = new Date(); //Crée un nouvel objet Date() qui représente la date et l'heure actuelles et la stocke dans une variable currentDate.

    if (currentDate.getTime() > exp * 1000) {
      //Vérifie si la date et l'heure actuelles sont postérieures à la date d'expiration du jeton (multipliée par 1000 pour la convertir en millisecondes).
      localStorage.clear(); //Efface toutes les données stockées dans le stockage local.
      window.location.href = "index.html"; //Redirige l'utilisateur vers la page d'accueil.
    } else {
      bandeauModifier();
      callModal();
    }
  }
});
