// alert("Hello World!");

const form = document.getElementById("form");
const credscontainer = form.querySelector('#credentials-container')

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 4);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  // console.log(stringified);
  const response = await doLogin(stringified);
  location.href = response.redirectTo
  console.log(`The user is logged in: ${response.isAuthenticated}`)
};


renderform();
form.addEventListener("submit", handleSubmit);

function renderform() {
  const html = `
    <div class="input-field">
        <input type="text" name="username" id="username" placeholder="Enter Username">
    </div>
    <div class="input-field">
        <input type="password" name="password" id="password" placeholder="Enter Password">
    </div>
    <input type="submit" value="LogIn">
    `;
    credscontainer.innerHTML = html;
}

async function doLogin (body) {
  const data = await fetch('/login', {
    body, 
    headers: {
      'Content-Type': "application/json"
    },
    method: 'POST'
  }) 
  const response = await data.json();
  return response;
} 