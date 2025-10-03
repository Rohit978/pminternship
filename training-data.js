const TRAINING_DATA = {
    intents: [
        {
            tag: 'greeting',
            patterns: [
                'hello', 'hi', 'hey', 'good morning', 'good evening', 'greetings',
                'whats up', 'howdy', 'hi there', 'hello there', 'yo', 'is anyone there?'
            ],
            responses: [
                "Hello! 👋 Welcome to the PM Internship Portal. How can I help you today?",
                "Hi there! I'm here to assist with your internship questions. What would you like to know?",
                "Hey! Great to see you. Ask me anything about the internship program!"
            ]
        },
        {
            tag: 'goodbye',
            patterns: [
                'bye', 'goodbye', 'see you later', 'cya', 'exit', 'quit', 'talk to you later'
            ],
            responses: [
                "Goodbye! Have a great day.",
                "Talk to you later! 👋",
                "Farewell! Good luck with your application."
            ]
        },
        {
            tag: 'eligibility',
            patterns: [
                'am i eligible', 'eligibility criteria', 'who can apply', 'can i apply',
                'requirements', 'qualifications needed', 'what are the requirements',
                'do i qualify', 'eligibility', 'age limit', 'percentage needed',
                'marks required', 'what are the qualifications', 'age requirements',
                'who is this for', 'what do I need to apply?'
            ],
            responses: [
                "📋 Eligibility Criteria:\n\n✓ Indian citizen\n✓ Age: 18-25 years\n✓ Currently enrolled in recognized institution\n✓ Minimum 60% aggregate marks\n✓ All streams welcome\n\nReserved categories get 5% relaxation. Do you meet these criteria?"
            ]
        },
        {
            tag: 'application_process',
            patterns: [
                'how to apply', 'application process', 'apply for internship', 'registration',
                'sign up', 'how do i apply', 'application steps', 'apply', 'register',
                'signup process', 'enrollment', 'what are the steps to apply', 'application guide',
                'where do I sign up?', 'walk me through the application', 'how to register on the portal',
                'steps for signing up', 'where is the application form'
            ],
            responses: [
                "📝 Application Process:\n\n1. Click 'Sign-in' and create account\n2. Complete your profile\n3. Upload required documents\n4. Browse available internships\n5. Submit application\n6. Track status in dashboard\n\nThe process takes about 30 minutes. Need help with any step?"
            ]
        },
        {
            tag: 'documents',
            patterns: [
                'required documents', 'what documents needed', 'documents to upload', 'certificates needed',
                'what to submit', 'document list', 'papers required', 'documentation', 'upload documents',
                'id proof', 'photo specifications', 'what kind of photo', 'list of required papers',
                'what documents do I need to upload?', 'what files are needed for the application'
            ],
            responses: [
                "📄 Required Documents:\n\nMandatory:\n✓ Photo (passport size)\n✓ ID proof (Aadhaar/PAN)\n✓ Educational certificates\n✓ Marksheets\n✓ College ID/Bonafide\n✓ Resume\n\nOptional:\n• Category certificate\n• Experience certificates\n• Portfolio\n\nAll in PDF format, max 2MB each."
            ]
        },
        {
            tag: 'ministries',
            patterns: [
                'which ministries', 'available departments', 'where can i apply', 'ministry list',
                'organizations', 'which department', 'govt departments', 'available ministries',
                'ministry options', 'what departments can I intern at?'
            ],
            responses: [
                "🏛️ Available Ministries:\n\n🚀 ISRO - Space technology\n💻 MeitY - Digital India\n🌱 Renewable Energy\n📊 NITI Aayog\n💼 Finance Ministry\n🏥 Health Ministry\n🎓 Education Ministry\n⚡ Power Ministry\n\nAnd 20+ more! Which area interests you?"
            ]
        },
        {
            tag: 'stipend',
            patterns: [
                'stipend amount', 'how much paid', 'salary', 'payment', 'compensation',
                'money', 'pay', 'monthly stipend', 'how much will i get', 'stipend range',
                'is the internship paid?', 'how much is the pay?'
            ],
            responses: [
                "💰 Stipend Details:\n\nRange: ₹5,000 - ₹30,000/month\n\n• Entry level: ₹5,000-₹8,000\n• Intermediate: ₹10,000-₹15,000\n• Technical: ₹15,000-₹25,000\n• Research: ₹20,000-₹30,000\n\nPlus: Certificate, recommendation letter, networking opportunities!"
            ]
        },
        {
            tag: 'duration',
            patterns: [
                'how long', 'internship duration', 'time period', 'length of internship',
                'how many months', 'duration', 'internship period', 'tenure', 'what is the time commitment'
            ],
            responses: [
                "⏱️ Duration Options:\n\n📅 Short-term: 2-3 months\n📅 Regular: 6 months (most common)\n📅 Extended: 12 months\n\nMost internships are 6 months with possibility of extension. Which duration works for you?"
            ]
        },
        {
            tag: 'selection_process',
            patterns: [
                'selection process', 'how are interns selected', 'interview', 'selection criteria',
                'shortlisting', 'selection rounds', 'interview process', 'how to get selected',
                'what do they look for in an intern?', 'is there an interview?'
            ],
            responses: [
                "🎯 Selection Process:\n\n1. Application screening (1 week)\n2. Shortlisting (1-2 weeks)\n3. Interview (phone/video)\n4. Final selection (1 week)\n\nBased on:\n• Academics (30%)\n• Skills (30%)\n• Interview (25%)\n• SOP (15%)\n\nWant interview tips?"
            ]
        },
        {
            tag: 'contact',
            patterns: [
                'contact', 'phone number', 'email', 'reach you', 'address', 'support',
                'help desk', 'contact details', 'call', 'email address', 'who can I talk to for help?'
            ],
            responses: [
                "📞 Contact Information:\n\n🏢 JSS Academy, Sector-62, Noida-201301\n📧 pminternship@gmail.com\n☎️ 1800-122-244\n🌐 www.pmgovhelp.com\n\n⏰ Mon-Fri: 9 AM - 6 PM\nResponse: 24-48 hours\n\nHow else can I help?"
            ]
        },
        {
            tag: 'deadline',
            patterns: [
                'deadline', 'last date', 'when to apply', 'application deadline', 'closing date',
                'apply by when', 'time limit', 'due date', 'when is the last day to apply?'
            ],
            responses: [
                "📅 Application Timeline:\n\nRolling admissions throughout the year!\n\n🌸 Summer Batch: Apply Feb-April\n❄️ Winter Batch: Apply Sep-Nov\n📚 Year-round positions: Apply anytime\n\nDifferent ministries have different cycles. Check individual listings for specific deadlines!"
            ]
        },
        {
            tag: 'certificate',
            patterns: [
                'certificate', 'will i get certificate', 'certification', 'completion certificate',
                'govt certificate', 'proof', 'what proof do i get of completion?'
            ],
            responses: [
                "📜 Certification:\n\nYes! You'll receive:\n✓ Official Government of India certificate\n✓ Internship completion letter\n✓ Performance-based recommendation letter\n\nThe certificate includes:\n• Duration of internship\n• Ministry/Department name\n• Performance evaluation\n• Official seal\n\nValued by employers nationwide!"
            ]
        },
        {
            tag: 'thanks',
            patterns: [
                'thank you', 'thanks', 'appreciate it', 'helpful', 'great', 'awesome',
                'perfect', 'thanks a lot', 'that was helpful', 'ok thanks'
            ],
            responses: [
                "You're welcome! 😊 Feel free to ask more questions. Good luck with your application!",
                "Happy to help! 🎯 Best wishes for your internship journey!",
                "My pleasure! Don't hesitate to reach out anytime! 🚀"
            ]
        },
        {
            tag: 'benefits',
            patterns: [
                'benefits', 'what will i get', 'advantages', 'perks', 'what do i gain',
                'internship benefits', 'advantages of internship', 'what are the perks?'
            ],
            responses: [
                "🎁 Internship Benefits:\n\n✓ Government certificate\n✓ Stipend (₹5k-30k/month)\n✓ Hands-on experience\n✓ Mentorship from officials\n✓ Networking opportunities\n✓ Recommendation letters\n✓ Job opportunities\n✓ Skill development workshops\n✓ Resume boost\n\nInvaluable career experience!"
            ]
        },
        {
            tag: 'rejection',
            patterns: [
                'what if rejected', 'if i dont get selected', 'rejection', 'not selected',
                'failed application', 'didnt get in', 'can I apply again if I fail?'
            ],
            responses: [
                "Don't worry! If not selected:\n\n1. You can reapply next cycle\n2. Apply to other ministries\n3. We provide feedback for improvement\n4. Consider skill development courses\n5. Network with alumni for tips\n\nMany successful interns were rejected first time. Keep trying! 💪"
            ]
        },
        {
            tag: 'mock_interview',
            patterns: [
                'mock interview', 'ai mock interview', 'interview practice', 'interview analysis',
                'prepare for interview', 'help me practice for my interview'
            ],
            responses: [
                "🎙️ Our AI Mock Interview tool helps you practice your interview skills and get instant feedback. You can access it from the 'Help' dropdown or by visiting the analyse.html page."
            ]
        },
        {
            tag: 'resume_assistant',
            patterns: [
                'resume assistant', 'resume builder', 'cv analyser', 'help with my resume',
                'check my resume', 'resume analyzer', 'analyze my resume', 'CV help',
                'make a resume', 'create a CV', 'how to build my resume',
                'resume creation tool', 'CV builder', 'improve my resume'
            ],
            responses: [
                "📄 The Resume Assistant helps you build and analyze your resume to meet industry standards. Find it under the 'Help' menu in the main navigation, or go directly to the resume.html page."
            ]
        },
        {
            tag: 'predictor',
            patterns: [
                'predictor', 'internship predictor', 'chance of selection', 'predict my chances',
                'selection predictor', 'what are my chances of getting selected'
            ],
            responses: [
                "🔮 The Internship Predictor analyzes your profile to estimate your selection chances for various ministries. Try it out from the 'Help' menu, or navigate to the prediction.html page."
            ]
        },
        {
            tag: 'unknown',
            patterns: [
                'asdfgh', 'what is the weather', 'tell me a joke', 'how does this site work',
                'can you tell me more', 'what is this website for?', 'who made this?'
            ],
            responses: [
                "I'm sorry, I can only answer questions related to the internship program. Please ask me about eligibility, application process, ministries, or stipends.",
                "My apologies, but that's outside the scope of what I can help with. I am trained to answer questions about the Government of India Internship Program.",
                "I'm not sure how to answer that. Could you please ask a question about the internship application, duration, or benefits?"
            ]
        }
    ]
};

// For Node.js (train-model.js), we export the object directly.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TRAINING_DATA;
}
