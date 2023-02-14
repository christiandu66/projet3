document.addEventListener("DOMContentLoaded", function (event) {
  const CreateP = document.createElement("p");
  CreateP.className = "MyErrorMessage";
  document.forms[0].appendChild(CreateP);

  document.forms[0].addEventListener("submit", function (evt) {
    const username = document.querySelector("#username").value;

    const password = document.querySelector("#password").value;

      const rawResponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",

        body: JSON.stringify({ email: username, password: password }),
        //body: JSON.stringify({"email": "sophie.bluel@test.tld", "password": 'S0phie'})
      });

      let codeR = await rawResponse.status;
      const content = await rawResponse.json();

      let MyMessageError = document.querySelector(".MyErrorMessage");
      MyMessageError.innerHTML = "";

      if (codeR == 200) {
        localStorage.setItem("token", content.token);
        localStorage.setItem("userId", content.userId);
        window.location.href = "index.html";
      } else if (codeR == 404 || codeR == 401) {
        //
        MyMessageError.innerHTML =
          "utilisateur / mot de passe ne sont pas correctes.";
      }


    evt.preventDefault();
  });
});
