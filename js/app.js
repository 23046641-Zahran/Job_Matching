// ...dummy job data removed. All job matching handled by HuggingFace chatbot...

// Chat functionality
class ChatBot {
    constructor() {
        this.messages = [];
        this.initializeUI();
    }

    initializeUI() {
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        this.jobList = document.getElementById('job-list');

        this.sendButton.addEventListener('click', () => this.handleUserInput());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserInput();
            }
        });

        // Initial greeting
        this.addBotMessage('Hi! I\'m your SkillLink assistant. How can I help you today?');
    }

    handleUserInput() {
        const message = this.userInput.value.trim();
        if (message) {
            this.addUserMessage(message);
            this.userInput.value = '';
            this.processUserInput(message);
        }
    }

    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = message;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = message;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async processUserInput(message) {
        // Call HuggingFace Flowise API for chatbot response
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
            // Remove the 'Thinking...' message
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
