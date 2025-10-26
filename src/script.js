const slider = document.getElementById("productSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const filterBtns = document.querySelectorAll(".filter-btn");
const homeImage = document.getElementById("home-image");
const bgColor = document.getElementById("home-bg-color");
const homeContent = document.getElementById("home-content");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const homeSection = document.getElementById("home");
const productsGallery = document.getElementById("gallery");
import products from "./data.js";
const slides = [
  {
    h1: "MacTech – Your Trusted Grandstream Seller in Doha, Qatar",
    p: "At MacTech, we provide the latest Grandstream IP Phones and PBX Systems with reliable service and professional installation, ensuring smooth business communication from day one.",
    bgColor: "#295288",
    img: "./src/img/gxp2140left.webp",
    cardImage: "./src/img/wp810_front_web.webp",
  },
  {
    h1: "Advanced IP Telephony Solutions for Every Business",
    p: "Grandstream devices are known for excellent sound quality, easy-to-use designs, and full compatibility with most VoIP PBX systems, making them perfect for every business size.",
    bgColor: "#f25c21",
    img: "./src/img/wp810_front_web.webp",
    cardImage: "./src/img/GAC2570/gac2570 2 website.webp",
  },
  {
    h1: "High Quality, Competitive Prices, and Professional Installation",
    p: "Choosing Grandstream with MacTech means a perfect balance of quality and cost, supported by expert installation and technical assistance tailored to your company needs.",
    bgColor: "#295288",
    img: "./src/img/GAC2570/gac2570 2 website.webp",
    cardImage: "./src/img/gxp2140left.webp",
  },
];

let current = 0;

function showSlide(next) {
  // Slide out
  homeImage.classList.add("translate-x-[120%]");
  bgColor.classList.add("translate-x-full");
  homeContent.classList.add("translate-x-[-120%]");
  card2.querySelector("img").src = slides[next].cardImage;
  card2.classList.remove("rotate-70");
  card2.classList.add("duration-1200", "rotate-60");
  card1.classList.add(
    "duration-1200",
    "translate-x-[-300%]",
    "translate-y-[-200px]",
    "rotate-[-90deg]"
  );

  // بعد انتهاء الانيميشن (500ms)
  setTimeout(() => {
    // تغيير المحتوى
    homeImage.src = slides[next].img;
    bgColor.style.backgroundColor = slides[next].bgColor;
    homeContent.querySelector("h1").innerHTML = slides[next].h1;
    homeContent.querySelector("p").innerHTML = slides[next].p;
    card1.classList.remove("duration-1200");
    card2.classList.remove("duration-1200");
    card1.querySelector("img").src = slides[next].cardImage;

    // Slide in
    homeImage.classList.remove("translate-x-[120%]");
    homeImage.classList.add("translate-x-0");
    bgColor.classList.remove("translate-x-full");
    bgColor.classList.add("translate-x-0");
    homeContent.classList.remove("translate-x-[-120%]");
    homeContent.classList.add("translate-x-0");
    card1.classList.remove(
      "translate-x-[-300%]",
      "translate-y-[-200px]",
      "rotate-[-90deg]"
    );
    card2.classList.add("rotate-70");
    card2.classList.remove("rotate-60");

    current = next;
  }, 800); // نفس مدة transition
}

// الأسهم
document.getElementById("next-home").addEventListener("click", () => {
  let next = (current + 1) % slides.length;
  showSlide(next);
  resetAutoSlide();
});

document.getElementById("prev-home").addEventListener("click", () => {
  let next = (current - 1 + slides.length) % slides.length;
  showSlide(next);
  resetAutoSlide();
});
let startX = 0;

// بداية اللمس
homeSection.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

// نهاية اللمس
homeSection.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let deltaX = endX - startX;

  if (deltaX > 50) {
    // سحب لليمين -> رجوع (prev)
    let next = (current - 1 + slides.length) % slides.length;
    showSlide(next);
    resetAutoSlide();
  } else if (deltaX < -50) {
    // سحب لليسار -> تقدم (next)
    let next = (current + 1) % slides.length;
    showSlide(next);
    resetAutoSlide();
  }
});

