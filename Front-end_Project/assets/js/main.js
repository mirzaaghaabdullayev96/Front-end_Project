let mySliders = $("#carousel-id");
let cardsCategories = $("#cards-row");
let myProducts = $("#my-products-table");
let listOfCategories = $("#my-categories-list");
let searchForm=$("#search-form-top")
let searchInput=$("#search-input-top")

const slidersURL = "http://localhost:3000/sliders";
const categoriesURL = "http://localhost:3000/categories";
const productsURL = "http://localhost:3000/products";

let categoriesArr = [];
let productsArr = [];
let sliderdsArr = [];

$(document).ready(async () => {
  let resultSliders = await fetch(slidersURL);
  let sliders = await resultSliders.json();
  sliderdsArr = sliders;

  let resultCategories = await fetch(categoriesURL);
  let categories = await resultCategories.json();
  categoriesArr = categories;

  let resultProducts = await fetch(productsURL);
  let products = await resultProducts.json();
  productsArr = products;

  // rendering sliders
  sliders.forEach((element) => {
    mySliders.append(`<div class="carousel-item" data-bs-interval="3500" data-slider-id=${element.id}>
      <div
        class="my-carousel-inner-data"
        style="
          background-image: url(${element.image_src});
        "
      >
        <div class="slider-content">
          <h1 class="display-2 mb-40">
          ${element.header}
          </h1>
          <p class="mb-65">${element.paragraph}</p>
          <form class="form-subcriber d-flex form-carousel">
            <input
              type="email"
              placeholder="Your emaill address"
              id="subscribe-input"
            />
            <button class="btn carousel-btn" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>`);
  });

  //rendering categories
  categories.forEach((element) => {
    let productsByCategory = products.filter(
      (x) => x.category === element.name
    );

    listOfCategories.append(`<option>${element.name}</option>`);

    cardsCategories.append(`<div class="card-2 my-featured-cards">
              <figure class="img-hover-scale overflow-hidden">
                <a><img src="${
                  element.image_src
                }" class="my-images-size-same" alt="..."  /></a>
              </figure>
              <h6><a>${element.name}</a></h6>
              <span>${
                productsByCategory.length === 0 ? 0 : productsByCategory.length
              }</span>
            </div>`);
  });

  //rendering products
  products.forEach((x) => {
    myProducts.append(`
 <div class="col-lg-1-5" id="my-products-table">
 <div class="product-cart-wrap">
 <div class="product-img-action-wrap">
  <div class="product-img product-img-zoom">
    <a>
      <img
        class="default-img my-images-size-same-products"
        src=${x.image_src}
        alt=""
      />
    </a>
  </div>
 </div>
 <div class="product-content-wrap">
  <div class="product-category">
    <a>${x.category}</a>
  </div>
  <h2>
    <a>${x.name}</a>
  </h2>

  <div class="product-card-bottom">
    <div class="product-price">
      <span>${x.price} &#8380</span>
    </div>
    <div class="add-cart">
      <a class="add">Add </a>
    </div>
  </div>
 </div>
 </div>`);
  });
});


listOfCategories.on("change", function(e) {
  let productsByCategory = productsArr.filter(
    (x) => x.category === e.target.value
  );
  myProducts.empty();
  
  productsByCategory.forEach((x) => {
    myProducts.append(`
  <div class="col-lg-1-5" id="my-products-table">
  <div class="product-cart-wrap">
  <div class="product-img-action-wrap">
    <div class="product-img product-img-zoom">
      <a>
        <img
          class="default-img my-images-size-same-products"
          src=${x.image_src}
          alt=""
        />
      </a>
    </div>
  </div>
  <div class="product-content-wrap">
    <div class="product-category">
      <a>${x.category}</a>
    </div>
    <h2>
      <a>${x.name}</a>
    </h2>
  
    <div class="product-card-bottom">
      <div class="product-price">
        <span>${x.price} &#8380</span>
      </div>
      <div class="add-cart">
        <a class="add">Add </a>
      </div>
    </div>
  </div>
  </div>`);
  });
});


searchForm.on("submit",(e)=>{
  e.preventDefault();
  let myFilteredProducts = productsArr.filter((product) =>
    product.name.toLowerCase().includes(searchInput.val().toLowerCase())
  );

  myProducts.empty();
  
  myFilteredProducts.forEach((x) => {
    myProducts.append(`
  <div class="col-lg-1-5" id="my-products-table">
  <div class="product-cart-wrap">
  <div class="product-img-action-wrap">
    <div class="product-img product-img-zoom">
      <a>
        <img
          class="default-img my-images-size-same-products"
          src=${x.image_src}
          alt=""
        />
      </a>
    </div>
  </div>
  <div class="product-content-wrap">
    <div class="product-category">
      <a>${x.category}</a>
    </div>
    <h2>
      <a>${x.name}</a>
    </h2>
  
    <div class="product-card-bottom">
      <div class="product-price">
        <span>${x.price} &#8380</span>
      </div>
      <div class="add-cart">
        <a class="add">Add </a>
      </div>
    </div>
  </div>
  </div>`);
  });
  searchInput.val('');
})
