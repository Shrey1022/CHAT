const apiKey = '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'; // Replace with your actual OpenAI API key
const chatOutput = document.getElementById('chat-output');
const userMessageInput = document.getElementById('user-message');

async function sendMessage() {
    const userMessage = userMessageInput.value;
    appendMessage('You', userMessage);

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                prompt: userMessage,
                max_tokens: 150,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the response from the API.');
        }

        const data = await response.json();
        const botMessage = data.choices[0].text.trim();
        appendMessage('ChatGPT', botMessage);
    } catch (error) {
        console.error('Error:', error);
        appendMessage('ChatGPT', 'Oops! Something went wrong. Please try again later.');
    }

    userMessageInput.value = '';
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatOutput.appendChild(messageElement);
}
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Store conversation history in an array
let conversationHistory = [];

// Event listener for sending messages
sendButton.addEventListener('click', sendMessage);

// Function to send user message
function sendMessage() {
  const message = userInput.value.trim();
  if (message !== '') {
    appendMessage('user', message);
    conversationHistory.push({ sender: 'user', message });
    fetchMessage(message)
      .then((response) => response.text())
      .then((reply) => {
        appendMessage('chatbot', reply);
        conversationHistory.push({ sender: 'chatbot', message: reply });
      })
      .catch((error) => {
        console.error(error);
        appendMessage('chatbot', 'Oops! Something went wrong. Please try again.');
        conversationHistory.push({ sender: 'chatbot', message: 'Oops! Something went wrong. Please try again.' });
      });
    userInput.value = '';
  }
}

// Function to fetch chatbot's response
async function fetchMessage(message) {
  try {
    const response = await fetch('/your-chatbot-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from the chatbot API.');
    }

    return response;
  } catch (error) {
    throw new Error('Error fetching chatbot response:', error);
  }
}

// Function to append messages to the chat container
function appendMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Function to clear the chat history
function clearChatHistory() {
  chatBody.innerHTML = '';
  conversationHistory = [];
}

// Example usage of clearing chat history (e.g., when a new conversation starts)
// clearChatHistory();
