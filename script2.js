const add = document.querySelector(".addEmployee");
const formDiv = document.querySelector(".forms");
const form = formDiv.querySelector(".formStyle");
const cards = document.querySelector(".cardDetails");
let empList = JSON.parse(localStorage.getItem("empDetail")) || [];

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

function addForm(e) {
  e.preventDefault();
  //   console.log(e.target);
  // console.log(this);

  const name = this.name.value;
  const age = this.age.value;
  const salary = this.salary.value;

  const detail = {
    id: Date.now(),
    name,
    age,
    salary,
  };

  empList.push(detail);
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
    .map((emp) => {
      let { id, name, age, salary } = emp;
      return `   
    <div class="card cards" id ='${id}'  >
      <div class = 'menubar'>
        <img src="./img/female.png" class="card-img-top profile" alt="female">
        <div class="dropdown">
            <button class="btn  dropdown-toggle menu" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa fa-ellipsis-v" style="font-size:15px;color:#707070"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#" >Edit</a></li>
              <li><button class="dropdown-item del" value="${id}">Delete</button></li>
              
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
  empList = empList.filter((emp) => emp.id !== id);
  console.log(empList);
  localStorage.removeItem("empDetail");
  populateEmployeeDetails(empList);
  localStorage.setItem("empDetail", JSON.stringify(empList));
}

function getCardId(e) {
  // console.log(e.target);
  // target = e.target;
  // console.log(target);
  card = e.target.closest(".del");
  if (!card) return;
  console.log(card.value);
  const id = parseInt(card.value);
  deleteId(id);
}
add.addEventListener("click", formWindow);
form.addEventListener("submit", addForm);

formDiv.addEventListener("click", closeForm);
window.addEventListener("keydown", closeFormWindow);

populateEmployeeDetails(empList);
cards.addEventListener("click", getCardId);
