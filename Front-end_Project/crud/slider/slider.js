const URL = "http://localhost:4000/sliders";

let slider = $(".sliders-table");
let infoFromAPI = [];

$(document).ready(async () => {
  let result = await fetch(URL);
  let sliders = await result.json();

  infoFromAPI = sliders;

  slider.empty();

  sliders.forEach((element) => {
    slider.append(`<tr>
	<td>${element.id}</td>
	<td>
		${element.header}
	</td>
	<td>${element.paragraph}</td>
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
      form.find(`input[name="${key}"]`).val(value);
    });
  });
});

//post
$(".add-new-slider-form").submit(async (e) => {
  e.preventDefault();

  const header = $('input[name="header"]');
  const headerError = $("#header-error-delete");
  if (!header.val() || header.val().length > 100) {
    headerError.show();
    return;
  } else {
    headerError.hide();
  }

  const paragraph = $('input[name="paragraph"]');
  const paragraphError = $("#paragraph-error-delete");
  if (!paragraph.val() || paragraph.val().length > 100) {
    paragraphError.show();
    return;
  } else {
    paragraphError.hide();
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

  const header = $("#input-header-edit");
  const headerError = $("#header-error-edit");
  if (!header.val() || header.val().length > 100) {
    headerError.show();
    return;
  } else {
    headerError.hide();
  }

  const paragraph = $("#input-paragraph-edit");
  const paragraphError = $("#paragraph-error-edit");
  if (!paragraph.val() || paragraph.val().length > 100) {
    paragraphError.show();
    return;
  } else {
    paragraphError.hide();
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
