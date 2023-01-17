const add = document.querySelector(".addEmployee");
const formDiv = document.querySelector(".forms");
const form = formDiv.querySelector(".formStyle");
const cards = document.querySelector(".cardDetails");
const alertMsg = document.querySelector(".alertSuccess");
let empList = JSON.parse(localStorage.getItem("empDetail")) || [];

const update = document.querySelector(".updateInfo");
const updateForm = update.querySelector(".updateForm");

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
function popupMsg() {
  alertMsg.classList.add("open");
  setTimeout(() => {
    alertMsg.classList.remove("open");
  }, 2000);
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
  popupMsg();
  populateEmployeeDetails(empList);
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
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
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

function deleteId(id) {
  console.log("Deleting...");
  empList = empList.filter((emp, i) => i !== id);
  // console.log(empList);
  localStorage.removeItem("empDetail");
  populateEmployeeDetails(empList);
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
    console.log(index);
    target = e.target;
    name = target.name.value;
    age = target.age.value;
    salary = target.age.value;

    empList[index] = { name, age, salary };
    console.log(empList[index]);
    localStorage.removeItem("empDetail");
    populateEmployeeDetails(empList);
    localStorage.setItem("empDetail", JSON.stringify(empList));
  });
}
function getCardId(e) {
  // console.log(e.target);
  // target = e.target;
  // console.log(target);
  // card = e.target.closest(".del");
  // console.log(card);
  // if (!card) return;
  // console.log(card.value);
  // const id = parseInt(card.value);
  // console.log(id);
  // deleteId(id);
  const id = parseInt(e.target.value);

  if (e.target.matches(".del")) {
    deleteId(id);
  }
  if (e.target.matches(".edit")) {
    update.classList.add("open");
    openUpdateForm(id);
  }
}
add.addEventListener("click", formWindow);
form.addEventListener("submit", addForm);
formDiv.addEventListener("click", closeForm);
window.addEventListener("keydown", closeFormWindow);
//finding Card and Card ID
cards.addEventListener("click", getCardId);

update.addEventListener("click", closeEditForm);
window.addEventListener("keydown", closeEditWindow);

populateEmployeeDetails(empList);
