
        class InternshipChatbot {
            constructor() {
                this.chatMessages = document.getElementById('chatMessages');
                this.currentStep = 'greeting';
                this.userSelections = {};
                this.init();
            }
            init() {
                this.showGreeting();
            }
            addMessage(text, isUser = false, options = null) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
                messageDiv.innerHTML = text;
                if (options && !isUser) {
                    const optionsContainer = document.createElement('div');
                    optionsContainer.className = 'options-container';
                    options.forEach(option => {
                        const optionBtn = document.createElement('button');
                        optionBtn.className = 'option-btn';
                        optionBtn.textContent = option.text;
                        optionBtn.onclick = () => option.action();
                        optionsContainer.appendChild(optionBtn);
                    });
                    messageDiv.appendChild(optionsContainer);
                }
                this.chatMessages.appendChild(messageDiv);
                this.scrollToBottom();
            }
            showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.className = 'message bot-message typing-indicator';
                typingDiv.id = 'typing-indicator';
                typingDiv.innerHTML = `
                    Bot is typing
                    <div class="typing-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                `;
                this.chatMessages.appendChild(typingDiv);
                this.scrollToBottom();
            }
            removeTypingIndicator() {
                const typingIndicator = document.getElementById('typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
            }
            async showGreeting() {
                this.showTypingIndicator();
                await this.delay(1500);
                this.removeTypingIndicator();
                this.addMessage("Hi there! 👋 Welcome to our Internship Portal!");
                await this.delay(1000);
                this.showTypingIndicator();
                await this.delay(1500);
                this.removeTypingIndicator();
                this.addMessage(
                    "I'm here to help you find the perfect internship opportunity. Let's start by understanding your interests!",
                    false,
                    [
                        { text: "Let's get started! 🚀", action: () => this.askInterestDomain() }
                    ]
                );
            }
            async askInterestDomain() {
                this.addMessage("Let's get started! 🚀", true);
                this.currentStep = 'interest_domain';
                await this.delay(800);
                this.showTypingIndicator();
                await this.delay(1500);
                this.removeTypingIndicator();
                this.addMessage(
                    "Which domain interests you the most?",
                    false,
                    [
                        { text: "💻 Technology & Software", action: () => this.selectDomain('Technology & Software') },
                        { text: "🎨 Design & Creative", action: () => this.selectDomain('Design & Creative') },
                        { text: "📊 Business & Marketing", action: () => this.selectDomain('Business & Marketing') },
                        { text: "🔬 Research & Analytics", action: () => this.selectDomain('Research & Analytics') },
                        { text: "📝 Content & Writing", action: () => this.selectDomain('Content & Writing') },
                        { text: "🏥 Healthcare & Life Sciences", action: () => this.selectDomain('Healthcare & Life Sciences') }
                    ]
                );
            }
            async selectDomain(domain) {
                this.addMessage(domain, true);
                this.userSelections.domain = domain;
                await this.delay(800);
                this.showTypingIndicator();
                await this.delay(1500);
                this.removeTypingIndicator();
                this.addMessage(`Great choice! ${domain} is an exciting field with lots of opportunities.`);
                await this.delay(1000);
                this.askExperienceLevel();
            }
            async askExperienceLevel() {
                this.showTypingIndicator();
                await this.delay(1500);
                this.removeTypingIndicator();
                this.addMessage(
                    "What's your experience level in this domain?",
                    false,
                    [
                        { text: "🌱 Beginner (0-1 years)", action: () => this.selectExperience('Beginner') },
                        { text: "📈 Intermediate (1-3 years)", action: () => this.selectExperience('Intermediate') },
                        { text: "🚀 Advanced (3+ years)", action: () => this.selectExperience('Advanced') }
                    ]
                );
            }
            async selectExperience(experience) {
                this.addMessage(experience, true);
                this.userSelections.experience = experience;
                await this.delay(800);
                this.showTypingIndicator();
                await this.delay(1500);
                this.removeTypingIndicator();
                this.showRecommendations();
            }
            async showRecommendations() {
                const { domain, experience } = this.userSelections;
                this.addMessage(`Perfect! Based on your selection of ${domain} with ${experience} experience level, here are some recommendations:`);
                await this.delay(1000);
                this.showTypingIndicator();
                await this.delay(2000);
                this.removeTypingIndicator();
                let recommendations = this.getRecommendations(domain, experience);
                this.addMessage(recommendations);
                await this.delay(1500);
                this.addMessage(
                    "Would you like to explore more options or start over?",
                    false,
                    [
                        { text: "🔍 More Information", action: () => this.showMoreInfo() },
                        { text: "🔄 Start Over", action: () => this.restart() }
                    ]
                );
            }
            getRecommendations(domain, experience) {
                const recommendations = {
                    'Technology & Software': {
                        'Beginner': '• Frontend Development Intern\n• QA Testing Intern\n• Technical Support Intern\n• Mobile App Development Intern',
                        'Intermediate': '• Full-Stack Developer Intern\n• Data Science Intern\n• DevOps Intern\n• Cybersecurity Intern',
                        'Advanced': '• Software Architecture Intern\n• AI/ML Research Intern\n• Lead Developer Intern\n• Product Management Intern'
                    },
                    'Design & Creative': {
                        'Beginner': '• Graphic Design Intern\n• Social Media Design Intern\n• UI/UX Assistant\n• Content Creation Intern',
                        'Intermediate': '• UX Designer Intern\n• Brand Identity Intern\n• Video Production Intern\n• Digital Marketing Creative',
                        'Advanced': '• Senior UX/UI Intern\n• Creative Director Intern\n• Product Design Intern\n• Design Strategy Intern'
                    },
                    'Business & Marketing': {
                        'Beginner': '• Marketing Assistant Intern\n• Sales Support Intern\n• Market Research Intern\n• Customer Service Intern',
                        'Intermediate': '• Digital Marketing Intern\n• Business Analyst Intern\n• Project Management Intern\n• Operations Intern',
                        'Advanced': '• Marketing Strategy Intern\n• Business Development Intern\n• Consulting Intern\n• Product Marketing Intern'
                    },
                    'Research & Analytics': {
                        'Beginner': '• Data Analyst Intern\n• Policy Research Assistant\n• Market Research Intern',
                        'Intermediate': '• Research Fellow\n• Quantitative Analyst Intern\n• Data Scientist Intern',
                        'Advanced': '• Senior Research Associate\n• Economic Policy Analyst Intern\n• AI/ML Research Intern'
                    },
                    'Content & Writing': {
                        'Beginner': '• Content Writer Intern\n• Social Media Content Creator\n• Copywriting Intern',
                        'Intermediate': '• Technical Writer Intern\n• SEO Content Strategist\n• Journalist Intern',
                        'Advanced': '• Lead Content Strategist\n• Editor-in-Chief Intern\n• Communications Manager Intern'
                    },
                    'Healthcare & Life Sciences': {
                        'Beginner': '• Medical Research Assistant\n• Clinical Intern\n• Public Health Intern',
                        'Intermediate': '• Pharmacovigilance Intern\n• Biomedical Engineer Intern\n• Health Informatics Intern',
                        'Advanced': '• Clinical Research Coordinator Intern\n• Healthcare Policy Analyst\n• Medical Affairs Intern'
                    }
                };
                return recommendations[domain]?.[experience] || '• Custom internship opportunities available\n• Mentorship programs\n• Flexible project-based roles';
            }
            async showMoreInfo() {
                this.addMessage("More Information", true);
                await this.delay(800);
                this.showTypingIndicator();
                await this.delay(1500);
                this.removeTypingIndicator();
                this.addMessage("Here's additional information about our internship program:");
                await this.delay(1000);
                this.addMessage(
                    "📋 Program Details:\n• Duration: 3-6 months\n• Stipend: Competitive compensation\n• Mentorship: 1-on-1 guidance\n• Certificate: Upon completion\n• Remote/Hybrid options available",
                    false,
                    [
                        { text: "🔄 Start Over", action: () => this.restart() }
                    ]
                );
            }
            async restart() {
                this.addMessage("Start Over", true);
                this.chatMessages.innerHTML = '';
                this.userSelections = {};
                this.currentStep = 'greeting';
                await this.delay(500);
                this.showGreeting();
            }
            scrollToBottom() {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }
            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }
        document.addEventListener('DOMContentLoaded', () => {
            const chatbotToggle = document.getElementById('chatbot-toggle');
            const chatbotContainer = document.getElementById('chatbot-container');
            chatbotToggle.addEventListener('click', () => {
                const isActive = chatbotContainer.classList.toggle('active');
                if (isActive) {
                    new InternshipChatbot();
                }
            });
        });
    
