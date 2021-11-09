const dataUrl = "http://localhost:3000/";

document.addEventListener("DOMContentLoaded", () => {
  getMonsters();
  createForm();
  backForward();
});

/////////////// Selector

//////////////////////
let page = 1;
const getMonsters = (number) => {
  fetch(dataUrl + `monsters/?_limit=50&_page=${number}`)
    .then((resp) => resp.json())
    .then((data) => {
      const monsterContainer = document.querySelector("#monster-container");
      monsterContainer.innerHTML = "";
      console.log(data);
      data.forEach((e) => printOut(e));
    });
};

const printOut = (data) => {
  const monsterContainer = document.querySelector("#monster-container");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  h2.innerHTML = `${data.name}`;
  h4.innerHTML = `Age: ${Math.round(data.age)}`;
  p.innerHTML = `Description ${data.description}`;
  div.appendChild(h2);
  div.appendChild(h4);
  div.appendChild(p);
  monsterContainer.appendChild(div);
};

const createForm = () => {
  const form = document.createElement("form");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  const input3 = document.createElement("input");
  const button = document.createElement("button");
  form.id = "monster-form";
  input1.id = "name";
  input2.id = "age";
  input3.id = "description";
  input1.placeholder = "Write name";
  input2.placeholder = "Age";
  input3.placeholder = "Description";
  button.innerHTML = "Create";
  form.appendChild(input1);
  form.appendChild(input2);
  form.appendChild(input3);
  form.appendChild(button);
  document.getElementById("create-monster").appendChild(form);
  document.querySelector("#monster-form").addEventListener("submit", (e) => {
    e.preventDefault();
    postNew(getFormData()), clearForm();
  });
};

const getFormData = () => {
  const a = document.querySelector("#name");
  const b = document.querySelector("#age");
  const c = document.querySelector("#description");
  return { name: a.value, age: parseFloat(b.value), description: c.value };
};

const postNew = (a) => {
  const b = dataUrl + `monsters`;
  const c = {
    method: "POST",
    Headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(a),
  };
  fetch(b, c)
    .then((resp) => resp.json())
    .then((data) => console.log(data));
};

const clearForm = () => {
  document.querySelector("#monster-form").reset();
};

const backForward = () => {
  const a = document.querySelector("#back");
  const b = document.querySelector("#forward");

  a.addEventListener("click", () => {
    pageDown();
  });
  b.addEventListener("click", () => {
    pageUp();
  });
};

const pageUp = () => {
  page++, getMonsters(page);
};

const pageDown = () => {
  if (page < 1) {
    page--, getMonsters(page);
  }
};
