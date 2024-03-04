fetch("https://5c782080f150df17.mokky.dev/items");

function fetchData(api) {
  return fetch(api)
    .then((response) => response.json())
    .catch((error) => console.error("У тебя ошибка", error));
}

function renderSneakers(data) {
  let wrapper = document.querySelector(".sneakers__wrapper");
  wrapper.innerHTML = data
    .map((item) => {
      return `
        <div class="sneakers-card">
            <button class="sneakers__card-like">
              <img src="../Shop/img/images/like-1.svg" alt="" />
            </button>

            <img src="../Shop/img/images/${item.imageUrl}" alt="" /><img
              src=""
              alt=""
              class="sneakers__card-img"
            />
            <h4 class="sneakers__card-title">
              ${item.title}
            </h4>
            <div class="sneakers__card-actions">
                <div class="sneakers__action-price">
                    <b>Цена</b>
                    <b>${item.price}$</b>
                </div>
                <button class="sneakers__action-cart">
                    <img src="../Shop/img/images/plus.svg" alt="">
                </button>
            </div>
          </div>`;
    })
    .join("");
}

fetchData("https://5c782080f150df17.mokky.dev/items").then((data) =>
  renderSneakers(data)
);