let autoSlide;
// Auto Slide كل ثانيتين
function startAutoSlide() {
  autoSlide = setInterval(() => {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }, 15000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// تشغيل أولي
showSlide(0);
startAutoSlide();

// Prodects section Slider ( With balls )

const bestSellerSlider = document.querySelector("#best-seller-slider > div");
const bestSellerSlides = document.querySelectorAll(
  "#best-seller-slider > div > div"
);
const ball1 = document.getElementById("ball1");
const ball2 = document.getElementById("ball2");
let currentIndex = 0;
let swapped = false;
// تحديد مواقع البداية
ball1.style.top = "5rem";
ball1.style.left = "-6rem";

ball2.style.bottom = "10rem";
ball2.style.right = "-8rem";
function swapBalls() {
  const rect1 = ball1.getBoundingClientRect();
  const rect2 = ball2.getBoundingClientRect();

  const dx = rect2.left - rect1.left;
  const dy = rect2.top - rect1.top;

  if (!swapped) {
    ball1.style.transform = `translate3d(${dx}px, ${dy}px, 100px)`;
    ball2.style.transform = `translate3d(${-dx}px, ${-dy}px, -100px)`;
  } else {
    ball1.style.transform = `translate3d(0px, 0px, 0px)`;
    ball2.style.transform = `translate3d(0px, 0px, 0px)`;
  }

  swapped = !swapped;
}

function updateSlider() {
  bestSellerSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// زر التالي
document.getElementById("next-best-seller").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % bestSellerSlides.length;
  swapBalls();
  updateSlider();
});

// زر السابق
document.getElementById("prev-best-seller").addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + bestSellerSlides.length) % bestSellerSlides.length;
  swapBalls();
  updateSlider();
});

// add products

products.forEach((item) => {
  // div الرئيسي
  const productDiv = document.createElement("div");
  productDiv.className =
    "flex flex-col gap-5 snap-start product cursor-pointer";
  productDiv.dataset.id = item.id;
  productDiv.dataset.category = item.category;

  // div الصورة
  const imageDiv = document.createElement("div");
  imageDiv.className = "w-full aspect-square bg-white p-4 md:p-8 rounded-sm";

  const img = document.createElement("img");
  img.src = item.images[0];
  imageDiv.appendChild(img);

  const div = document.createElement("div");
  div.className = "flex flex-col gap-0.5 font-[500] mb-5";

  // p النص
  const p = document.createElement("p");
  p.className = "text-primary-black";
  p.textContent = "Grandstream " + item.name;

  // Price
  const span = document.createElement("span");
  span.className = "text-mint-green m-0";
  span.textContent = item.price;

  // ربط العناصر
  productDiv.appendChild(imageDiv);
  div.appendChild(p);
  div.appendChild(span);
  productDiv.appendChild(div);

  // إضافة للصفحة
  slider.appendChild(productDiv.cloneNode(true));
  imageDiv.classList.remove("bg-white");
  imageDiv.classList.add("bg-light-gray");
  productsGallery.appendChild(productDiv);
});

const galleryItems = document.querySelectorAll("#gallery div[data-category]");

// Gallery

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("text-primary-orange"));

    btn.classList.add("text-gray-600");

    const filter = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Product scroller
const scrollStep = slider.offsetWidth * 0.8; // scroll by 80% of container width

nextBtn.addEventListener("click", () => {
  slider.scrollBy({ left: scrollStep, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollStep, behavior: "smooth" });
});

// Href to product.html
document.querySelectorAll(".product").forEach((item) => {
  item.addEventListener("click", () => {
    const productId = item.getAttribute("data-id");
    window.location.href = `product.html?id=${productId}`;
  });
});
