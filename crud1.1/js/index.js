// VALIDATION

function validateForm() {
  //   var image = document.getElementById("image").value;
  const image = document.getElementById("image");
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  if (!image) {
    alert("Image is required");
    return false;
  }

  // const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  // if (!allowedTypes.includes(image.type)) {
  //   alert("Please upload an image file (JPEG, PNG, GIF).");
  //   return false;
  // }

  if (title == "") {
    alert("Title is required");
    return false;
  }

  if (description == "") {
    alert("Description is required");
    return false;
  }

  if (price == "") {
    alert("Price is required");
    return false;
  } else if (price < 1) {
    alert("Price must not be zero or less than zero");
    return false;
  }
  return true;
}


function addData() {
  const selectedFile = document.getElementById("image").files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    const imageDataUrl = event.target.result;
    const newTraining = {
      image: imageDataUrl,
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
    };
    let trainingsList;
    if (localStorage.getItem("trainingsList") == null) {
      trainingsList = [];
    } else {
      trainingsList = JSON.parse(localStorage.getItem("trainingsList"));
    }
    trainingsList.push(newTraining);
    localStorage.setItem("trainingsList", JSON.stringify(trainingsList));
    showData();
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = null;
  };
  reader.readAsDataURL(selectedFile);
}



// SHOW DATA

function showData() {
  let trainingsList;
  if (localStorage.getItem("trainingsList") == null) {
    trainingsList = [];
  } else {
    trainingsList = JSON.parse(localStorage.getItem("trainingsList"));
  }

  let html = "";

 

  trainingsList.forEach(function (element, index) {
    html += `
      <div class="col-lg-4 col-md-6 my-3 d-flex flex-wrap">
      <div class="card ">
      ${element.image ? `<img src="${element.image}" class="card-img-top mb-3" alt="">` : ''}
      <div class="card-body">
        <h4 class="card-title">${element.title}</h4>
        <p class="card-text">${element.description}</p>
        <span class="text-success">${element.price} €</span>
        <div class="mt-3">
        <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
        <button onclick="updateData(${index})" class="btn btn-warning">Update</button>
        </div>
      </div>
    </div>
    </div>
       `;
  });

  document.querySelector("#crudCard .row").innerHTML = html;
}

document.onload = showData();


// DELETE DATA

function deleteData(index) {
  let trainingsList;
  if (localStorage.getItem("trainingsList") == null) {
    trainingsList = [];
  } else {
    trainingsList = JSON.parse(localStorage.getItem("trainingsList"));
  }

  trainingsList.splice(index, 1);
  localStorage.setItem("trainingsList", JSON.stringify(trainingsList));
  showData();
}

// UPDATE DATA

function updateData(index) {
  
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  let trainingsList;
  if (localStorage.getItem("trainingsList") == null) {
    trainingsList = [];
  } else {
    trainingsList = JSON.parse(localStorage.getItem("trainingsList"));
  }

  document.getElementById("image").onchange = function (event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageDataUrl = event.target.result;
      trainingsList[index].image = imageDataUrl;
    };
    reader.readAsDataURL(selectedFile);
  };
  document.getElementById("title").value = trainingsList[index].title;
  document.getElementById("description").value =
    trainingsList[index].description;
  document.getElementById("price").value = trainingsList[index].price;

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      // document.getElementById("image").setAttribute("src", trainingsList[index].image);
      trainingsList[index].title = document.getElementById("title").value;
      trainingsList[index].description =
        document.getElementById("description").value;
      trainingsList[index].price = document.getElementById("price").value;

      const selectedFile = document.getElementById('image').files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
          trainingsList[index].image = event.target.result;
          localStorage.setItem("trainingsList", JSON.stringify(trainingsList));
          showData();
        };
        reader.readAsDataURL(selectedFile);
      } else {
        localStorage.setItem("trainingsList", JSON.stringify(trainingsList));
        showData();
      }
      document.getElementById("image").value = "";
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("price").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}


