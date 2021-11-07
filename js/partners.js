// fetch("./db/partners.json")
//   .then((response) => response.json())
//   .then((data) => fetchData(data))
//   .catch((error) => console.log(error));

// function fetchData(data) {
//   console.log(data);
// }

const restaurants = document.querySelector(".cards-restaurants");
// console.log(restaurants);

function renderRestaurants(cards) {
  cards.forEach(
    ({ products, image, name, time_of_delivery, stars, price, kitchen }) => {
      // console.log({ image, name, time_of_delivery, stars, price, kitchen });

      const a = document.createElement("a");
      a.setAttribute("href", "/restaurant.html");
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
      // console.log(a);
      a.onclick = (e) => {
        e.preventDefault();
        localStorage.setItem("restaurant", products);
        localStorage.setItem("restaurant-title", name);
        localStorage.setItem("restaurant-stars", stars);
        localStorage.setItem("restaurant-price", price);
        localStorage.setItem("restaurant-category", kitchen);

        window.location.href = "/restaurant.html";
      };

      restaurants.append(a);
    }
  );
}

fetch("./db/partners.json")
  .then((response) => response.json())
  .then((data) => renderRestaurants(data))
  .catch((error) => console.log(error));
