bookmarkName = document.getElementById("siteName");
websiteUrl = document.getElementById("websiteURL");
allSites = [];
if( localStorage.getItem("allSites")!= null ){
  allSites = JSON.parse(localStorage.getItem("allSites"))
}

function addNewSite() {
  if (bookmarkName.value == "" && websiteUrl.value == "") {
    siteNameWarning = document.getElementById("site-name-warrning");
    siteUrlWarning = document.getElementById("site-url-warrning");

    siteNameWarning.innerHTML = `<div class="warning-msg mt-3">
    <p class="mt-auto fw-bold">Name is required</p>
  </div>`;

    siteUrlWarning.innerHTML = `<div class="warning-msg mt-3">
        <p class="mt-auto fw-bold">Url Field is required</p>
                </div>`;
  } else if (
    checkBookMarkExistance(bookmarkName.value) == true &&
    websiteUrl.value == ""
  ) {
    siteNameWarning = document.getElementById("site-name-warrning");
    siteUrlWarning = document.getElementById("site-url-warrning");

    siteNameWarning.innerHTML = `<div class="warning-msg mt-3">
    <p class="mt-auto fw-bold">this url already exist</p>
  </div>`;

    siteUrlWarning.innerHTML = `<div class="warning-msg mt-3">
        <p class="mt-auto fw-bold">Url Field is required</p>
                </div>`;
  } else if (bookmarkName.value == "") {
    siteNameWarning = document.getElementById("site-name-warrning");
    siteNameWarning.innerHTML = `<div class="warning-msg mt-3">
    <p class="mt-auto fw-bold">Name is required</p>
  </div>`;
  } else if (websiteUrl.value == "") {
    siteUrlWarning = document.getElementById("site-url-warrning");
    siteUrlWarning.innerHTML = `<div class="warning-msg mt-3">
    <p class="mt-auto fw-bold">Url Field is required</p>
            </div>`;
  } else if (checkBookMarkExistance(bookmarkName.value) == true) {
    siteNameWarning = document.getElementById("site-name-warrning");
    siteNameWarning.innerHTML = `<div class="warning-msg mt-3">
    <p class="mt-auto fw-bold">this url already exist</p>
  </div>`;
  } else {
    webSite = {
      name: bookmarkName.value,
      url: websiteUrl.value,
    };
    allSites.push(webSite);

    displayAllSites();
    clearForm();
    localStorage.setItem("allSites", JSON.stringify(allSites));
  }
}

function displayAllSites() {
  var tbody = document.getElementById("tbody");
  var container = "";
  for (var i = 0; i < allSites.length; i++) {
    container += `
    <tr class="table-cell">
    <td class="w-25 pt-4 ps-5">
      <p class="fs-4 fw-bold">${allSites[i].name}</p>
    </td>

    <td class="pt-4">
      <a
        href="${allSites[i].url}"
        id="visistAnchor"
        target="_blank"
      >
        <button class="btn btn-primary submit">visit</button>
      </a>

      <button class="btn btn-danger submit" onclick="deleteSite(${i})">Delete</button>
    </td>
  </tr>

        `;
  }
  tbody.innerHTML = container;
}

function deleteSite(index) {
  allSites.splice(index, 1);
  displayAllSites();
}

function checkBookMarkExistance(bookmarkName) {
  flag = false;
  for (let index = 0; index < allSites.length; index++) {
    if (
      bookmarkName.toLocaleLowerCase() ==
      allSites[index].name.toLocaleLowerCase()
    ) {
      flag = true;
      break;
    }
  }
  return flag;
}
var s = "s".toLocaleLowerCase;

function clearForm() {
  bookmarkName.value = "";
  websiteUrl.value = "";
}

function search() { 
  searchInput = document.getElementById("searchInput");
  var term = searchInput.value.toLowerCase();
  console.log(term)
  var tbody = document.getElementById("tbody");
  placeHolder = "";
  for (let index = 0; index < allSites.length; index++) {
    if (
      allSites[index].name.toLocaleLowerCase().includes(term) ==true
    ) {
      placeHolder += `
    <tr class="table-cell">
    <td class="w-25 pt-4 ps-5">
      <p class="fs-4 fw-bold">${allSites[index].name}</p>
    </td>

    <td class="pt-4">
      <a
        href="${allSites[index].url}"
        id="visistAnchor"
        target="_blank"
      >
        <button class="btn btn-primary submit">visit</button>
      </a>

      <button class="btn btn-danger submit" onclick="deleteSite(${index})">Delete</button>
    </td>
  </tr>

        `;
    }
  }
  tbody.innerHTML = placeHolder;
  
}



console.log("json here",JSON.parse(localStorage.getItem("allSites")))