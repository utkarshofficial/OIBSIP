let ansStr = "0";
let operationIdx = -1;
let operation = "";
let calcHistory = [];
const setOperationAndIdx = (idx, op = "") => {
  operationIdx = idx;
  operation = op;
};

let numVals = document.getElementsByClassName("numVal");
for (let i = 0; i < numVals.length; i++) {
  numVals[i].addEventListener("click", () => {
    if (ans.innerHTML == "0") {
      ansStr = numVals[i].innerHTML;
      ans.innerHTML = ansStr;
    } else {
      ansStr += numVals[i].innerHTML;
      ans.innerHTML = ansStr;
    }
  });
}

// to check if already one operation is present
const isOperationPresent = () => {
  let allOps = ["+", "-", "/", "x", "%"];
  let tempAns = ansStr
  for(let i=0;i<allOps.length;i++){
    let opIdx = ansStr.indexOf(allOps[i]);
    if(opIdx != -1){
      ansStr = tempAns;
      return true;
    }
  }
  ansStr = tempAns;
  return false;
};

let ops = document.getElementsByClassName("operation");
for (let i = 0; i < ops.length; i++) {
  ops[i].addEventListener("click", () => {
    // check if already one operation is present or not
    if (!isOperationPresent()) {
      // set the idx of operation
      // operationIdx = ansStr.length
      // operation = ops[i].innerHTML
      setOperationAndIdx(ansStr.length, ops[i].innerHTML);
      if(ansStr=='0')
        ansStr = ops[i].innerHTML;
      else
        ansStr += ops[i].innerHTML;
      ans.innerHTML = ansStr;
    }
  });
}

const evaluate = (ansStr) => {
  // conditions for edge cases
  if (operationIdx == -1) {
    return;
  }
  // when operation is present but right side is empty like(12+)
  if (operationIdx + 1 == ansStr.length) {
    return;
  }
  const numA = Number(ansStr.slice(0, operationIdx));
  const numB = Number(ansStr.slice(operationIdx + 1, ansStr.length));
  let ans = 0;

  switch (operation) {
    case "+":
      ans = numA + numB;
      break;
    case "-":
      ans = numA - numB;
      break;
    case "/":
      ans = numA / numB;
      break;
    case "x":
      ans = numA * numB;
      break;
    case "%":
      ans = numA % numB;
      break;
  }
  // * update history after every answer
  updateHistroy(numA, numB, ans, operation);
  return String(ans);
};

// * History Viewer
const toggleHistory = () => {
  if (historyBtn.src.indexOf("clock.svg") == -1) {
    historyBtn.src = "clock.svg";
    clearHistoryBtn.style.visibility = "hidden";
  } else {
    clearHistoryBtn.style.visibility = "visible";
    historyBtn.src = "close.png";
  }
  histoBox.classList.toggle("visible");
};

historyBtn.addEventListener("click", toggleHistory);
historyBtn.addEventListener("blur", toggleHistory);

// * Update history List dom
function updateHistroy(numA, numB, ans, operation) {
  calcHistory.unshift(`${numA} ${operation} ${numB} = ${ans}`);

  historyList.innerHTML = "";
  for (let i = 0; i < calcHistory.length; i++) {
    historyList.innerHTML += `<li>${calcHistory[i]}</li>`;
    if (calcHistory.length > 1 && i < calcHistory.length - 1) {
      historyList.innerHTML += `<hr>`;
    }
  }
}

// * Clear history button
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = " No History";
  calcHistory = [];
});

backspaceBtn.addEventListener("click", () => {
  // if backspace removed the operation from ansStr just remove it's index
  if (ansStr.length < operationIdx) {
    setOperationAndIdx(-1);
  }

  if (ansStr.length == 1) {
    ansStr = "0";
  } else {
    ansStr = ansStr.slice(0, -1);
  }
  ans.innerHTML = ansStr;
});

clearBtn.addEventListener("click", () => {
  ansStr = 0;
  ans.innerHTML = ansStr;
});

equalBtn.addEventListener("click", () => {
  if (isOperationPresent()) {
    ansStr = evaluate(ansStr);
    ans.innerHTML = ansStr;

    // after answer remove allready present operations
    setOperationAndIdx(-1);
  }
});
