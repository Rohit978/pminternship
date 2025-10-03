document.addEventListener('DOMContentLoaded', () => {


    const translations = {
        en: {
            gov_of_india: "भारत सरकार / Government of India",
            signin: "Sign-in",
            nav_home: "Home",
            nav_about: "About",
            nav_gallery: "Gallery",
            nav_guidelines: "Guidelines",
            nav_faq: "FAQ",
            nav_contact: "Contact",
            nav_dos_donts: "Do's & Dont's",
            nav_help: "Help",
            help_ai: "AI Help",
            help_mock_interview: "AI Mock Interview",
            help_resume: "Resume Assistant",
            help_predictor: "Predictor",
            hero_title: "Shape India's Future",
            hero_subtitle: "Join prestigious internships across various government ministries and departments. Gain real-world experience while contributing to nation-building initiatives.",
            hero_button: "Explore Programs",
            features_title: "Why Choose Our Internship Program?",
            features_subtitle: "Our program is designed to give you more than just experience—it's a launchpad for your career. We blend hands-on projects with dedicated mentorship and professional development to help you grow.",
            feature1_title: "Hands-On Projects",
            feature1_desc: "You'll work on real-world projects that have a direct impact on our products and services, not just busywork.",
            feature2_title: "Dedicated Mentorship",
            feature2_desc: "Each intern is paired with an experienced mentor who will guide your professional and technical development throughout the program.",
            feature3_title: "Networking Opportunities",
            feature3_desc: "Connect with industry leaders and fellow interns through company events, workshops, and social activities.",
            feature4_title: "Professional Development",
            feature4_desc: "Participate in workshops and training sessions focused on technical skills, communication, and career planning.",
            ministries_title: "Participating Ministries",
            ministries_subtitle: "Choose from diverse departments based on your interests and career goals",
            ministry1_name: "Department of Space (ISRO)",
            ministry1_desc: "Work on cutting-edge space missions and satellite technology",
            ministry2_name: "Ministry of Electronics & IT",
            ministry2_desc: "Contribute to Digital India initiatives and e-governance projects",
            ministry3_name: "Ministry of New & Renewable Energy",
            ministry3_desc: "Support India's transition to sustainable energy solutions",
            ministry4_name: "NITI Aayog",
            ministry4_desc: "Engage with national policy planning and development strategies",
            gallery_title: "EXHIBIT SPACE",
            gallery_item1: "Eve of Independence Day",
            gallery_item2: "Intern Interaction Event",
            gallery_item3: "PMIS North-East Round Table",
            gallery_item4: "PMIS Intern Connect",
            gallery_item5: "PMIS Intern-Industry Interaction",
            gallery_item6: "Cycle-2 Winners",
            gallery_item7: "Working Space",
            gallery_item8: "State Offers",
            gallery_item9: "Offers made by Companies",
            show_more: "Show More",
            testimonials_title: "Success Stories",
            testimonials_subtitle: "Hear from our previous interns",
            testimonial1_text: `"This internship opened doors I never imagined. Working with ISRO gave me insights into India's space program that textbooks couldn't provide."`,
            testimonial1_name: "Priya Sharma",
            testimonial1_role: "ISRO Intern 2024",
            testimonial2_text: `"The mentorship I received at NITI Aayog shaped my understanding of policy-making. Now I work in the development sector with confidence."`,
            testimonial2_name: "Arjun Patel",
            testimonial2_role: "NITI Aayog Intern 2024",
            testimonial3_text: `"Working on Digital India projects taught me how technology can transform governance. The experience was invaluable for my career."`,
            testimonial3_name: "Rajesh Kumar",
            testimonial3_role: "MeitY Intern 2024",
            footer_contact_title: "Contact Us",
            footer_hours: "Mon - Fri: 9:00 AM - 6:00 PM",
            footer_follow_title: "Follow Us",
            footer_gallery_title: "Gallery",
            footer_copyright: "&copy; 2025 PM INTERNSHIP SCHEME.",
            footer_privacy: "Privacy Policy",
            footer_guidelines: "Guidelines",
            footer_faqs: "FAQ's",
        },
        hi: {
            gov_of_india: "Government of India / भारत सरकार",
            signin: "साइन इन करें",
            nav_home: "होम",
            nav_about: "हमारे बारे में",
            nav_gallery: "गैलरी",
            nav_guidelines: "दिशानिर्देश",
            nav_faq: "सामान्य प्रश्न",
            nav_contact: "संपर्क",
            nav_dos_donts: "क्या करें और क्या न करें",
            nav_help: "सहायता",
            help_ai: "एआई सहायता",
            help_mock_interview: "एआई मॉक इंटरव्यू",
            help_resume: "रिज्यूमे सहायक",
            help_predictor: "भविष्यवक्ता",
            hero_title: "भारत के भविष्य को आकार दें",
            hero_subtitle: "विभिन्न सरकारी मंत्रालयों और विभागों में प्रतिष्ठित इंटर्नशिप में शामिल हों। राष्ट्र-निर्माण की पहलों में योगदान करते हुए वास्तविक दुनिया का अनुभव प्राप्त करें।",
            hero_button: "कार्यक्रमों का अन्वेषण करें",
            features_title: "हमारा इंटर्नशिप प्रोग्राम क्यों चुनें?",
            features_subtitle: "हमारा कार्यक्रम आपको केवल अनुभव देने के लिए नहीं बनाया गया है - यह आपके करियर के लिए एक लॉन्चपैड है। हम आपके विकास में मदद करने के लिए व्यावहारिक परियोजनाओं को समर्पित सलाह और व्यावसायिक विकास के साथ मिलाते हैं।",
            feature1_title: "व्यावहारिक परियोजनाएँ",
            feature1_desc: "आप वास्तविक दुनिया की परियोजनाओं पर काम करेंगे जिनका हमारे उत्पादों और सेवाओं पर सीधा प्रभाव पड़ता है, न कि केवल व्यस्त काम।",
            feature2_title: "समर्पित परामर्श",
            feature2_desc: "प्रत्येक प्रशिक्षु को एक अनुभवी संरक्षक के साथ जोड़ा जाता है जो पूरे कार्यक्रम में आपके पेशेवर और तकनीकी विकास का मार्गदर्शन करेगा।",
            feature3_title: "नेटवर्किंग के अवसर",
            feature3_desc: "कंपनी की घटनाओं, कार्यशालाओं और सामाजिक गतिविधियों के माध्यम से उद्योग के नेताओं और साथी प्रशिक्षुओं से जुड़ें।",
            feature4_title: "व्यावसायिक विकास",
            feature4_desc: "तकनीकी कौशल, संचार और करियर योजना पर केंद्रित कार्यशालाओं और प्रशिक्षण सत्रों में भाग लें।",
            ministries_title: "भाग लेने वाले मंत्रालय",
            ministries_subtitle: "अपनी रुचियों और करियर लक्ष्यों के आधार पर विविध विभागों में से चुनें",
            ministry1_name: "अंतरिक्ष विभाग (इसरो)",
            ministry1_desc: "अत्याधुनिक अंतरिक्ष अभियानों और उपग्रह प्रौद्योगिकी पर काम करें",
            ministry2_name: "इलेक्ट्रॉनिक्स और आईटी मंत्रालय",
            ministry2_desc: "डिजिटल इंडिया पहलों और ई-गवर्नेंस परियोजनाओं में योगदान दें",
            ministry3_name: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
            ministry3_desc: "टिकाऊ ऊर्जा समाधानों के लिए भारत के संक्रमण का समर्थन करें",
            ministry4_name: "नीति आयोग",
            ministry4_desc: "राष्ट्रीय नीति योजना और विकास रणनीतियों के साथ जुड़ें",
            gallery_title: "प्रदर्शनी की जगह",
            gallery_item1: "स्वतंत्रता दिवस की पूर्व संध्या",
            gallery_item2: "इंटर्न इंटरेक्शन इवेंट",
            gallery_item3: "पीएमआईएस नॉर्थ-ईस्ट राउंड टेबल",
            gallery_item4: "पीएमआईएस इंटर्न कनेक्ट",
            gallery_item5: "पीएमआईएस इंटर्न-इंडस्ट्री इंटरेक्शन",
            gallery_item6: "साइकिल-2 विजेता",
            gallery_item7: "कार्यक्षेत्र",
            gallery_item8: "राज्य प्रस्ताव",
            gallery_item9: "कंपनियों द्वारा दिए गए प्रस्ताव",
            show_more: "और दिखाओ",
            testimonials_title: "सफलता की कहानियां",
            testimonials_subtitle: "हमारे पिछले प्रशिक्षुओं से सुनें",
            testimonial1_text: `"इस इंटर्नशिप ने ऐसे दरवाजे खोले जिनकी मैंने कभी कल्पना भी नहीं की थी। इसरो के साथ काम करने से मुझे भारत के अंतरिक्ष कार्यक्रम के बारे में ऐसी जानकारी मिली जो पाठ्यपुस्तकें प्रदान नहीं कर सकती थीं।"`,
            testimonial1_name: "प्रिया शर्मा",
            testimonial1_role: "इसरो इंटर्न 2024",
            testimonial2_text: `"नीति आयोग में मुझे जो मार्गदर्शन मिला, उसने नीति-निर्माण की मेरी समझ को आकार दिया। अब मैं आत्मविश्वास के साथ विकास क्षेत्र में काम करता हूं।"`,
            testimonial2_name: "अर्जुन पटेल",
            testimonial2_role: "नीति आयोग इंटर्न 2024",
            testimonial3_text: `"डिजिटल इंडिया परियोजनाओं पर काम करने से मुझे यह सीखने को मिला कि प्रौद्योगिकी शासन को कैसे बदल सकती है। यह अनुभव मेरे करियर के लिए अमूल्य था।"`,
            testimonial3_name: "राजेश कुमार",
            testimonial3_role: "एमईआईटीवाई इंटर्न 2024",
            footer_contact_title: "संपर्क करें",
            footer_hours: "सोम - शुक्र: सुबह 9:00 - शाम 6:00",
            footer_follow_title: "हमें फॉलो करें",
            footer_gallery_title: "गैलरी",
            footer_copyright: "&copy; 2025 पीएम इंटर्नशिप योजना।",
            footer_privacy: "गोपनीयता नीति",
            footer_guidelines: "दिशानिर्देश",
            footer_faqs: "सामान्य प्रश्न",
        },
        be: { // Bengali
            gov_of_india: "भारत सरकार / Government of India",
            signin: "সাইন-ইন করুন",
            nav_home: "হোম",
            nav_about: "আমাদের সম্পর্কে",
            nav_gallery: "গ্যালারি",
            nav_guidelines: "নির্দেশিকা",
            nav_faq: "FAQ",
            nav_contact: "যোগাযোগ",
            nav_dos_donts: "করণীয় এবং অকরণীয়",
            nav_help: "সাহায্য",
            help_ai: "AI সাহায্য",
            help_mock_interview: "AI মক ইন্টারভিউ",
            help_resume: "রেজুমে সহকারী",
            help_predictor: "ভবিষ্যদ্বাণীকারী",
            hero_title: "ভারতের ভবিষ্যৎ গড়ুন",
            hero_subtitle: "বিভিন্ন সরকারি মন্ত্রণালয় ও বিভাগে সম্মানজনক ইন্টার্নশিপে যোগ দিন। দেশ গঠনের উদ্যোগে অবদান রাখার পাশাপাশি বাস্তব অভিজ্ঞতা অর্জন করুন।",
            hero_button: "প্রোগ্রামগুলি দেখুন",
            features_title: "কেন আমাদের ইন্টার্নশিপ প্রোগ্রাম বেছে নেবেন?",
            features_subtitle: "আমাদের প্রোগ্রামটি আপনাকে শুধু অভিজ্ঞতার চেয়েও বেশি কিছু দেওয়ার জন্য ডিজাইন করা হয়েছে—এটি আপনার ক্যারিয়ারের জন্য একটি লঞ্চপ্যাড।",
            feature1_title: "হাতে-কলমে প্রকল্প",
            feature1_desc: "আপনি বাস্তব-বিশ্বের প্রকল্পগুলিতে কাজ করবেন যা আমাদের পণ্য এবং পরিষেবাগুলিতে সরাসরি প্রভাব ফেলে।",
            feature2_title: "উৎসর্গীকৃত পরামর্শ",
            feature2_desc: "প্রতিটি ইন্টার্নকে একজন অভিজ্ঞ পরামর্শদাতার সাথে যুক্ত করা হয় যিনি আপনার পেশাদার এবং প্রযুক্তিগত বিকাশে मार्गदर्शन করবেন।",
            feature3_title: "নেটওয়ার্কিং সুযোগ",
            feature3_desc: "কোম্পানির ইভেন্ট, কর্মশালা এবং সামাজিক কার্যকলাপের মাধ্যমে শিল্পের নেতাদের এবং সহকর্মী ইন্টার্নদের সাথে সংযোগ স্থাপন করুন।",
            feature4_title: "পেশাগত উন্নয়ন",
            feature4_desc: "প্রযুক্তিগত দক্ষতা, যোগাযোগ এবং ক্যারিয়ার পরিকল্পনার উপর দৃষ্টি নিবদ্ধ কর্মশালা এবং প্রশিক্ষণ সেশনে অংশগ্রহণ করুন।",
            ministries_title: "অংশগ্রহণকারী মন্ত্রণালয়",
            ministries_subtitle: "আপনার আগ্রহ এবং ক্যারিয়ারের লক্ষ্যগুলির উপর ভিত্তি করে বিভিন্ন বিভাগ থেকে বেছে নিন",
            ministry1_name: "মহাকাশ বিভাগ (ISRO)",
            ministry1_desc: "অত্যাধুনিক মহাকাশ মিশন এবং উপগ্রহ প্রযুক্তিতে কাজ করুন",
            ministry2_name: "ইলেকট্রনিক্স ও আইটি মন্ত্রণালয়",
            ministry2_desc: "ডিজিটাল ইন্ডিয়া উদ্যোগ এবং ই-গভর্নেন্স প্রকল্পে অবদান রাখুন",
            ministry3_name: "নতুন ও পুনর্নবীকরণযোগ্য শক্তি মন্ত্রণালয়",
            ministry3_desc: "টেকসই শক্তি সমাধানে ভারতের পরিবর্তনে সহায়তা করুন",
            ministry4_name: "নীতি আয়োগ",
            ministry4_desc: "জাতীয় নীতি পরিকল্পনা এবং উন্নয়ন কৌশলগুলির সাথে জড়িত হন",
            testimonials_title: "সাফল্যের গল্প",
            testimonials_subtitle: "আমাদের পূর্ববর্তী ইন্টার্নদের থেকে শুনুন",
            footer_contact_title: "যোগাযোগ করুন",
            footer_follow_title: "আমাদের অনুসরণ করুন",
            footer_gallery_title: "গ্যালারি",
        },
        or: { // Oriya
            gov_of_india: "ଭାରତ ସରକାର / Government of India",
            signin: "ସାଇନ୍-ଇନ୍ କରନ୍ତୁ",
            nav_home: "ହୋମ୍",
            nav_about: "ଆମ ବିଷୟରେ",
            nav_gallery: "ଗ୍ୟାଲେରୀ",
            nav_guidelines: "ନିର୍ଦ୍ଦେଶାବଳୀ",
            nav_faq: "FAQ",
            nav_contact: "ଯୋଗାଯୋଗ",
            nav_dos_donts: "କରଣୀୟ ଏବଂ ଅକରଣୀୟ",
            nav_help: "ସାହାଯ୍ୟ",
            hero_title: "ଭାରତର ଭବିଷ୍ୟତ ଗଢନ୍ତୁ",
            hero_subtitle: "ବିଭିନ୍ନ ସରକାରୀ ମନ୍ତ୍ରଣାଳୟ ଏବଂ ବିଭାଗରେ ସମ୍ମାନଜନକ ଇଣ୍ଟର୍ନସିପରେ ଯୋଗ ଦିଅନ୍ତୁ।",
            hero_button: "ପ୍ରୋଗ୍ରାମଗୁଡିକ ଦେଖନ୍ତୁ",
            features_title: "କାହିଁକି ଆମର ଇଣ୍ଟର୍ନସିପ୍ କାର୍ଯ୍ୟକ୍ରମ ବାଛନ୍ତୁ?",
            ministries_title: "ଅଂଶଗ୍ରହଣକାରୀ ମନ୍ତ୍ରଣାଳୟ",
            testimonials_title: "ସଫଳତାର କାହାଣୀ",
            footer_contact_title: "ଆମ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ",
            footer_follow_title: "ଆମକୁ ଅନୁସରଣ କରନ୍ତୁ",
            footer_gallery_title: "ଗ୍ୟାଲେରୀ",
        },
        ta: { // Tamil
            gov_of_india: "இந்திய அரசு / Government of India",
            signin: "உள்நுழைக",
            nav_home: "முகப்பு",
            nav_about: "எங்களைப் பற்றி",
            nav_gallery: "கேலரி",
            nav_guidelines: "வழிகாட்டுதல்கள்",
            nav_faq: "FAQ",
            nav_contact: "தொடர்பு",
            nav_dos_donts: "செய்ய வேண்டியவை மற்றும் செய்யக்கூடாதவை",
            nav_help: "உதவி",
            hero_title: "இந்தியாவின் எதிர்காலத்தை உருவாக்குங்கள்",
            hero_subtitle: "பல்வேறு அரசாங்க அமைச்சகங்கள் மற்றும் துறைகளில் மதிப்புமிக்க இன்டர்ன்ஷிப்களில் சேரவும்.",
            hero_button: "திட்டங்களைக் கண்டறியவும்",
            features_title: "எங்கள் இன்டர்ன்ஷிப் திட்டத்தை ஏன் தேர்வு செய்ய வேண்டும்?",
            ministries_title: "பங்கேற்கும் அமைச்சகங்கள்",
            testimonials_title: "வெற்றிக் கதைகள்",
            footer_contact_title: "தொடர்பு கொள்ளவும்",
            footer_follow_title: "பின்தொடரவும்",
            footer_gallery_title: "கேலரி",
        },
        ml: { // Malayalam
            gov_of_india: "ഇന്ത്യാ ഗവൺമെൻ്റ് / Government of India",
            signin: "സൈൻ-ഇൻ ചെയ്യുക",
            nav_home: "ഹോം",
            nav_about: "ഞങ്ങളെക്കുറിച്ച്",
            nav_gallery: "ഗാലറി",
            nav_guidelines: "മാർഗ്ഗനിർദ്ദേശങ്ങൾ",
            nav_faq: "FAQ",
            nav_contact: "ബന്ധപ്പെടുക",
            nav_dos_donts: "ചെയ്യേണ്ടതും ചെയ്യരുതാത്തതും",
            nav_help: "സഹായം",
            hero_title: "ഇന്ത്യയുടെ ഭാവി രൂപപ്പെടുത്തുക",
            hero_subtitle: "വിവിധ സർക്കാർ മന്ത്രാലയങ്ങളിലും വകുപ്പുകളിലും അഭിമാനകരമായ ഇൻ്റേൺഷിപ്പുകളിൽ ചേരുക.",
            hero_button: "പ്രോഗ്രാമുകൾ പര്യവേക്ഷണം ചെയ്യുക",
            features_title: "എന്തുകൊണ്ട് ഞങ്ങളുടെ ഇൻ്റേൺഷിപ്പ് പ്രോഗ്രാം തിരഞ്ഞെടുക്കണം?",
            ministries_title: "പങ്കെടുക്കുന്ന മന്ത്രാലയങ്ങൾ",
            testimonials_title: "വിജയകഥകൾ",
            footer_contact_title: "ബന്ധപ്പെടാനുള്ള വിവരങ്ങൾ",
            footer_follow_title: "ഞങ്ങളെ പിന്തുടരുക",
            footer_gallery_title: "ഗാലറി",
        },
        pb: { // Punjabi
            gov_of_india: "ਭਾਰਤ ਸਰਕਾਰ / Government of India",
            signin: "ਸਾਈਨ-ਇਨ ਕਰੋ",
            nav_home: "ਮੁੱਖ ਪੰਨਾ",
            nav_about: "ਸਾਡੇ ਬਾਰੇ",
            nav_gallery: "ਗੈਲਰੀ",
            nav_guidelines: "ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼",
            nav_faq: "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
            nav_contact: "ਸੰਪਰਕ",
            nav_dos_donts: "ਕਰਨ ਵਾਲੇ ਅਤੇ ਨਾ ਕਰਨ ਵਾਲੇ ਕੰਮ",
            nav_help: "ਮਦਦ",
            hero_title: "ਭਾਰਤ ਦੇ ਭਵਿੱਖ ਨੂੰ ਆਕਾਰ ਦਿਓ",
            hero_subtitle: "ਵੱਖ-ਵੱਖ ਸਰਕਾਰੀ ਮੰਤਰਾਲਿਆਂ ਅਤੇ ਵਿਭਾਗਾਂ ਵਿੱਚ ਵੱਕਾਰੀ ਇੰਟਰਨਸ਼ਿਪਾਂ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ।",
            hero_button: "ਪ੍ਰੋਗਰਾਮਾਂ ਦੀ ਪੜਚੋਲ ਕਰੋ",
            features_title: "ਸਾਡਾ ਇੰਟਰਨਸ਼ਿਪ ਪ੍ਰੋਗਰਾਮ ਕਿਉਂ ਚੁਣੋ?",
            ministries_title: "ਭਾਗ ਲੈਣ ਵਾਲੇ ਮੰਤਰਾਲੇ",
            testimonials_title: "ਸਫਲਤਾ ਦੀਆਂ ਕਹਾਣੀਆਂ",
            footer_contact_title: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
            footer_follow_title: "ਸਾਨੂੰ ਫਾਲੋ ਕਰੋ",
            footer_gallery_title: "ਗੈਲਰੀ",
        },
        ur: { // Urdu
            gov_of_india: "حکومت ہند / Government of India",
            signin: "سائن ان کریں",
            nav_home: "ہوم",
            nav_about: "ہمارے بارے میں",
            nav_gallery: "گیلری",
            nav_guidelines: "ہدایات",
            nav_faq: "اکثر पूछे جانے والے سوالات",
            nav_contact: "رابطہ",
            nav_dos_donts: "کیا کریں اور کیا نہ کریں",
            nav_help: "مدد",
            hero_title: "ہندوستان کے مستقبل کو تشکیل دیں",
            hero_subtitle: "مختلف سرکاری وزارتوں اور محکموں میں معزز انٹرنشپ میں شامل ہوں۔",
            hero_button: "پروگرام دریافت کریں",
            features_title: "ہمارا انٹرنشپ پروگرام کیوں منتخب کریں؟",
            ministries_title: "حصہ لینے والی وزارتیں",
            testimonials_title: "کامیابی کی کہانیاں",
            footer_contact_title: "ہم سے رابطہ کریں",
            footer_follow_title: "ہمیں فالو کریں",
            footer_gallery_title: "گیلری",
        },
        ma: { // Marathi
            gov_of_india: "भारत सरकार / Government of India",
            signin: "साईन-इन करा",
            nav_home: "मुख्यपृष्ठ",
            nav_about: "आमच्याबद्दल",
            nav_gallery: "गॅलरी",
            nav_guidelines: "मार्गदर्शक तत्त्वे",
            nav_faq: "FAQ",
            nav_contact: "संपर्क",
            nav_dos_donts: "काय करावे आणि काय करू नये",
            nav_help: "मदत",
            hero_title: "भारताच्या भविष्याला आकार द्या",
            hero_subtitle: "विविध सरकारी मंत्रालये आणि विभागांमध्ये प्रतिष्ठित इंटर्नशिपमध्ये सामील व्हा.",
            hero_button: "कार्यक्रम एक्सप्लोर करा",
            features_title: "आमचा इंटर्नशिप प्रोग्राम का निवडावा?",
            ministries_title: "सहभागी मंत्रालये",
            testimonials_title: "यशोगाथा",
            footer_contact_title: "संपर्क साधा",
            footer_follow_title: "आम्हाला फॉलो करा",
            footer_gallery_title: "गॅलरी",
        },
        ka: { // Kannada
            gov_of_india: "ಭಾರತ ಸರ್ಕಾರ / Government of India",
            signin: "ಸೈನ್-ಇನ್ ಮಾಡಿ",
            nav_home: "ಮುಖಪುಟ",
            nav_about: "ನಮ್ಮ ಬಗ್ಗೆ",
            nav_gallery: "ಗ್ಯಾಲರಿ",
            nav_guidelines: "ಮಾರ್ಗಸೂಚಿಗಳು",
            nav_faq: "FAQ",
            nav_contact: "ಸಂಪರ್ಕಿಸಿ",
            nav_dos_donts: "ಮಾಡಬೇಕಾದ ಮತ್ತು ಮಾಡಬಾರದ ಕೆಲಸಗಳು",
            nav_help: "ಸಹಾಯ",
            hero_title: "ಭಾರತದ ಭವಿಷ್ಯವನ್ನು ರೂಪಿಸಿ",
            hero_subtitle: "ವಿವಿಧ ಸರ್ಕಾರಿ ಸಚಿವಾಲಯಗಳು ಮತ್ತು ಇಲಾಖೆಗಳಲ್ಲಿ ಪ್ರತಿಷ್ಠಿತ ಇಂಟರ್ನ್‌ಶಿಪ್‌ಗಳಿಗೆ ಸೇರಿ.",
            hero_button: "ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
            features_title: "ನಮ್ಮ ಇಂಟರ್ನ್‌ಶಿಪ್ ಕಾರ್ಯಕ್ರಮವನ್ನು ಏಕೆ ಆರಿಸಬೇಕು?",
            ministries_title: "ಭಾಗವಹಿಸುವ ಸಚಿವಾಲಯಗಳು",
            testimonials_title: "ಯಶಸ್ಸಿನ ಕಥೆಗಳು",
            footer_contact_title: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
            footer_follow_title: "ನಮ್ಮನ್ನು ಹಿಂಬಾಲಿಸಿ",
            footer_gallery_title: "ಗ್ಯಾಲರಿ",
        },
        bh: { // Bhojpuri
            gov_of_india: "भारत सरकार / Government of India",
            signin: "साइन-इन करीं",
            nav_home: "होम",
            nav_about: "हमनी के बारे में",
            nav_gallery: "गैलरी",
            nav_guidelines: "दिशानिर्देश",
            nav_faq: "FAQ",
            nav_contact: "संपर्क",
            nav_dos_donts: "का करीं का ना करीं",
            nav_help: "मदद",
            hero_title: "भारत के भविष्य के आकार दीं",
            hero_subtitle: "विभिन्न सरकारी मंत्रालयन अउर विभागन में प्रतिष्ठित इंटर्नशिप में शामिल होईं।",
            hero_button: "कार्यक्रम खोजीं",
            features_title: "हमनी के इंटर्नशिप प्रोग्राम काहे चुनीं?",
            ministries_title: "भाग लेवे वाला मंत्रालय",
            testimonials_title: "सफलता के कहानी",
            footer_contact_title: "संपर्क करीं",
            footer_follow_title: "फॉलो करीं",
            footer_gallery_title: "गैलरी",
        },
        hs: { // Haryanvi
            gov_of_india: "भारत सरकार / Government of India",
            signin: "साइन-इन करो",
            nav_home: "होम",
            nav_about: "म्हारे बारे में",
            nav_gallery: "गैलरी",
            nav_guidelines: "दिशानिर्देश",
            nav_faq: "FAQ",
            nav_contact: "संपर्क",
            nav_dos_donts: "के करना है अर के नहीं",
            nav_help: "मदद",
            hero_title: "भारत के भविष्य नै आकार द्यो",
            hero_subtitle: "अलग-अलग सरकारी मंत्रालयां अर विभागां म्ह प्रतिष्ठित इंटर्नशिप म्ह शामिल होओ।",
            hero_button: "प्रोग्राम देखो",
            features_title: "म्हारा इंटर्नशिप प्रोग्राम क्यूं चुणो?",
            ministries_title: "भाग लेण आले मंत्रालय",
            testimonials_title: "कामयाबी की कहाणी",
            footer_contact_title: "संपर्क करो",
            footer_follow_title: "हमें फॉलो करो",
            footer_gallery_title: "गैलरी",
        }
    };

    const languageSelect = document.getElementById('language-select');

    const changeLanguage = (lang) => {
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        document.documentElement.lang = lang; // Update the page's lang attribute
    };

    languageSelect.addEventListener('change', (event) => {
        changeLanguage(event.target.value);
    });
    

    changeLanguage(languageSelect.value);



    (function() {
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotContainer = document.getElementById('chatbot-container');
        const chatMinimize = document.getElementById('chat-minimize');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const chatSendBtn = document.getElementById('chatSendBtn');
        const mlStatus = document.getElementById('ml-status');

        let isOpen = false;
        let modelReady = false;


        async function initializeML() {
            try {
                mlStatus.textContent = 'Loading ML Model...';
                const success = await chatbotML.initialize();
                
                if (success) {
                    modelReady = true;
                    mlStatus.textContent = 'AI Ready';
                    chatSendBtn.disabled = false;
                    
                    const stats = chatbotML.getStats();
                    console.log('📊 Model Stats:', stats);
                    
                    if (isOpen) {
                        addBotMessage(`🎉 AI Model loaded successfully!\n\nTrained on ${stats.totalPatterns} examples across ${stats.totalIntents} categories.\nAccuracy: ${stats.trainingAccuracy}\n\nAsk me anything!`);
                    }
                } else {
                    mlStatus.textContent = 'Error Loading';
                    showError();
                }
            } catch (error) {
                console.error('Initialization error:', error);
                mlStatus.textContent = 'Error';
                showError();
            }
        }


        function showError() {
            addBotMessage("⚠️ I'm having trouble loading my AI brain. Please refresh the page or try the contact page for support.");
        }



        initializeML();
        

        function toggleChatbot() {
            isOpen = !isOpen;
            chatbotContainer.classList.toggle('active');
            chatbotToggle.classList.toggle('active');
            
            if (isOpen && chatMessages.children.length === 1) { // Only show welcome message on first open
                setTimeout(() => {
                    if (modelReady) {
                        addBotMessage("Hello! 👋 I'm an ML-powered assistant. I've been trained on hundreds of questions about the PM Internship Portal. Ask me anything!");
                    } else {
                        addBotMessage("Hello! 👋 I'm loading my AI model... This will take just a moment. Thanks for your patience!");
                    }
                }, 500);
            }
            
            if (isOpen) {
                chatInput.focus();
            }
        }

        if (chatbotToggle) chatbotToggle.addEventListener('click', toggleChatbot);
        if (chatMinimize) chatMinimize.addEventListener('click', toggleChatbot);


        function addMessage(text, isBot = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = isBot ? '<i class="fas fa-brain"></i>' : '<i class="fas fa-user"></i>';
            
            const content = document.createElement('div');
            content.className = 'message-content';
            content.textContent = text;
            
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(content);
            chatMessages.appendChild(messageDiv);
            scrollToBottom();
        }


        function addBotMessage(text, showSuggestions = false, suggestions = []) {
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                addMessage(text, true);
                
                if (showSuggestions && suggestions.length > 0) {
                    addQuickReplies(suggestions);
                }
            }, 1000 + Math.random() * 500);
        }


        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot typing-message';
            typingDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-brain"></i>
                </div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            scrollToBottom();
        }


        function removeTypingIndicator() {
            const typingMsg = chatMessages.querySelector('.typing-message');
            if (typingMsg) typingMsg.remove();
        }


        function addQuickReplies(replies) {
            const quickRepliesDiv = document.createElement('div');
            quickRepliesDiv.className = 'quick-replies';
            
            replies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'quick-reply-btn';
                btn.textContent = reply;
                btn.onclick = () => {
                    quickRepliesDiv.remove();
                    addMessage(reply, false);
                    handleUserMessage(reply);
                };
                quickRepliesDiv.appendChild(btn);
            });
            
            chatMessages.appendChild(quickRepliesDiv);
            scrollToBottom();
        }


        async function handleUserMessage(message) {
            if (!modelReady) {
                addBotMessage("I'm still loading my AI model. Please wait a moment! 🤖");
                return;
            }

            try {
                const result = await chatbotML.processQuery(message);
                
                console.log(`💬 User: "${message}"`);
                console.log(`🤖 Intent: ${result.intent || 'unknown'}, Confidence: ${(result.confidence * 100).toFixed(2)}%`);
                
                const showSuggestions = result.suggestions && result.suggestions.length > 0;
                addBotMessage(result.response, showSuggestions, result.suggestions || []);
                
                logInteraction(message, result);
                
            } catch (error) {
                console.error('Error processing message:', error);
                addBotMessage("Sorry, I encountered an error processing your question. Please try again or contact support.");
            }
        }


        function logInteraction(userMessage, mlResult) {
            const interaction = {
                timestamp: new Date().toISOString(),
                userMessage: userMessage,
                predictedIntent: mlResult.intent,
                confidence: mlResult.confidence,
                response: mlResult.response
            };
            
            const interactions = JSON.parse(localStorage.getItem('chatbot_interactions') || '[]');
            interactions.push(interaction);
            
            if (interactions.length > 100) {
                interactions.shift();
            }
            
            localStorage.setItem('chatbot_interactions', JSON.stringify(interactions));
            console.log('📊 Interaction logged');
        }


        function sendMessage() {
            const message = chatInput.value.trim();
            
            if (message) {
                addMessage(message, false);
                chatInput.value = '';
                chatSendBtn.disabled = true;
                handleUserMessage(message);
            }
        }


        if (chatSendBtn) {
            chatSendBtn.addEventListener('click', sendMessage);
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage();
                }
            });

            chatInput.addEventListener('input', () => {
                if (chatSendBtn && modelReady) {
                    chatSendBtn.disabled = !chatInput.value.trim();
                }
            });
        }


        function scrollToBottom() {
            if (chatMessages) {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }


        window.viewChatbotAnalytics = function() {
            const interactions = JSON.parse(localStorage.getItem('chatbot_interactions') || '[]');
            console.log('📊 Chatbot Analytics:');
            console.log(`Total interactions: ${interactions.length}`);
            
            if (interactions.length > 0) {
                const intentCounts = {};
                let totalConfidence = 0;
                
                interactions.forEach(i => {
                    intentCounts[i.predictedIntent] = (intentCounts[i.predictedIntent] || 0) + 1;
                    totalConfidence += i.confidence;
                });
                
                console.log('Intent distribution:', intentCounts);
                console.log(`Average confidence: ${(totalConfidence / interactions.length * 100).toFixed(2)}%`);
                console.log('Recent interactions:', interactions.slice(-10));
            }
        };
    })();

    const carouselTrack = document.getElementById('carousel-track');
    const toggleButton = document.getElementById('toggleButton');
    const carouselContainer = document.getElementById('carouselContainer');
    let isExpanded = false;
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    const showSlide = () => {
        if (!isExpanded) {
            carouselTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
    };

    const nextSlide = () => {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide();
    };

    let slideInterval = setInterval(nextSlide, 3000);

    toggleButton.addEventListener('click', () => {
        isExpanded = !isExpanded;
        carouselContainer.classList.toggle('expanded');
        toggleButton.textContent = isExpanded ? 'Show Less' : 'Show More';
        if (isExpanded) {
            clearInterval(slideInterval);
            carouselTrack.style.transform = 'none';
        } else {
            showSlide();
            slideInterval = setInterval(nextSlide, 3000);
        }
    });
    

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const images = Array.from(document.querySelectorAll('.block img'));
    let currentImageIndex;

    const showLightbox = (index) => {
        lightbox.style.display = 'flex';
        lightboxImg.src = images[index].src;
        currentImageIndex = index;
    };
    
    images.forEach((img, index) => {
        img.parentElement.addEventListener('click', () => showLightbox(index));
    });

    closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
    
    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    };
    
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);

});
