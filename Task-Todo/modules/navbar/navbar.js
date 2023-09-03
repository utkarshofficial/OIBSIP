// adding user name to navbar
function setUserDetailNav(){
    if(localStorage.getItem("user") == null){
        profileName.innerHTML = "Hello";
        profileLetter.innerHTML = '👋';
        return;
    }
    let firstNameIdx = user.fullname.indexOf(' ');
    firstNameIdx = firstNameIdx == -1 ? user.fullname.length : firstNameIdx;
    // adding firstName
    let firstName = user.fullname.slice(0,firstNameIdx);
    profileName.innerHTML = firstName;
    profileLetter.innerHTML = '👏';
}

setUserDetailNav();