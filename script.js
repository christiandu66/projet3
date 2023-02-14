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
}

getWorks();
