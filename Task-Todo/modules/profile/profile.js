let user = JSON.parse(localStorage.getItem("user"));
let users = JSON.parse(localStorage.getItem("users"));

if(user == null){
    location.href = location.origin + "/modules/login/login.html";
}

// read all details and show in DOM
function readUserDetailsToDOM(){
    fullname.value = user.fullname;
    username.value = user.username;
    email.value = user.email;
    password.value = user.password;
}

function saveUserDetails(){
    let borderColor = "rgba(55, 65, 81, 1)";
    let i;
    showLoader();
    hideLoader(800);
    user.fullname = fullname.value;
    
    // check if username already exists or not
    for(i=0;i<users.length;i++){
        // && also check that it is same user or not if same user than ignore
        if(users[i].username == username.value && users[i].username != user.username){
            username.style.borderColor = "red";
            break;
        }
    }
    if(i==users.length){
        username.style.borderColor = borderColor;
        user.username = username.value;
    }
    // check if email already exists or not
    for(i=0;i<users.length;i++){
        if(users[i].email == email.value && users[i].email != user.email){
            email.style.borderColor = "red";
            console.log(users[i]);
            break;
        }
    }
    if(i==users.length){
        email.style.borderColor = borderColor;
        user.email = email.value;
    }
    
    user.password = password.value;
    localStorage.setItem("user",JSON.stringify(user));
    for(i=0;i<users.length;i++){
        if(users[i].username == user.username){
            users[i] = user;
            break;
        }
    }
    localStorage.setItem("users",JSON.stringify(users));
}

function deleteAllTask(){
    showLoader();
    hideLoader(800);
    user.taskList = [];
    localStorage.setItem("user",JSON.stringify(user));
    for(let i=0;i<users.length;i++){
        if(users[i].username == user.username){
            users[i] = user;
            break;
        }
    }
    localStorage.setItem("users",JSON.stringify(users));
}

function logOut(){
    showLoader();
    hideLoader(800);
    localStorage.removeItem("user");
    location.href = location.href
}

function showLoader(){
    loader.style.display = "block";
}

function hideLoader(timeOut){
    setTimeout(()=>{
        loader.style.display = "none";
    },timeOut);
}

// event for all buttons
saveBtn.addEventListener("click",saveUserDetails);
logoutBtn.addEventListener("click",logOut);
deleteTaskBtn.addEventListener("click",deleteAllTask);

window.onload = ()=>{
    readUserDetailsToDOM();
    // profile image
    profTitle.innerHTML = user.fullname[0];
}