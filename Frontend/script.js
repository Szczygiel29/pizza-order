const allergentElement = document.querySelector("#allergent");
const pizzaListElement = document.querySelector("#pizzaList");


async function getPizza() {
  const response = await fetch(`http://localhost:9000/api/pizza`, {
    method: "GET",
  });
  return await response.json();
}

const pizzaList = await getPizza();

async function getAllergen() {
  const response = await fetch(`http://localhost:9000/api/allergen`, {
    method: "GET",
  });
  return await response.json();
}

const allergentList = await getAllergen();

function createElement(tagName, id, className, content) {
  const button = document.createElement(tagName);
  button.id = id;
  button.textContent = content;
  button.classList.add(className);
  return button;
}

function pizzaDescription() {
  const pizzaConteiner = [];
  console.log(pizzaList.pizzas);
  pizzaList.pizzas.forEach((el) => {
    const plusButton = createElement("button", el.id, "plus", "+");
    const minusButton = createElement("button", el.id, "minus", "-");
    const quantitySpan = createElement("span", el.id, "quantity", "0");
    const buyButton = createElement("button", el.id, "BUY", "Order now");

    let quantity = 0;

    plusButton.addEventListener("click", function () {
      console.log(el.name);
      quantity++;
      quantitySpan.innerText = quantity;
      pizzaConteiner.push({
        name: el.name,
        price: el.price,
      });
    console.log(pizzaConteiner)
    });

    minusButton.addEventListener("click", function () {
      if (quantity > 0) {
        quantity--;
        quantitySpan.innerText = quantity;
       pizzaConteiner.pop()
      }
      console.log(pizzaConteiner);
    });

    buyButton.addEventListener("click", function () {
      console.log(pizzaConteiner);
      window.localStorage.setItem("order", JSON.stringify(pizzaConteiner));
      window.location.href = "/order";

    });
    const result = `<div id="${el.id}" class="pizza">
        <div id="allergens" style="visibility:hidden">${el.allergens}</div>
        <h3>${el.name}</h3>
        <p id="price"><strong>Price:&nbsp;</strong>${el.price}$</p>
        <p id="ingredients"><strong>Ingredients: &nbsp;</strong>${el.ingredients.join(", ")}</p>
        <p id="descriptions"><strong>Descriptions: &nbsp;</strong>${el.descriptions}</p>
        <img src="${el.image}" width="200" hight="300"></img>
    </div>`;
    // <button id="pizza ${el.id}">Order now</button>
    const container = document.createElement("div");
    container.id = "button";
    pizzaListElement.insertAdjacentHTML("beforeend", result);
    container.appendChild(plusButton);
    container.appendChild(quantitySpan);
    container.appendChild(minusButton);
    container.appendChild(buyButton);
    const pizza = document.querySelectorAll(".pizza");
    pizza.forEach((el) => {
      el.appendChild(container);
    });
  });
}

pizzaDescription();

function allergentButton() {
  allergentList.allergens.forEach((el) => {
    const result = document.createElement("button");
    result.id = el.id;
    result.className = "allergent";
    result.textContent = el.name;
    allergentElement.appendChild(result);
  });
}

allergentButton();

const buttonAllergent = document.querySelectorAll(".allergent");
const allergenElement = document.querySelectorAll("#allergens");
const pizzaElement = document.querySelectorAll(".pizza");

buttonAllergent.forEach((button) => {
  button.addEventListener("click", (event) => {
    button.classList.toggle("color");
    allergenElement.forEach((pizza, index) => {
      if (pizza.innerHTML.split(",").includes(event.target.id)) {
        console.log(pizzaElement[index]);
        pizzaElement[index].classList.toggle("none");
      }
    });
  });
});
