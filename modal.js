// Récupérer la modale
let modal = document.querySelector(".modal");

// Récupérer le bouton Fermer
let closeBtn = document.querySelector("#closeBtn");

// Position de la modal pour savoir si on est sur la galerie ou sur envoi d'image
// Par défaut on est sur la galerie
let position_modal = 0;
// -------------------------------------------------------------
let cnt_gallery = document.querySelector(".modal .asidemodal.gallery");
let cnt_image_upload = document.querySelector(
  ".modal .asidemodal.image-upload"
);
let h2_modal = document.querySelector(".modalheader h2");

// Effectuer une action au clic sur le bouton précédent qui nous ramène à la galerie
document.addEventListener("click", function (e) {
  // Si la cible du clic est le bouton précédent et que la position de la modal est à 1
  if (e.target.matches(".modalheader button#prevBtn") && position_modal) {
    // On change le titre de la modal
    resetModal();
    // On remet la zone d'upload à zéro
    resetZoneUpload();
  }
});

// Affiche la modal image upload
document
  .querySelector(".modalfooter button")
  .addEventListener("click", function (e) {
    document
      .querySelector(".modalfooter button")
      .setAttribute("disabled", "disabled");
    document.querySelector(".modalfooter .remove-gallery").style.display =
      "none";
    document.querySelector(".modalfooter button").innerText = "Valider";

    // On cache la galerie et on affiche ajout photo
    cnt_gallery.style.display = "none";
    cnt_image_upload.style.display = "grid";
    // On defini la position de la modal à 1
    position_modal = 1;
    // Changement du titre de la modal
    h2_modal.innerText = "Ajout photo";
    // Création du bouton précédent
    const mybutton_prev = document.createElement("button");
    mybutton_prev.setAttribute("id", "prevBtn");
    // On ajoute le button dans le header de la modal
    document.querySelector(".modalheader").appendChild(mybutton_prev);

    e.preventDefault();
  });

function resetModal() {
  const mybutton_prev = document.querySelector(".modalheader button#prevBtn");
  //  supprime le bouton précédent si celui-ci est présent dans la modale.
  if (mybutton_prev) {
    mybutton_prev.remove();
  }
  //  met à jour le titre de la modale avec le texte "Galerie photo".
  h2_modal.innerText = "Galerie photo";
  // On affiche la galerie et on cache ajout photo
  cnt_gallery.style.display = "grid";
  cnt_image_upload.style.display = "none";
  // On remet la position de la modal à 0
  position_modal = 0;
  // supprime l'attribut "disabled" du bouton situé dans le pied de page de la modale
  document.querySelector(".modalfooter button").removeAttribute("disabled");

  document.querySelector(".modalfooter button").innerText = "Ajouter une photo";
  document.querySelector(".modalfooter .remove-gallery").style.display =
    "block";
  resetZoneUpload();
}
function resetZoneUpload() {
  // On remet la zone d'upload à zéro
  document.querySelector(".zone-upload").classList.remove("loaded");
  document.querySelector(".zone-upload img").classList.remove("loaded");
  document.querySelector(".zone-upload span").style.display = "block";
  document.querySelector(".zone-upload p").style.display = "block";
  document
    .querySelector(".zone-upload img")
    .setAttribute("src", "assets/icons/picture-icon.svg");
}

// Fermer la modale
function closeModal() {
  // On selectionne le bouton précédent si il existe

  // On change le titre de la modal
  resetModal();
  // On cache la modal
  modal.style.display = "none";

  // appelle fonction resetZoneUpload qui réinitialise la zone d'ajout de photos
  resetZoneUpload();

  // Si le bouton précédent existe on le supprime
}

// Ajouter un événement au clic sur le bouton Fermer
closeBtn.addEventListener("click", function () {
  closeModal();
});

const fileInput = document.getElementById("file");
const imagePhoto = document.getElementById("imagephoto");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  const fileSize = file.size / 1024 / 1024; // convertir la taille en Mo

  if (fileSize > 4) {
    alert("Le fichier sélectionné est trop volumineux.");
    return;
  }

  // crée un nouvel objet FileReader qui permet de lire les données d'un fichier.
  const reader = new FileReader();
  reader.onload = function () {
    document.querySelector(".zone-upload").classList.add("loaded");
    document.querySelector(".zone-upload img").classList.add("loaded");
    document.querySelector(".zone-upload span").style.display = "none";
    document.querySelector(".zone-upload p").style.display = "none";
    // définit l'attribut src de l'élément HTML qui représente l'image chargée avec l'URL des données binaires lues par l'objet FileReader.
    imagePhoto.src = reader.result;
  };
  // lecture du fichier sélectionné par l'utilisateur en tant que données binaires.
  // Cela déclenchera l'exécution de la fonction définie à la ligne 2 une fois que la lecture sera terminée avec succès.
  reader.readAsDataURL(file);
});

// Afficher la modale au clic sur un bouton
let open_modal = document.querySelector("#open_modal");
open_modal.addEventListener("click", function () {
  modal.style.display = "flex";
});
