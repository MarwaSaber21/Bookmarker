let urlName = document.getElementById("urlName");
let url = document.getElementById("url");
let searchInput = document.getElementById("floatingInput");
let updateBtn = document.getElementById("updateBtn");

var indexItem = 0;
let urlList = [];

if (localStorage.getItem("products") !== null) {
  urlList = JSON.parse(localStorage.getItem("products"));
  displayURL();
}

// function addURL() {
//   if (validationName() && validationURL()) {
//     let product = { productName: urlName.value, productURL: url.value };
//     console.log(product.productURL);
//     urlList.push(product);
//     localStorage.setItem("products", JSON.stringify(urlList));
//     displayURL();
//     clearAll();
//   }
// }

function showValidationModal() {
  //let modalBody = document.getElementById("modalBody");
  document.getElementById(
    "modalBody"
  ).innerHTML = `<p class="mess-modal pb-1"> Site Name or Url is not valid, Please follow the
  rules
  below :</p>
<p class="nameMess"><i class="fa-regular fa-circle-right p-2"></i> Site name
  must
  contain at least 3
  characters
</p>
<p class="nameMess"><i class="fa-regular fa-circle-right p-2"></i> Site URL must
  be
  a valid one</p>`;
}

function showDublicationModal() {
  document.getElementById(
    "modalBody"
  ).innerHTML = `<p class="mess-modal pb-1"> Product name already exists! <br />
  Enter Another Name ...</p>`;
}

function addURL() {
  let product = { productName: urlName.value, productURL: url.value };
  if (!urlName.value || !url.value) {
    showValidationModal();
    const modalElement = new bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    modalElement.show();
    return;
  }
  if (validationName() && validationURL()) {
    console.log("hello");
    let duplicateFound = false;
    for (let i = 0; i < urlList.length; i++) {
      if (urlList[i].productName === urlName.value) {
        duplicateFound = true;
        break;
      }
    }
    if (!duplicateFound) {
      urlList.push(product);
      localStorage.setItem("products", JSON.stringify(urlList));
      displayURL();
      clearAll();
    } else {
      showDublicationModal();
      const modalElement = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modalElement.show();
    }
  } else {
    showValidationModal();
    const modalElement = new bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    modalElement.show();
  }
}

function visitProduct(index) {
  var regexUUrl = /^https?:\/\//;
  if (regexUUrl.test(urlList[index].productURL)) {
    window.open(urlList[index].productURL, "_blank");
  } else {
    window.open(`https://${urlList[index].productURL}`, "_blank");
  }

  window.open(urlList[index].productURL, "_blank");
}
function clearAll() {
  urlName.value = "";
  url.value = "";

  urlName.classList.remove("is-valid");
  url.classList.remove("is-valid");
}
function deleteProduct(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#4db748",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      urlList.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(urlList));
      displayURL();
    }
  });
}
function displayURL() {
  let contentBox = "";

  for (let i = 0; i < urlList.length; i++) {
    contentBox += `
    <tr>
    <td>${i + 1}</td>
    <td class="text-capitalize">${urlList[i].productName}</td>
    <td>
    <button onclick="visitProduct(${i})" class="btn visitBtn text-light"><i class="fa-solid fa-eye pe-1"></i> Visit</button></td>
    <td><button onclick="updateProduct(${i})" class="btn updateBtn text-light"><i class="fa fa-edit"></i> Update</button></td>
    <td><button onclick="deleteProduct(${i})" id="deleteModal" class="text-light btn deleteBtn"><i
                class="fa-solid fa-trash-can pe-1"></i>
            Delete</button></td>
</tr>
   
    `;
  }

  document.getElementById("tableData").innerHTML = contentBox;
}
function searchName() {
  let searchIn = searchInput.value;

  contentBox = "";
  for (let i = 0; i < urlList.length; i++) {
    if (urlList[i].productName.toLowerCase().includes(searchIn.toLowerCase())) {
      contentBox += `
                <tr>
                <td>${i + 1}</td>
                <td class="text-capitalize">${urlList[i].productName}</td>
                <td>
                <button onclick="visitProduct(${i})" class="btn visitBtn text-light"><i class="fa-solid fa-eye pe-1"></i> Visit</button></td>

    <td><button onclick="updateProduct(${i})" class="btn updateBtn text-light"><i class="fa fa-edit"></i> Update</button></td>
                
                <td><button onclick="deleteProduct(${i})" class="text-light btn deleteBtn"><i
                            class="fa-solid fa-trash-can pe-1"></i>
                        Delete</button></td>
            </tr>

                `;
    }
  }
  document.getElementById("tableData").innerHTML = contentBox;
}

function validationName() {
  var text = urlName.value;
  var regex = /^([A-Z]|[a-z]){3,}$/;
  if (regex.test(text)) {
    urlName.classList.add("is-valid");
    urlName.classList.remove("is-invalid");

    return true;
  } else {
    urlName.classList.add("is-invalid");
    urlName.classList.remove("is-valid");

    return false;
  }
}

function validationURL() {
  var text = url.value;
  var regex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if (regex.test(text)) {
    url.classList.add("is-valid");
    url.classList.remove("is-invalid");

    return true;
  } else {
    url.classList.add("is-invalid");
    url.classList.remove("is-valid");

    return false;
  }
}

function updateProduct(index) {
  urlName.value = urlList[index].productName;
  url.value = urlList[index].productURL;

  submitBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");

  indexItem = index;
}

function updateURL() {
  let product = { productName: urlName.value, productURL: url.value };

  if (validationName() && validationURL()) {
    let duplicateFound = false;
    for (let i = 0; i < urlList.length; i++) {
      if (urlList[i].productName === urlName.value) {
        duplicateFound = true;
        break;
      }
    }
    if (!duplicateFound) {
      urlList.splice(indexItem, 1, product);
      localStorage.setItem("products", JSON.stringify(urlList));

      submitBtn.classList.remove("d-none");
      updateBtn.classList.add("d-none");

      displayURL();
      clearAll();
    } else {
      showDublicationModal();
      const modalElement = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modalElement.show();
    }
  } else {
    showValidationModal();
    const modalElement = new bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    modalElement.show();
  }
}
