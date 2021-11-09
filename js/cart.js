const cart = () => {
  const cartButton = document.querySelector("#cart-button");
  const modalCart = document.querySelector(".modal-cart");
  const modalDialog = modalCart.querySelector(".modal-dialog");
  const modalBody = modalCart.querySelector(".modal-body");
  const close = modalCart.querySelector(".close");
  const clearСart = modalCart.querySelector(".clear-cart");

  cartButton.onclick = () => {
    if (localStorage.getItem("cart")) {
      modalBody.innerHTML = "";
      renderCart(JSON.parse(localStorage.getItem("cart")));
    } else {
      modalBody.innerHTML = "<h2>Здесь пока ничего нет</h2>";
    }

    modalCart.classList.add("is-open");
  };
  close.onclick = () => {
    closeCartModal();
  };
  clearСart.onclick = () => {
    closeCartModal();
    localStorage.removeItem("cart");
  };

  // /////////// Функции ///////////
  function closeCartModal() {
    modalCart.classList.remove("is-open");
  }
  const renderCart = (data) => {
    modalBody.innerHTML = "";
    console.log(data);
    data.forEach(({ id, name, price, count }) => {
      const cartPosition = document.createElement("div");
      cartPosition.classList.add("food-row");
      cartPosition.dataset["index"] = id;
      cartPosition.innerHTML = `
        <span class="food-name">${name}</span>
        <strong class="food-price">${price} ₽</strong>
        <div class="food-counter">
          <button class="counter-button decr" data-index="${id}">-</button>
          <span class="counter">${count}</span>
          <button class="counter-button incr" data-index="${id}">+</button>
        </div>
      `;
      modalBody.append(cartPosition);
    });
  };

  modalDialog.onclick = (e) => {
    if (e.target.classList.contains("decr")) {
      decrementCount(e.target.dataset.index);
    } else if (e.target.classList.contains("incr")) {
      incrementCount(e.target.dataset.index);
    }
  };

  const decrementCount = (id) => {
    const cartContent = JSON.parse(localStorage.getItem("cart"));
    cartContent.map((item) => {
      if (item.id === id) {
        item.count--;
        return item;
      }
    });
    console.log(cartContent);
    localStorage.setItem("cart", JSON.stringify(cartContent));
    renderCart(cartContent);
  };

  const incrementCount = (id) => {
    const cartContent = JSON.parse(localStorage.getItem("cart"));
    cartContent.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(cartContent));
    renderCart(cartContent);
  };

  //////////////////////////////////
};
cart();
