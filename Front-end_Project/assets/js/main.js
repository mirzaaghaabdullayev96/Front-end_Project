let mySliders = $("#carousel-id");
const URL = "http://localhost:3000/sliders";
console.log(mySliders)

$(document).ready(async () => {
  let result = await fetch(URL);
  let sliders = await result.json();
  sliders.forEach((element) => {
    mySliders.append(`<div class="carousel-item" data-bs-interval="3500" data-id=${element.id}>
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
    </div>`)
  });
});
