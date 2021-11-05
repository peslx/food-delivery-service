const btnAuth = document.querySelector(".button-auth");
const modalAuth = document.querySelector(".modal-auth");
const closeAuth = document.querySelector(".close-auth");

const btnOut = document.querySelector(".button-out");
const userName = document.querySelector(".user-name");

const logInForm = document.querySelector("#logInForm");
const inputLogin = document.querySelector("#login");
const inputPass = document.querySelector("#password");

btnAuth.addEventListener("click", () => {
  modalAuth.style.display = "flex";
});

closeAuth.addEventListener("click", () => {
  modalAuth.style.display = "none";
});

btnOut.addEventListener("click", () => {
  logout();
});

function closeModalAuth() {
  modalAuth.style.display = "none";
}

logInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    login: inputLogin.value,
    password: inputPass.value,
  };
  user.login.trim();
  if (user.login != "" && !/^\s|\s$/.test(user.login)) {
    login(user);
  } else if (/^\s|\s$/.test(user.login)) {
    alert(
      "Логин не может начинаться, заканчиваться или состоять из одних пробелов!"
    );
  } else {
    alert("Необходимо ввести логин!");
  }

  localStorage.setItem("user", JSON.stringify(user));
});

const login = (user) => {
  // console.log();

  btnAuth.style.display = "none";
  btnOut.style.display = "flex";
  userName.textContent = user.login;
  userName.style.display = "flex";
  closeModalAuth();
  // console.log(user);
};

const logout = () => {
  btnAuth.style.display = "flex";
  btnOut.style.display = "none";
  userName.textContent = "";
  userName.style.display = "none";
  localStorage.removeItem("user");
};

if (localStorage.getItem("user")) {
  // console.log(localStorage.getItem("user"));
  // console.log(JSON.parse(localStorage.getItem("user")));
  login(JSON.parse(localStorage.getItem("user")));
}

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};
