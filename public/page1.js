const chatArea1 = document.getElementById("chatconvo1");
const chatArea2 = document.getElementById("chatconvo2");
const convoArea1 = document.getElementById("convo1");
const convoArea2 = document.getElementById("convo2");
const inputTextArea = document.getElementById("inputTextArea");
const userReply = document.getElementById("whatsapp");
const sendBtn = document.getElementById("send-btn");

let userInput = "";

function submitInput() {
    userInput = inputTextArea.value;
    console.log("clicked");
    userReply.innerText = userInput;
    userReply.style.display = 'flex';
    document.getElementById("blu").style.display = 'none';
    fetchInitialResponse(userInput);
    fetchResources(userInput);
}

sendBtn.addEventListener("click", () => {
    userInput = inputTextArea.value;
    console.log("clicked");
    userReply.innerText = userInput;
    userReply.style.display = 'flex';
    document.getElementById("blu").style.display = 'none';
    fetchInitialResponse(userInput);
    fetchResources(userInput);
});

async function fetchInitialResponse(userInput) {
    try {
        const response = await fetch('/generate-initial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });
        const data = await response.json();
        setTimeout(() => {
            console.log(`Entered display 1: ${userInput}`);
            chatArea1.style.display = 'flex';
            convoArea1.innerText = data.text;
        }, 1000);
    } catch (error) {
        console.error("Error in fetchInitialResponse:", error);
    }
}

async function fetchResources(userInput) {
    try {
        const response = await fetch('/generate-resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });
        const data = await response.json();
        setTimeout(() => {
            console.log("Entered Display 2");
            chatArea2.style.display = 'flex';
            convoArea2.innerText = data.text;
        }, 1000);
    } catch (error) {
        console.error("Error in fetchResources:", error);
    }
}



