

import json
import random
import re
import nltk
import numpy as np
from datetime import datetime
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import warnings
warnings.filterwarnings('ignore')

# Download required NLTK data (run once)
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    print("Downloading required NLTK data...")
    nltk.download('punkt')
    nltk.download('stopwords')

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

class PMChatbot:
    def __init__(self):
        self.stemmer = PorterStemmer()
        self.stop_words = set(stopwords.words('english'))
        
        # PM-specific knowledge base
        self.knowledge_base = {
            'greetings': {
                'patterns': ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
                'responses': [
                    "Hello! I'm your PM internship assistant. How can I help you today?",
                    "Hi there! Ready to explore product management opportunities?",
                    "Hey! I'm here to help with all your PM internship questions.",
                    "Good to see you! What would you like to know about product management?"
                ]
            },
            'pm_skills': {
                'patterns': ['skills', 'requirements', 'competencies', 'abilities', 'qualifications', 'what skills'],
                'responses': [
                    """Essential PM skills include:
                    
🔸 Technical Skills:
- Data analysis and SQL basics
- Understanding of software development
- Analytics tools (Google Analytics, Mixpanel)
- A/B testing and experimentation
- Basic UX/UI principles

🔸 Soft Skills:
- Strategic thinking and prioritization
- User empathy and customer research
- Communication and presentation skills
- Cross-functional collaboration
- Problem-solving and analytical thinking

🔸 Business Skills:
- Market research and competitive analysis
- Product strategy and roadmapping
- Stakeholder management
- Agile/Scrum methodologies
- Business metrics and KPIs

Would you like me to elaborate on any specific skill area?""",
                    
                    """Key competencies for PM interns:
                    
✨ Core Areas:
1. Analytical thinking - Breaking down complex problems
2. User-centric mindset - Understanding customer needs
3. Technical fluency - Working effectively with engineers
4. Communication - Presenting ideas clearly
5. Adaptability - Thriving in fast-paced environments

These skills can be developed through coursework, side projects, and real-world experience. What area would you like to focus on?"""
                ]
            },
            'daily_tasks': {
                'patterns': ['daily', 'day-to-day', 'responsibilities', 'what does pm do', 'typical day', 'tasks'],
                'responses': [
                    """A PM's typical day includes:

📊 Morning:
- Review overnight metrics and user feedback
- Check product performance dashboards
- Prioritize day's activities

🤝 Mid-day:
- Standup meetings with engineering teams
- User research sessions or interview analysis
- Feature specification and requirement writing
- Stakeholder meetings and updates

🔍 Afternoon:
- Competitive analysis and market research
- A/B testing result analysis
- Product roadmap planning
- Cross-functional collaboration

📈 Evening:
- Preparing reports and presentations
- Planning next day's priorities
- Strategic thinking and long-term planning

The exact mix varies by company size and product stage!""",
                    
                    """PM responsibilities vary but typically include:

🎯 Strategic Work (30%):
- Product vision and strategy
- Roadmap planning and prioritization
- Market research and competitive analysis

👥 Collaborative Work (40%):
- Working with engineering and design
- Stakeholder communication
- User research and feedback analysis

📊 Analytical Work (30%):
- Data analysis and metrics tracking
- A/B testing and experimentation
- Performance monitoring and optimization

What aspect interests you most?"""
                ]
            },
            'interviews': {
                'patterns': ['interview', 'preparation', 'tips', 'questions', 'how to prepare'],
                'responses': [
                    """PM Interview Preparation Guide:

🎯 Product Sense Questions:
- "How would you improve [existing product]?"
- "Design a product for [target audience]"
- Practice the CIRCLES method (Comprehend, Identify, Report, Cut, List, Evaluate, Summarize)

📊 Analytical Questions:
- Estimation problems (market sizing, user metrics)
- A/B testing scenarios
- Data interpretation questions

💼 Behavioral Questions:
- Use STAR method (Situation, Task, Action, Result)
- Prepare stories about leadership, conflict resolution, failure

🛠️ Technical Questions:
- Basic system design concepts
- Understanding of APIs, databases
- Technical trade-offs and constraints

📚 Preparation Tips:
- Study the company's products thoroughly
- Practice with real product critiques
- Mock interviews with PM friends
- Stay updated on industry trends""",
                    
                    """Interview Success Strategy:

Phase 1: Research (2-3 weeks before)
- Company products and strategy
- Recent news and announcements
- Interview process and team structure

Phase 2: Practice (1-2 weeks before)
- Product design frameworks
- Case study problem-solving
- Behavioral story preparation

Phase 3: Final Prep (Few days before)
- Mock interviews
- Questions to ask interviewer
- Technical concept review

Remember: Show your thought process, ask clarifying questions, and demonstrate user empathy!"""
                ]
            },
            'career_path': {
                'patterns': ['career', 'path', 'progression', 'growth', 'next steps', 'how to start'],
                'responses': [
                    """PM Career Progression Path:

🚀 Entry Level:
- Associate Product Manager (APM)
- Product Manager Intern
- Related roles: Business Analyst, UX Researcher

📈 Mid Level (2-4 years):
- Product Manager
- Senior Product Manager
- Specializations: Growth PM, Technical PM, etc.

🎯 Senior Level (5-8 years):
- Principal Product Manager
- Group Product Manager
- Product Director

👑 Executive Level (8+ years):
- VP of Product
- Chief Product Officer (CPO)
- Founder/Entrepreneur

💡 Alternative Paths:
- Product Marketing Manager
- Strategy & Operations
- Venture Capital/Consulting
- Product-focused founder

Each level requires deeper strategic thinking and broader impact. What stage interests you most?""",
                    
                    """How to Break into PM:

🎯 Traditional Path:
- PM internship → APM → PM → Senior PM
- Best for recent graduates

🔄 Transition Path:
- Adjacent role → Internal PM transfer
- Great for career changers

🚀 Alternative Paths:
- Startup experience → PM role
- Consulting → PM transition
- Technical background → Technical PM

📚 Preparation Strategies:
- Build a product portfolio
- Take on PM-like projects in current role
- Network with PMs at target companies
- Consider PM bootcamps or courses

The key is demonstrating product thinking and user empathy, regardless of your background!"""
                ]
            },
            'tools': {
                'patterns': ['tools', 'software', 'platforms', 'tech stack', 'applications'],
                'responses': [
                    """Essential PM Tools & Software:

📊 Analytics & Data:
- Google Analytics, Mixpanel, Amplitude
- Tableau, Looker for data visualization
- SQL for database queries
- Excel/Google Sheets for analysis

🛠️ Product Management:
- Jira, Asana, Monday.com for project tracking
- Figma, Sketch for design collaboration
- Notion, Confluence for documentation
- ProductPlan, Roadmunk for roadmapping

🗣️ Communication:
- Slack, Microsoft Teams
- Zoom for user interviews
- Loom for async communication
- Miro, Mural for collaborative workshops

🧪 Testing & Research:
- Optimizely, VWO for A/B testing
- UserVoice, Hotjar for feedback
- Calendly for user interview scheduling

Start with free tiers to build familiarity. Which category interests you most?"""
                ]
            },
            'internships': {
                'patterns': ['internship', 'intern', 'summer', 'application', 'apply'],
                'responses': [
                    """PM Internship Guide:

🎯 Top Companies for PM Interns:
- Big Tech: Google, Microsoft, Meta, Apple, Amazon
- Unicorns: Stripe, Airbnb, Uber, Spotify
- Traditional: IBM, GE, P&G, Nike
- Startups: Check AngelList, Y Combinator companies

📅 Application Timeline:
- Summer internships: Apply Sept-Dec (year before)
- Many companies recruit on university campuses
- Some have rolling applications

📝 Application Requirements:
- Strong resume highlighting analytical skills
- Cover letter showing PM interest and research
- Academic performance (GPA matters)
- Relevant coursework or projects

💡 What Interns Actually Do:
- Own small features or product areas
- Conduct user research and interviews
- Analyze data and present insights
- Work closely with senior PM mentors
- Present final project to leadership

The key is demonstrating genuine interest in the company's products and mission!""",
                    
                    """Making Your Internship Application Stand Out:

🌟 Resume Tips:
- Quantify achievements with metrics
- Highlight analytical and leadership experiences
- Include relevant coursework (data analysis, design, etc.)
- Show progression and increasing responsibility

📋 Project Ideas to Build Experience:
- Analyze and improve an existing app
- Create product requirement documents
- Design user research studies
- Build simple prototypes or mockups

🤝 Networking Strategies:
- Connect with PMs on LinkedIn
- Attend PM meetups and conferences
- Join PM communities (Product School, Mind the Product)
- Reach out to university alumni in PM roles

Remember: Passion for products and users matters more than perfect experience!"""
                ]
            }
        }
        
        # Training data for ML model
        self.training_data = []
        self.training_labels = []
        
        # Prepare training data
        for intent, data in self.knowledge_base.items():
            for pattern in data['patterns']:
                self.training_data.append(pattern)
                self.training_labels.append(intent)
        
        # Initialize ML model
        self.model = None
        self.vectorizer = None
        self.train_model()
        
        # Chat history
        self.chat_history = []
    
    def preprocess_text(self, text):
        """Clean and preprocess text for better matching"""
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords and stem
        tokens = [self.stemmer.stem(token) for token in tokens if token not in self.stop_words]
        
        return ' '.join(tokens)
    
    def train_model(self):
        """Train ML model for intent classification"""
        # Preprocess training data
        processed_data = [self.preprocess_text(text) for text in self.training_data]
        
        # Create pipeline with TF-IDF and Naive Bayes
        self.model = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=1000, ngram_range=(1, 2))),
            ('classifier', MultinomialNB(alpha=0.1))
        ])
        
        # Train the model
        self.model.fit(processed_data, self.training_labels)
        
        print("✅ ML model trained successfully!")
    
    def get_intent(self, user_input):
        """Classify user intent using ML model"""
        processed_input = self.preprocess_text(user_input)
        predicted_intent = self.model.predict([processed_input])[0]
        confidence = max(self.model.predict_proba([processed_input])[0])
        
        return predicted_intent, confidence
    
    def get_response(self, user_input):
        """Generate response based on user input"""
        # Get intent classification
        intent, confidence = self.get_intent(user_input)
        
        # If confidence is too low, provide general response
        if confidence < 0.3:
            return self.get_fallback_response(user_input)
        
        # Get response from knowledge base
        if intent in self.knowledge_base:
            response = random.choice(self.knowledge_base[intent]['responses'])
            return response
        
        return self.get_fallback_response(user_input)
    
    def get_fallback_response(self, user_input):
        """Generate fallback response for unrecognized input"""
        fallback_responses = [
            "That's an interesting question about PM! Could you be more specific? I can help with skills, daily tasks, interviews, career paths, tools, or internships.",
            "I'd love to help with that PM topic! Try asking about specific areas like 'What skills do I need?' or 'How do I prepare for PM interviews?'",
            "Great question! I specialize in PM internship advice. What specific aspect of product management interests you most?",
            f"I understand you're asking about '{user_input}'. Let me help! I can provide insights on PM skills, career paths, interview prep, daily responsibilities, and more."
        ]
        
        return random.choice(fallback_responses)
    
    def save_model(self, filename='pm_chatbot_model.pkl'):
        """Save trained model to file"""
        with open(filename, 'wb') as f:
            pickle.dump({
                'model': self.model,
                'knowledge_base': self.knowledge_base,
                'chat_history': self.chat_history
            }, f)
        print(f"✅ Model saved to {filename}")
    
    def load_model(self, filename='pm_chatbot_model.pkl'):
        """Load trained model from file"""
        try:
            with open(filename, 'rb') as f:
                data = pickle.load(f)
                self.model = data['model']
                self.knowledge_base = data['knowledge_base']
                self.chat_history = data.get('chat_history', [])
            print(f"✅ Model loaded from {filename}")
        except FileNotFoundError:
            print(f"❌ Model file {filename} not found. Using default model.")
    
    def chat(self):
        """Main chat interface"""
        print("=" * 60)
        print("🚀 PM INTERNSHIP AI ASSISTANT")
        print("=" * 60)
        print("Hello! I'm your AI assistant for Product Management internships.")
        print("I can help with skills, interviews, career paths, daily tasks, and more!")
        print("Type 'quit', 'exit', or 'bye' to end the conversation.")
        print("Type 'save' to save our conversation.")
        print("-" * 60)
        
        while True:
            user_input = input("\n💬 You: ").strip()
            
            if not user_input:
                continue
            
            # Check for exit commands
            if user_input.lower() in ['quit', 'exit', 'bye', 'goodbye']:
                print("\n🤖 Bot: Thank you for chatting! Good luck with your PM internship journey! 🚀")
                break
            
            # Check for save command
            if user_input.lower() == 'save':
                self.save_model()
                continue
            
            # Add to chat history
            self.chat_history.append({
                'timestamp': datetime.now().isoformat(),
                'user': user_input,
                'bot': None
            })
            
            # Get bot response
            response = self.get_response(user_input)
            
            # Update chat history with bot response
            self.chat_history[-1]['bot'] = response
            
            # Print response
            print(f"\n🤖 Bot: {response}")
    
    def get_chat_statistics(self):
        """Get statistics about the chat session"""
        stats = {
            'total_messages': len(self.chat_history),
            'unique_intents': len(set(self.get_intent(msg['user'])[0] for msg in self.chat_history if msg['user'])),
            'avg_confidence': np.mean([self.get_intent(msg['user'])[1] for msg in self.chat_history if msg['user']]),
            'session_duration': None
        }
        
        if self.chat_history:
            first_msg = datetime.fromisoformat(self.chat_history[0]['timestamp'])
            last_msg = datetime.fromisoformat(self.chat_history[-1]['timestamp'])
            stats['session_duration'] = str(last_msg - first_msg)
        
        return stats

