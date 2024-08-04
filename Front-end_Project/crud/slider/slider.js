const URL = "http://localhost:3000/sliders";

let slider = $(".sliders-table");

$(document).ready(async () => {
  let result = await fetch(URL);
  let sliders = await result.json();

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
		<a href="#editEmployeeModal" class="edit" data-toggle="modal"
			><i
				class="material-icons"
				data-toggle="tooltip"
				title="Edit"
				>&#xE254;</i
			></a
		>
		<a
			href="#deleteEmployeeModal"			
			class="delete"
			data-toggle="modal"
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
});
