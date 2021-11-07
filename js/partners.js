const url = String(document.location).replace("/index.html", "");

const restaurants = document.querySelector(".cards-restaurants");

function renderRestaurants(cards) {
  cards.forEach((item) => {
    const { products, image, name, time_of_delivery, stars, price, kitchen } =
      item;
    const a = document.createElement("a");
    a.setAttribute("href", url + "/restaurant.html");
    a.classList.add("card", "card-restaurant");
    a.dataset.products = products;

    a.innerHTML = `
      <img src="${image}" alt="image" class="card-image" />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${time_of_delivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">${stars}</div>
          <div class="price">От ${price} ₽</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>
    `;

    a.onclick = (e) => {
      e.preventDefault();
      localStorage.setItem("restaurant", JSON.stringify(item));
      window.location.href = url + "/restaurant.html";
    };

    restaurants.append(a);
  });
}

fetch("./db/partners.json")
  .then((response) => response.json())
  .then((data) => renderRestaurants(data))
  .catch((error) => console.log(error));
