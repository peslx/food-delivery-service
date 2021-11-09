const menu = () => {
  const menu = document.querySelector(".cards-menu");
  const restaurantTitle = document.querySelector(".restaurant-title");
  const restaurantRating = document.querySelector(".rating");
  const restaurantPrice = document.querySelector(".price");
  const restaurantCategory = document.querySelector(".category");

  if (localStorage.getItem("restaurant")) {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    fetch(`./db/${restaurant.products}`)
      .then((response) => response.json())
      .then((data) => renderCards(data))
      .catch((error) => console.log(error));
    document.title = restaurant.name;
    restaurantTitle.textContent = restaurant.name;
    restaurantRating.textContent = restaurant.stars;
    restaurantPrice.textContent = `От ${restaurant.price} ₽`;
    restaurantCategory.textContent = restaurant.kitchen;
    // console.log(restaurant);
  } else {
    window.location.href = "/";
  }

  // JSON - обработчик
  function renderCards(cards) {
    cards.forEach(({ id, image, name, description, price }) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
      <img src="${image}" alt="image" class="card-image" />
      <div class="card-text">
      <div class="card-heading">
      <h3 class="card-title card-title-reg">${name}</h3>
      </div>
      <div class="card-info">
      <div class="ingredients">${description}</div>
      </div>
      <div class="card-buttons">
      <button class="button button-primary button-add-cart">
      <span class="button-card-text">В корзину</span>
      <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">${price} ₽</strong>
      </div>
      </div>
      `;
      card.querySelector(".button-add-cart").addEventListener("click", () => {
        addToCart({ id, name, price, count: 1 });
      });
      menu.append(card);
    });
  }

  const cartContent = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const addToCart = (cartItem) => {
    if (cartContent.some((item) => item.id === cartItem.id)) {
      cartContent.map((item) => {
        if (item.id === cartItem.id) {
          item.count++;
        }
        return item;
      });
    } else {
      cartContent.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cartContent));
  };
};
menu();
