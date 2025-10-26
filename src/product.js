import products from "./data.js";

const mainImage = document.getElementById("mainImage");

function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const productId = getQueryParam("id");
const product = products.find((p) => p.id == productId);

if (product) {
  document.querySelectorAll("h1").forEach((item) => {
    item.innerText = product.name;
  });
  document.getElementById("product-desc").innerHTML = product.desc;
  const ul = document.getElementById("product-list");
  product.list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  mainImage.src = product.images[0];
  const imagesDiv = document.getElementById("thumbSlider");
  product.images.forEach((item) => {
    const img = document.createElement("img");
    img.src = item;
    img.classList.add(
      "thumb",
      "w-20",
      "h-20",
      "object-cover",
      "rounded-lg",
      "cursor-pointer",
      "border-2",
      "flex-shrink-0"
    );
    imagesDiv.appendChild(img);
  });
  document.getElementById("pdf-button").href = product.pdf;
  if (product.youtube != "") {
    document.getElementById("youtube").querySelector("iframe").src =
      product.youtube;
  } else {
    document.getElementById("youtube").classList.add("hidden");
  }
} else {
  document.body.innerHTML = "<h2>Product not found.</h2>";
}

// Images

const thumbnails = document.querySelectorAll(".thumb");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const images = Array.from(thumbnails).map((t) => t.src);
let currentIndex = 0;

// تغيير الصورة عند الضغط على thumbnail
thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    currentIndex = index;
    updateMainImage();
  });
});

// أزرار التنقل
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateMainImage();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateMainImage();
});

// السحب بالإصبع على الموبايل
let startX = 0;
mainImage.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

mainImage.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    // swipe left
    currentIndex = (currentIndex + 1) % images.length;
  } else if (endX - startX > 50) {
    // swipe right
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }
  updateMainImage();
});

function updateMainImage() {
  mainImage.src = images[currentIndex];
  thumbnails.forEach((t) => t.classList.remove("border-blue-500"));
  thumbnails[currentIndex].classList.add("border-blue-500");
}

// Whatsapp button
const phone = "50730728";
const productLink = window.location.href;

const btn = document.getElementById("whatsapp-btn");
btn.addEventListener("click", () => {
  const message = `Hey I want to order this item (ID: ${productId}) : ${productLink}`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});
