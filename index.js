function fetchData(api) {
  return fetch(api)
    .then((response) => response.json())
    .catch((error) => console.error("У тебя ошибка", error));
}

function renderSneakers(data) {
  let wrapper = document.querySelector(".sneakers-wrapper");
  wrapper.innerHTML = data
    .map((item) => {
      return `
        <div class="sneakers-card">
            <button class="sneakers__card-like">
              <img src="./images/${item.isLike ? "like-2.svg" : "like-1.svg"}"
              data-is-like="${item.isLike ? "true" : "false"}"
              alt=""  class="card-like" data-sneaker-id="${
                item.id
              }" data-fava-id="-1"/>
            </button>
            <img src="./images/${
              item.imageUrl
            }" alt="" class="sneakers__card-img" />
            <h4 class="sneakers__card-title">
              ${item.title}
            </h4>
            <div class="sneakers__card-actions">
                <div class="sneakers__action-price">
                    <b>Цена</b>
                    <b>${item.price}$</b>
                </div>
                <button class="sneakers__action-cart">
                    <img src="./images/plus.svg" alt="">
                </button>
            </div>
          </div>`;
    })
    .join("");
}

document.addEventListener("click", function (event) {
  let target = event.target;

  if (target.classList.contains("card-like")) {
    let sneakerId = target.dataset.sneakerId;
    let isLiked = target.dataset.isLike === "true";

    fetch(`https://eb69a78f009caf67.mokky.dev/sneakers/${sneakerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLike: !isLiked }),
    })
      .then((response) => response.json())
      .then((data) => {
        target.dataset.isLike = String(!isLiked);
        target.setAttribute(
          "src",
          `./images/${isLiked ? "like-2.svg" : "like-1.svg"}`
        );
      })
      .catch((error) =>
        console.log("Произошла ошибка при Patch запросе: ", error)
      );
  }
});

fetchData("https://eb69a78f009caf67.mokky.dev/sneakers").then((data) =>
  renderSneakers(data)
);




// let nameInput = document.getElementById("name");
// let btn = document.getElementById("submit");

// btn.addEventListener("click", function () {
//   let nameValue = nameInput.value;
//   return fetch("https://8251bd1746791081.mokky.dev/favorites", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: nameValue }),
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//     .catch((err) => console.log(err));
// });
