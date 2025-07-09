// ChatBot class for HuggingFace Flowise communication only
class ChatBot {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        this.jobList = document.getElementById('job-list');
        this.initEvents();
    }

    initEvents() {
        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserInput();
            }
        });
    }

    handleUserInput() {
        const message = this.userInput.value.trim();
        if (!message) return;
        this.addUserMessage(message);
        this.userInput.value = '';
        this.processUserInput(message);
    }

    addUserMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message';
        msgDiv.textContent = message;
        this.chatMessages.appendChild(msgDiv);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot-message';
        msgDiv.textContent = message;
        this.chatMessages.appendChild(msgDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async processUserInput(message) {
        // Show loading message
        this.addBotMessage('Thinking...');
        try {
            const result = await query({ question: message });
            // Remove the 'Thinking...' message
            const lastBotMsg = this.chatMessages.querySelector('.bot-message:last-child');
            if (lastBotMsg && lastBotMsg.textContent === 'Thinking...') {
                lastBotMsg.remove();
            }
            if (result && result.text) {
                this.addBotMessage(result.text);
            } else {
                this.addBotMessage('Sorry, I could not get a response.');
            }
        } catch (err) {
            const lastBotMsg = this.chatMessages.querySelector('.bot-message:last-child');
            if (lastBotMsg && lastBotMsg.textContent === 'Thinking...') {
                lastBotMsg.remove();
            }
            this.addBotMessage('Sorry, there was an error connecting to the AI.');
        }
    }
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});
