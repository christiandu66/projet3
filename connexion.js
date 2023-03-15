document.addEventListener("DOMContentLoaded", function (event) {
  const CreateP = document.createElement("p"); //creation p
  CreateP.className = "MyErrorMessage";
  document.forms[0].appendChild(CreateP);

  document.forms[0].addEventListener("submit", function (evt) {
    const username = document.querySelector("#username").value;

    const password = document.querySelector("#password").value;
    var codeR = "";
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password: password }),
      //body: JSON.stringify({"email": "sophie.bluel@test.tld", "password": 'S0phie'})
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        codeR = response.status;
        return response.json();
      })
      .then((data) => {
        let MyMessageError = document.querySelector(".MyErrorMessage");
        MyMessageError.innerHTML = "";

        if (codeR == 200) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.userId);

          window.location.href = "index.html";
        } else if (codeR == 404 || codeR == 401) {
          //
          MyMessageError.innerHTML =
            "utilisateur / mot de passe ne sont pas correctes.";
        }
      });
    evt.preventDefault();
  });
});
