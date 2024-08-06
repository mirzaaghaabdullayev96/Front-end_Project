const URL = "http://localhost:3000/categories";
const productsURL = "http://localhost:3000/products";

let categoryTable = $(".categories-table");
let infoFromAPI = [];

$(document).ready(async (e) => {
  let result = await fetch(URL);
  let categories = await result.json();

  let getProducts = await fetch(productsURL);
  let products = await getProducts.json();

  infoFromAPI = categories;

  categoryTable.empty();

  categories.forEach((element) => {



    let productsByCategory = products.filter(
      (x) => x.category === element.name
    );

    // if(productsByCategory.length>0){
    //   await fetch(`${URL}/${element.id}`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ products_count: productsByCategory.length})
    //   });
    // }


    categoryTable.append(`<tr>
	<td>${element.id}</td>
	<td>
		${element.name}
	</td>
	<td>${element.image_src}</td>
  <td>${productsByCategory.length === 0 ? 0 : productsByCategory.length}</td>
	<td>
		<a href="#editSliderModal" class="edit edit-sliiders" data-toggle="modal" data-edit-slider-id=${
      element.id
    }
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
      form.find(`input[name="${key}"]`).val(value);
    });
  });
});

//post
$(".add-new-slider-form").submit(async (e) => {
  e.preventDefault();

  const header = $("#input-name-add");
  const headerError = $("#header-error-delete");
  if (!header.val() || header.val().length > 50) {
    headerError.show();
    return;
  } else {
    headerError.hide();
  }

  const formData = new FormData(e.target);
  const product = Object.fromEntries(formData.entries());
  let maxId = infoFromAPI.length ? infoFromAPI[infoFromAPI.length - 1].id : 0;
  product.id = (Number(maxId) + 1).toString();
  
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

  const header = $("#input-name-edit");
  const headerError = $("#header-error-edit");
  if (!header.val() || header.val().length > 50) {
    headerError.show();
    return;
  } else {
    headerError.hide();
  }

  const sliderId = $("#editSliderModal").data("div-edit-id");

  const formData = new FormData(e.target);
  const product = Object.fromEntries(formData.entries());

  const foundSlider = infoFromAPI.find((x) => x.id == sliderId);

  Object.entries(product).forEach(([key, value]) => {
    foundSlider[key] = value;
  });

  await fetch(`${URL}/${sliderId}`, {
    method: "PUT",
    body: JSON.stringify(foundSlider),
  });
});
