// for removing wish
setTimeout(() => {
  wish.style.display = "none";
}, 2000);


cancelTask.onclick = () => {
  addTaskBtn.children[0].style.width = "25px";
  addTaskBtn.children[0].src = "img/add.svg";
  addTaskForm.style.display = "none";
};