# Advanced Features and Extensions
class AdvancedPMChatbot(PMChatbot):
    """Extended chatbot with more advanced features"""
    
    def __init__(self):
        super().__init__()
        self.user_profile = {}
        self.conversation_context = []
    
    def analyze_user_interest(self, user_input):
        """Analyze what topics the user is most interested in"""
        intent, confidence = self.get_intent(user_input)
        
        if intent not in self.user_profile:
            self.user_profile[intent] = 0
        self.user_profile[intent] += 1
        
        return intent, confidence
    
    def get_personalized_suggestions(self):
        """Provide personalized suggestions based on user interests"""
        if not self.user_profile:
            return "Feel free to ask me about PM skills, career paths, interviews, or daily responsibilities!"
        
        top_interest = max(self.user_profile, key=self.user_profile.get)
        
        suggestions = {
            'pm_skills': "Since you're interested in PM skills, would you like to know about specific tools or technical requirements?",
            'interviews': "I notice you're focused on interviews. Would you like mock interview questions or company-specific tips?",
            'career_path': "You seem interested in career progression. Want to discuss specific PM roles or salary expectations?",
            'daily_tasks': "Since you're curious about daily work, would you like to know about different PM specializations?",
            'internships': "I see you're focused on internships. Want tips on specific companies or application strategies?"
        }
        
        return suggestions.get(top_interest, "What else would you like to explore about product management?")
    
    def export_chat_history(self, filename=None):
        """Export chat history to JSON file"""
        if not filename:
            filename = f"pm_chat_history_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        export_data = {
            'chat_history': self.chat_history,
            'user_profile': self.user_profile,
            'statistics': self.get_chat_statistics(),
            'export_timestamp': datetime.now().isoformat()
        }
        
        with open(filename, 'w') as f:
            json.dump(export_data, f, indent=2)
        
        print(f"✅ Chat history exported to {filename}")

