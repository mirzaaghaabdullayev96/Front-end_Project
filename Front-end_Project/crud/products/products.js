const URL = "http://localhost:3000/products";
const categoriesURL = "http://localhost:3000/categories";
let selectOptions = $(".my-select-options");

let productTable = $(".products-table");
let infoFromAPI = [];

function isNumber(value) {
  return !isNaN(Number(value)) && Number(value) >= 0;
}

let categories = [];

$(document).ready(async () => {
  let result = await fetch(URL);
  let products = await result.json();

  await fetch(categoriesURL)
    .then((data) => data.json())
    .then((x) => (categories = x));

  categories.forEach((element) => {
    selectOptions.append(
      `<option value="${element.name}">${element.name}</option>`
    );
  });

  infoFromAPI = products;

  productTable.empty();

  products.forEach((element) => {
    productTable.append(`<tr>
	<td>${element.id}</td>
	<td>
		${element.name}
	</td>
  <td>${element.price}</td>
  <td>${element.category}</td>
	<td>${element.image_src}</td>
	<td>
		<a href="#editSliderModal" class="edit edit-sliiders" data-toggle="modal" data-edit-slider-id=${element.id}
			><i
				class="material-icons"
				data-toggle="tooltip"
				title="Edit"
				>&#xE254;</i
			></a
		>
		<a
			href="#deleteSliderModal"			
			class="delete"
			data-toggle="modal"
			data-delete-slider-id=${element.id}
			><i
				class="material-icons"
				data-toggle="tooltip"
				title="Delete"
				>&#xE872;</i
			></a
		>
	</td>
</tr>
      `);
  });

  $(".delete").click(function () {
    const sliderId = $(this).data("delete-slider-id");
    $("#deleteSliderModal").data("div-delete-id", sliderId);
  });

  $(".edit").click(function () {
    const sliderId = $(this).data("edit-slider-id");
    $("#editSliderModal").data("div-edit-id", sliderId);

    const foundSlider = infoFromAPI.find(
      (x) => x.id == $(this).data("edit-slider-id")
    );
    const form = $(".edit-slider-form");

    Object.entries(foundSlider).forEach(([key, value]) => {
      if (key === "category") {
        form.find(`select[name="${key}"]`).val(value);
      } else {
        form.find(`input[name="${key}"]`).val(value);
      }
    });
  });
});

//post
$(".add-new-slider-form").submit(async (e) => {
  e.preventDefault();

  const name = $("#input-name-add");
  const nameError = $("#name-error-add");
  if (!name.val() || name.val().length > 50) {
    nameError.show();
    return;
  } else {
    nameError.hide();
  }

  const price = $("#input-price-add");
  const priceError = $("#price-error-add");

  if (!price.val() || price.val().length > 3 || !isNumber(price.val())) {
    priceError.show();
    return;
  } else {
    priceError.hide();
  }

  const category = $("#input-category-add");
  const categoryError = $("#category-error-add");
  if (category.val() === "Categories") {
    categoryError.show();
    return;
  } else {
    categoryError.hide();
  }

  const formData = new FormData(e.target);
  const product = Object.fromEntries(formData.entries());
  let maxId = infoFromAPI.length ? infoFromAPI[infoFromAPI.length - 1].id : 0;
  product.id = (Number(maxId) + 1).toString();
  product.price = Number(product.price);

  // if(productsByCategory.length>0){
  //   await fetch(`${URL}/${element.id}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ products_count: productsByCategory.length})
  //   });
  // }

  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(product),
  });
});

//delete
$(".delete-slider-form").submit(async (e) => {
  e.preventDefault();

  const sliderId = $("#deleteSliderModal").data("div-delete-id");

  await fetch(`${URL}/${sliderId}`, {
    method: "DELETE",
  });
});

//put
$(".edit-slider-form").submit(async (e) => {
  e.preventDefault();

  const name = $("#input-name-edit");
  const nameError = $("#name-error-edit");
  if (!name.val() || name.val().length > 50) {
    nameError.show();
    return;
  } else {
    nameError.hide();
  }

  const price = $("#input-price-edit");
  const priceError = $("#price-error-edit");
  if (!price.val() || price.val().length > 3 || !isNumber(price.val())) {
    priceError.show();
    return;
  } else {
    priceError.hide();
  }

  const category = $("#input-category-edit");
  const categoryError = $("#category-error-edit");
  if (category.val() === "Categories") {
    categoryError.show();
    return;
  } else {
    categoryError.hide();
  }
  const sliderId = $("#editSliderModal").data("div-edit-id");

  const formData = new FormData(e.target);
  const product = Object.fromEntries(formData.entries());

  const foundSlider = infoFromAPI.find((x) => x.id == sliderId);

  Object.entries(product).forEach(([key, value]) => {
    foundSlider[key] = value;
  });

  foundSlider.price = Number(foundSlider.price);

  await fetch(`${URL}/${sliderId}`, {
    method: "PUT",
    body: JSON.stringify(foundSlider),
  });
});
