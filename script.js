function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById('chat-box');

  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  input.value = '';

  const aiMsg = document.createElement('div');
  aiMsg.className = 'message ai';
  aiMsg.textContent = 'Thinking...';
  chatBox.appendChild(aiMsg);

  // Simulate AI response (replace with real API call)
  setTimeout(() => {
    aiMsg.textContent = 'This is a placeholder AI response. Connect to an AI API here.';
  }, 1000);
}
