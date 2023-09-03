class User {
  constructor(fullname, username, email, password) {
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.taskList = [];
  }
}

// check if already logged in then redirect to home page
function alreadyLoggedIn(){
  let user = JSON.parse(localStorage.getItem("user"));
  if(user!= null){
    let url = location.href;
    url = url.slice(0,url.indexOf('/login'));
    // redirecting to todo.html;
    url = url + "/todo/todo.html";
    location.href = url;
  }
}

// gettings users data if stored
let users = JSON.parse(localStorage.getItem("users"));

if (users == null) {
  users = [];
}

// show successful message and redirect
function signupSuccess(){
  // showing message and loader
  error.style.display = "block";
  error.style.color = "green";
  error.innerHTML = "Registration Successfull.";
  loader.style.display = "block";

  let url = location.href;
  url = url.slice(0,url.lastIndexOf('/'));
  url = url + "/login.html";
  setTimeout(()=>{
    location.href = url;
  },1500);
}

// creating user in users array and storing in localStorage
function signup(fullname, username, email, password) {
  let user = new User(fullname, username, email, password);
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
}

// signup
signupBtn.onclick = function () {
  // checking that form don't have empty input
  if(fullname.value.length==0 || username.value.length==0 || email.value.length==0 || password.value.length==0 || confirmPassword.value.length==0)
    return;
  for (let i = 0; i < users.length; i++) {
    // checking username already exists
    if (users[i].username == username.value || users[i].email == email.value) {
      error.style.display = "block";
      error.innerHTML = "Username or email already exists.";
      return;
    }
  } 
  // if password not matched then
  if (password.value !== confirmPassword.value) {
    error.style.display = "block";
    error.innerHTML = "Passwords not same !!!";
    return;
  }

  error.style.display = "none";
  
  // for capitalize fullname
  let fullnameCapitalized = capitalize(fullname.value);
  

  // if not found then add user
  signup(fullnameCapitalized, username.value, email.value, password.value);
  signupSuccess();
};

// capitalize first letter capital
function capitalize(fulltext){
  let texts = fulltext.split(' ');
  let fullname = "";
  for(let i=0;i<texts.length;i++){
    let text = texts[i];
    fullname += text[0].toUpperCase() + text.slice(1) + ' ';
  }
  return fullname.trim();
}

// if already logged in -> redirect
window.onload = ()=>{
  alreadyLoggedIn();
};
