
const clientDetailsElement = document.querySelector("#client-details");
let cart = [];
let total = 0;

const pizzaOrders = JSON.parse(window.localStorage.getItem("order"));

const displayOrderList = ()=>{
  if(pizzaOrders === null){
    return;
  }
  pizzaOrders.map(order=>{addToCart(order.name, order.price)});
}

displayOrderList();

function addToCart(itemName, price) {
  let item = {
    name: itemName,
    price: price,
  };
  cart.push(item);
  total += price;

  // Update the cart table
  let table = document.querySelector("#cart table tbody");
  let row = table.insertRow();
  let nameCell = row.insertCell();
  let priceCell = row.insertCell();
  nameCell.textContent = itemName;
  priceCell.textContent = price.toFixed(2);

  // Update the total
  let totalElement = document.getElementById("total");
  totalElement.textContent = total.toFixed(2);
}

function getCurrentLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        "accept-language": "en",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const city =
        data.address.town || data.address.city || data.address.village;

      if (city.length > 0) {
        console.log(city);
        document.querySelector("#input-city").value = city;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function error(error) {
  console.error(error);
}

navigator.geolocation.getCurrentPosition(getCurrentLocation, error);

clientDetailsElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = document.querySelector("#input-name").value;
  const lastName = document.querySelector("#input-surname").value;
  const email = document.querySelector("#input-email").value;
  const city = document.querySelector("#input-city").value;
  const address = document.querySelector(`#input-location-address`).value;
  const local = document.querySelector(`#input-location-local`).value;

  const newOrder = {
    date: date(),
    customer: {
      name: firstName,
      surname: lastName,
      email: email,
      address: {
        city: city,
        street: address,
        local: local,
      },
      order: pizzaOrders
    },
  };

  window.localStorage.removeItem("orderList")
  console.log(newOrder);


  fetch("http://localhost:9000/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder, null, 2),
  });
  alert("You will get pizzas in 1 hour");
  window.location.href = "/list";
});

const date = function () {
  const currentDate = new Date();
  const yearOrder = currentDate.getFullYear();
  const monthOrder = currentDate.getMonth() + 1;
  const dayOrder = currentDate.getDate();
  const hoursOrder = currentDate.getHours();
  const minutesOrder = currentDate.getMinutes();
  return {
    year: yearOrder,
    month: monthOrder,
    day: dayOrder,
    hour: hoursOrder,
    minute: minutesOrder,
  };
};
console.log(date());
