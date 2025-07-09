// Sample job data (to be replaced with real API data)
const sampleJobs = [
    {
        title: 'Junior Software Developer',
        company: 'TechCorp',
        location: 'Singapore',
        skills: ['JavaScript', 'HTML', 'CSS', 'React'],
        description: 'Entry-level position for passionate developers...'
    },
    {
        title: 'Digital Marketing Assistant',
        company: 'MediaHub',
        location: 'Singapore',
        skills: ['Social Media', 'Content Creation', 'Analytics'],
        description: 'Join our dynamic marketing team...'
    }
];

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
        this.addBotMessage('Hi! I\'m your SkillLink assistant. Tell me about your skills and what kind of job you\'re looking for.');
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

    processUserInput(message) {
        // Simulate AI processing time
        setTimeout(() => {
            // Simple keyword matching (to be replaced with AI processing)
            const keywords = message.toLowerCase().split(' ');
            const matches = this.findJobMatches(keywords);
            
            if (matches.length > 0) {
                this.addBotMessage('I found some jobs that might interest you:');
                this.displayJobMatches(matches);
            } else {
                this.addBotMessage('Could you tell me more about your specific skills or the type of role you\'re looking for?');
            }
        }, 1000);
    }

    findJobMatches(keywords) {
        return sampleJobs.filter(job => {
            const jobText = `${job.title} ${job.company} ${job.location} ${job.skills.join(' ')} ${job.description}`.toLowerCase();
            return keywords.some(keyword => jobText.includes(keyword));
        });
    }

    displayJobMatches(jobs) {
        document.querySelector('.job-matches').classList.remove('hidden');
        this.jobList.innerHTML = jobs.map(job => `
            <div class="job-card">
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Location:</strong> ${job.location}</p>
                <p><strong>Required Skills:</strong> ${job.skills.join(', ')}</p>
                <p>${job.description}</p>
            </div>
        `).join('');
    }
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});
