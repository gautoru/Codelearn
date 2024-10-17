const inputTextArea = document.getElementById("inputTextArea");
const programTextArea = document.getElementById("programTextArea");
const convoArea = document.getElementById("convo");
const genBtn = document.getElementById("gen-btn");
const subBtn = document.getElementById("sub-btn");

var problemstatement = "";

genBtn.addEventListener("click", () => {
  const userInput = programTextArea.value;
  fetchProblemStatement(userInput);
});

subBtn.addEventListener("click", () => {
  const userCode = inputTextArea.value;
  document.getElementById("convoChat").style.display = "none";
  checkProblemStatement(userCode);
});

async function fetchProblemStatement(userInput) {
  try {
    const response = await fetch('/generate-problem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    const data = await response.json();
    setTimeout(function () {
      problemstatement = data.text;
      convoArea.innerText = data.text;
    }, 1000);
  } catch (error) {
    console.error("Error in fetchProblemStatement:", error);
  }
}

async function checkProblemStatement(userCode) {
  try {
    const response = await fetch('/check-problem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userCode, problemstatement }),
    });
    const data = await response.json();
    setTimeout(function () {
      convoArea.innerText = data.text;
    }, 1000);
  } catch (error) {
    console.error("Error in checkProblemStatement:", error);
  }
}