var images = [
  "https://i.imgur.com/2Z8qEvC.png",
  "https://i.imgur.com/2Xntz2P.jpg",
  "https://i.imgur.com/pIGcI2d.jpg",
  "https://i.imgur.com/n5lNz3z.jpg",
  "https://i.imgur.com/tup8Ocu.jpg",
  "https://i.imgur.com/yjpOvlM.jpg",
  "https://i.imgur.com/akNhnrh.jpg",
  "https://i.imgur.com/eqpDlh5.jpg",
  "https://i.imgur.com/ARqnwlQ.jpg",
  "https://i.imgur.com/2lJ6xLl.jpg",
  "https://i.imgur.com/kGQUUTw.jpg",
  "https://i.imgur.com/o4LuRu7.jpg",
  "https://i.imgur.com/CnDPSpV.png",
  "https://i.imgur.com/E0s8TW6.png",
  "https://i.imgur.com/xSmJv0k.png",
];

function getRandomImage() {
  var index = Math.floor(Math.random() * images.length);
  var image = images[index];
  var displayElement = document.getElementById("display");
  displayElement.src = image;
  displayElement.style.display = "block";
}

var memeButton = document.getElementById("memeButton");
memeButton.addEventListener("click", getRandomImage);

async function fetchVisitorCount() {
  try {
    const response = await fetch("/api");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log(data);

    document.getElementById(
      "visitorCount"
    ).textContent = `Visits: ${data.count}`;
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchVisitorCount();