# Web Interface (optional - requires Flask)
def create_web_interface():
    """Create a simple web interface for the chatbot"""
    try:
        from flask import Flask, render_template_string, request, jsonify
        
        app = Flask(__name__)
        chatbot = PMChatbot()
        
        HTML_TEMPLATE = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>PM Internship Chatbot</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
                .chat-container { max-width: 800px; margin: 0 auto; background: white; border-radius: 10px; padding: 20px; }
                .messages { height: 400px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }
                .message { margin: 10px 0; padding: 8px; border-radius: 5px; }
                .user { background: #007bff; color: white; text-align: right; }
                .bot { background: #f1f1f1; }
                #userInput { width: 70%; padding: 10px; }
                #sendBtn { width: 25%; padding: 10px; background: #007bff; color: white; border: none; }
            </style>
        </head>
        <body>
            <div class="chat-container">
                <h1>🚀 PM Internship AI Assistant</h1>
                <div id="messages" class="messages"></div>
                <input type="text" id="userInput" placeholder="Ask me about PM internships...">
                <button id="sendBtn" onclick="sendMessage()">Send</button>
            </div>
            
            <script>
                function addMessage(message, isUser) {
                    const messagesDiv = document.getElementById('messages');
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message ' + (isUser ? 'user' : 'bot');
                    messageDiv.innerText = message;
                    messagesDiv.appendChild(messageDiv);
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                }
                
                function sendMessage() {
                    const input = document.getElementById('userInput');
                    const message = input.value.trim();
                    if (!message) return;
                    
                    addMessage(message, true);
                    input.value = '';
                    
                    fetch('/chat', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({message: message})
                    })
                    .then(response => response.json())
                    .then(data => addMessage(data.response, false));
                }
                
                document.getElementById('userInput').addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') sendMessage();
                });
            </script>
        </body>
        </html>
        """
        
        @app.route('/')
        def home():
            return render_template_string(HTML_TEMPLATE)
        
        @app.route('/chat', methods=['POST'])
        def chat():
            data = request.json
            response = chatbot.get_response(data['message'])
            return jsonify({'response': response})
        
        print("🌐 Starting web interface at http://localhost:5000")
        app.run(debug=True, host='0.0.0.0', port=5000)
        
    except ImportError:
        print("❌ Flask not installed. Install with: pip install flask")

# Main execution
if __name__ == "__main__":
    print("🤖 PM Internship Chatbot Setup")
    print("=" * 40)
    
    # Choose interface type
    interface = input("Choose interface (1: Terminal, 2: Advanced Terminal, 3: Web): ").strip()
    
    if interface == "1":
        # Basic terminal chatbot
        bot = PMChatbot()
        bot.chat()
    
    elif interface == "2":
        # Advanced terminal chatbot
        bot = AdvancedPMChatbot()
        bot.chat()
        
        # Show statistics and suggestions
        print("\n📊 Chat Statistics:")
        stats = bot.get_chat_statistics()
        for key, value in stats.items():
            print(f"  {key}: {value}")
        
        print(f"\n💡 Personalized suggestion: {bot.get_personalized_suggestions()}")
        
        # Option to export
        export = input("\nExport chat history? (y/n): ").lower()
        if export == 'y':
            bot.export_chat_history()
    
    elif interface == "3":
        # Web interface
        create_web_interface()
    
    else:
        print("Invalid choice. Starting basic terminal interface...")
        bot = PMChatbot()
        bot.chat()