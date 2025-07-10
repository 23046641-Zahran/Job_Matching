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
        // If message contains line breaks or numbered/list items, render as bullet points
        if (typeof message === 'string' && (message.includes('\n') || message.includes('- ') || message.includes('* '))) {
            const lines = message.split(/\r?\n/).filter(line => line.trim() !== '');
            // If most lines look like list items, render as <ul>
            const isList = lines.filter(line => /^[-*•]\s+/.test(line) || /^\d+\./.test(line)).length > 0;
            if (isList) {
                const ul = document.createElement('ul');
                lines.forEach(line => {
                    // Remove bullet/number prefix for display
                    const clean = line.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s*/, '');
                    const li = document.createElement('li');
                    li.textContent = clean;
                    ul.appendChild(li);
                });
                msgDiv.appendChild(ul);
            } else {
                // Otherwise, just join with <br>
                msgDiv.innerHTML = lines.join('<br>');
            }
        } else {
            msgDiv.textContent = message;
        }
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
