const inputValue = document.querySelector("input");
const button = document.querySelector("button");
const view = document.querySelectorAll(".view");

let map = L.map("map").setView([22.3039, 70.8022], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 100,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
let marker = null;

const getData = function () {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_p7hSsUUmKtGTCs2ognLo09bD7rgSk&ipAddress=${inputValue.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.code == 422) {
        alert("Input correct IPv4 or IPv6 address. code 422");
      } else {
        view[0].innerText = data.ip;
        view[1].innerText =
          data.location.city +
          ", " +
          data.location.region +
          ", " +
          data.location.country;
        view[2].innerText = data.location.timezone;
        view[3].innerText = data.isp;

        if (marker) {
          map.removeLayer(marker);
        }

        map.flyTo([data.location.lat, data.location.lng], 13);
        marker = L.marker([data.location.lat, data.location.lng]);
        marker.addTo(map);

        marker.bindPopup(
          data.location.city +
            ", " +
            data.location.region +
            ", " +
            data.location.country
        );
        marker.addEventListener("click", () => {
          map.flyTo([data.location.lat, data.location.lng], 13);
        });
        console.log(data);
      }
    });
};

button.addEventListener("click", getData);
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getData();
  }
});

getData();
