const API_URL = "https://jsonplaceholder.typicode.com/users";

const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const statusEl = document.getElementById("status");
const usersList = document.getElementById("users-list");

let allUsers = [];

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

async function loadUsers() {
  loadButton.disabled = true;
  setStatus("Loading users...");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }
    allUsers = await response.json();
    setStatus("Loaded " + allUsers.length + " users.");
    applyFilter();
  } catch (error) {
    setStatus("Could not load users: " + error.message, true);
  } finally {
    loadButton.disabled = false;
  }
}

function renderUsers(list) {
  usersList.textContent = "";

  if (list.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No users match your filter.";
    usersList.appendChild(li);
    return;
  }

  for (const user of list) {
    const li = document.createElement("li");

    const name = document.createElement("strong");
    name.textContent = user.name;

    const email = document.createElement("span");
    email.textContent = "Email: " + user.email;

    const city = document.createElement("span");
    city.textContent = "City: " + user.address.city;

    const company = document.createElement("span");
    company.textContent = "Company: " + user.company.name;

    li.append(name, email, document.createElement("br"),
              city, document.createElement("br"), company);
    usersList.appendChild(li);
  }
}

function applyFilter() {
  const text = filterInput.value.trim().toLowerCase();
  const filtered = allUsers.filter(user =>
    user.name.toLowerCase().includes(text)
  );
  renderUsers(filtered);
}

loadButton.addEventListener("click", loadUsers);
filterInput.addEventListener("input", () => {
  if (allUsers.length > 0) applyFilter();
});
