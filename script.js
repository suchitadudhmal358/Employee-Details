const wrapper = document.querySelector(".wrap");

const add = document.querySelector(".addEmployee");
const formDiv = document.querySelector(".forms");
const form = formDiv.querySelector(".formStyle");
const cards = document.querySelector(".cardDetails");

const alertMsg = document.querySelector(".alertSuccess");
let empList = JSON.parse(localStorage.getItem("empDetail")) || [];

const update = document.querySelector(".updateInfo");
const updateForm = update.querySelector(".updateForm");

const updateMsg = document.querySelector(".updateMsg");
const deleteMsg = document.querySelector(".deleteMsg");
const searchBtn = document.querySelector(".search");

let names = [];

function formWindow(e) {
  formDiv.classList.add("open");
  form.addEventListener("submit", addForm);
}

function closeForm(e) {
  // console.log(e.target); // form
  // console.log(e.currentTarget); // form div
  if (e.target !== e.currentTarget) return;
  formDiv.classList.remove("open");
}

function closeFormWindow(e) {
  // console.log(e.key);
  if (e.key !== "Escape") return;
  formDiv.classList.remove("open");
}

function closeEditForm(e) {
  // console.log(e.target); // form
  // console.log(e.currentTarget); // form div
  if (e.target !== e.currentTarget) return;
  update.classList.remove("open");
}

function closeEditWindow(e) {
  // console.log(e.key);
  if (e.key !== "Escape") return;
  update.classList.remove("open");
}
function popupSuccessMsg() {
  alertMsg.classList.add("open");
  setTimeout(() => {
    alertMsg.classList.remove("open");
  }, 1800);
}

function addForm(e) {
  e.preventDefault();
  //   console.log(e.target);
  // console.log(this);

  const name = this.name.value;
  const age = this.age.value;
  const salary = this.salary.value;

  const detail = {
    name,
    age,
    salary,
  };

  empList.push(detail);
  formDiv.classList.remove("open");
  popupSuccessMsg();
  populateEmployeeDetails(empList);
  DisplayCardDetails(empList);
  localStorage.setItem("empDetail", JSON.stringify(empList));
  this.reset();
}

function populateEmployeeDetails(list = []) {
  if (list.length === 0) {
    const div = `
    <div class='noRecord'>
      <img src = './img/s.png' alt = 'Sorry' class='sorryImg'/>
      <p class= 'noData'>No Records Found</p>
    </div>`;

    return (cards.innerHTML = div);

    // cards.insertAdjacentElement("beforebegin", text);
  }
  cards.innerHTML = list
    .map((emp, i) => {
      let { name, age, salary } = emp;
      return `   
    <div class="card cards" id= '${i}'  >
      <div class = 'menubar'>
        <img src="./img/female.png" class="card-img-top profile" alt="female">
        <div class="dropdown">
            <button class="btn  dropdown-toggle menu" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-ellipsis-v" style="font-size:15px;color:#707070"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end dropdown-items"  aria-labelledby="dropdownMenuButton1">
              <li><button class="dropdown-item edit" value="${i}" >Edit</button></li>
              <li><button class="dropdown-item del" value="${i}">Delete</button></li>
              
            </ul>
          </div>
        
      </div>
      
      <div class="card-body">
        <h6 class="card-title">${name}</h6>
        <p class="card-text"><span>Age :</span> ${age}</p>
        <p class="card-text"><span>Salary :</span> ${salary}</p>
        
      </div>
    </div>`;
    })
    .join("");
}
function popupUpdateMsg() {
  updateMsg.classList.add("open");
  setTimeout(() => {
    updateMsg.classList.remove("open");
  }, 1800);
}

function popupDeleteMsg() {
  deleteMsg.classList.add("open");
  setTimeout(() => {
    deleteMsg.classList.remove("open");
  }, 1800);
}
function deleteId(id) {
  console.log("Deleting...");
  empList = empList.filter((emp, i) => i !== id);
  // console.log(empList);
  popupDeleteMsg();
  localStorage.removeItem("empDetail");
  populateEmployeeDetails(empList);
  DisplayCardDetails(empList);
  localStorage.setItem("empDetail", JSON.stringify(empList));
}

function openUpdateForm(id) {
  console.log("Editing");
  const index = empList.findIndex((item, i) => i === id);
  console.log(index);
  let { name, age, salary } = empList[index];

  updateForm.name.value = name;
  updateForm.age.value = age;
  updateForm.salary.value = salary;

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(index);
    target = e.target;
    name = target.name.value;
    age = target.age.value;
    salary = target.salary.value;

    empList[index] = { name, age, salary };
    // console.log(empList[index]);
    update.classList.remove("open");
    popupUpdateMsg();
    localStorage.removeItem("empDetail");
    populateEmployeeDetails(empList);
    DisplayCardDetails(empList);
    localStorage.setItem("empDetail", JSON.stringify(empList));
  });
}
function getCardId(e) {
  const id = parseInt(e.target.value);

  if (e.target.matches(".del")) {
    deleteId(id);
  }
  if (e.target.matches(".edit")) {
    update.classList.add("open");
    openUpdateForm(id);
  }
}

function findMatch(wordToFind, names) {
  return empList.filter((emp) => {
    const regex = RegExp(wordToFind, "gi");
    return emp.name.match(regex);
  });
}
function displayMatch() {
  // console.log(this.value);
  const myArray = findMatch(this.value, empList);
  // console.log(myArray);
  populateEmployeeDetails(myArray);
  DisplayCardDetails(myArray);
}

add.addEventListener("click", formWindow);
form.addEventListener("submit", addForm);
formDiv.addEventListener("click", closeForm);
window.addEventListener("keydown", closeFormWindow);
//finding Card and Card ID
cards.addEventListener("click", getCardId);
update.addEventListener("click", closeEditForm);
window.addEventListener("keydown", closeEditWindow);
searchBtn.addEventListener("change", displayMatch);
searchBtn.addEventListener("keyup", displayMatch);
// searchBtn.addEventListener("keypress", function (e) {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     console.log("Enter Key");
//     displayMatch();
//   }
// });

populateEmployeeDetails(empList);

function DisplayCardDetails(empList) {
  const cardList = document.querySelectorAll(".cards");

  // console.log(cardList);

  cardList.forEach((card, i) =>
    card.addEventListener("click", function (e) {
      console.log(e.target);
      if (e.target.matches("i")) return;
      if (e.target.matches("button")) return;
      let { name, age, salary } = empList[i];
      // console.log(name, age, salary);
      const empInfo = `
    <div class="forms open empInfo">
      <div class="formStyle position-relative">
        <h4>Employee Details</h4>
        <div class="detail d-flex flex-row  justify-content-center">
            <div class="information w-50 p-2 mt-2" >
                <h6><span>Name : <span>${name}</h6>
                    <p class="m-0"><span>Age : </span>${age}</p>
                    <p><span>Salary : </span>${salary}</p>
            </div>
            <img src="./img/male.jpeg"  class="w-25 p-2" alt="">
        </div>
        <button class="btn bg-danger text-black position-absolute top-0 end-0 closeBtn rounded-0 py-1 px-2">X</button>
        
        
      </div>
    </div>`;

      // console.log(empInfo);
      wrapper.insertAdjacentHTML("beforeend", empInfo);
      const empWindow = document.querySelector(".empInfo");
      const close = document.querySelector(".closeBtn");
      console.log(close, empWindow);
      close.addEventListener("click", () => empWindow.remove());
    })
  );
}
DisplayCardDetails(empList);
