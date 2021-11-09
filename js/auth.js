const auth = () => {
  const btnAuth = document.querySelector(".button-auth");
  const cartButton = document.querySelector("#cart-button");
  const modalAuth = document.querySelector(".modal-auth");
  const closeAuth = document.querySelector(".close-auth");

  const btnOut = document.querySelector(".button-out");
  const userName = document.querySelector(".user-name");

  const logInForm = document.querySelector("#logInForm");
  const inputLogin = document.querySelector("#login");
  const inputPass = document.querySelector("#password");

  const address = document.querySelector(".input-address");

  // Только буквы и цифры: /[^a-zA-Zа-яА-Я0-9]/
  // Только буквы, цифры и '_' (например для логина): /[^a-zA-Zа-яА-Я0-9_]/
  // Только буквы, цифры и символы (например для пароля): '!@#$% &?-_=+': /[^a-zA-Zа-яА-Я0-9\!\@\#\$\% \&\?\-_=\+]/
  // Только буквы, цифры, '.,' и пробел (например для почтового адреса): /[^a-zA-Zа-яА-Я0-9 .,]/

  const regExp = {
    login: /[^a-zA-Zа-яА-Я0-9_]/,
    password: /[^a-zA-Zа-яА-Я0-9\!\@\#\$\% \&\?\-_=\+]/,
    address: /[^a-zA-Zа-яА-Я0-9 .,]/,
  };

  validate(address, regExp.address);
  validate(inputLogin, regExp.login);
  validate(inputPass, regExp.password);

  function validate(input, regex) {
    input.oninput = function () {
      this.value = this.value.replace(regex, "");
    };
  }

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
    btnAuth.style.display = "none";
    btnOut.style.display = "flex";
    cartButton.style.display = "flex";
    userName.textContent = user.login;
    userName.style.display = "flex";
    closeModalAuth();
  };

  const logout = () => {
    btnAuth.style.display = "flex";
    btnOut.style.display = "none";
    cartButton.style.display = "none";
    userName.textContent = "";
    userName.style.display = "none";
    localStorage.removeItem("user");
  };

  if (localStorage.getItem("user")) {
    login(JSON.parse(localStorage.getItem("user")));
  }
};
auth();
