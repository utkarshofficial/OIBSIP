let users = JSON.parse(localStorage.getItem("users"));
if(users == null){
  users = [];
}

// check if already logged in then redirect to home page
function alreadyLoggedIn(){
  let user = JSON.parse(localStorage.getItem("user"));
  if(user!= null){
    let url = location.href;
    url = url.slice(0,url.indexOf('/login'));
    // redirecting to todo.html;
    url = url + "/todo/todo.html";
    // location.href = url;
  }
}

// showing message and loader
function loginSuccess(){
  loader.style.display = "block";
  error.style.display = "block";
  error.style.color = "green";
  error.innerHTML = "Log in Successfull.";
  
  let url = location.href;
  url = url.slice(0,url.indexOf('/login.html'));
  url = url + "/loginsuccess.html";
  setTimeout(()=>{
    location.href = url;
  },1500);
}

function login(user){
  // saving current logged in user in loaclstorage
  localStorage.setItem("user",JSON.stringify(user));
}

loginBtn.onclick = () => {
  // checking that form don't have empty input
  if(username.value.length==0 || password.value.length==0 )
  return;
  
  // given username or email is available or not
  for(let i=0;i<users.length;i++){
    if((users[i].username == username.value || users[i].email == username.value) && users[i].password == password.value){
      // sending current matched users for login
      login(users[i]);
      loginSuccess();
      return;
    }
  }

  // showing error username or password is incorrect
  error.style.display = "block";
  error.innerHTML = "Username or password is incorrect !!!.";
}

// if already logged in -> redirect
window.onload = ()=>{
  alreadyLoggedIn();
};