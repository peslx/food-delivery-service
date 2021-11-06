// console.log();

// fetch("./db/partners.json")
//   .then((response) => response.json())
//   .then((data) => renderData(data));
function renderData(data) {
  console.log(data);
}

// const data = fetch("./db/db.json")
//   .then((response) => response.json())
//   .then((data) => {
//     renderData(data);
//   });

fetch("./db/db.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  });

const data = fetch("./db/db.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (const key in data) {
      console.log(data);
    }
  });

// console.log(data);
