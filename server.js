


require('dotenv').config(); // For loading environment variables like the API key
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const fetch = require('node-fetch');




const app = express();
const PORT = process.env.PORT || 3000;
const usersFilePath = path.join(__dirname, 'users.csv');


const GEMINI_API_KEY = process.env.GEMINI_API_KEY;





if (!GEMINI_API_KEY) {
    console.error('FATAL ERROR: GEMINI_API_KEY is not defined in the .env file.');
    process.exit(1); // Exit the application if the key is missing
}

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;




app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.static('public')); // Serve static files (like index.html, dashboard.html, etc.)





const getUsers = () => {
    return new Promise((resolve, reject) => {
        const users = [];
        if (!fs.existsSync(usersFilePath)) {
            return resolve([]);
        }
        fs.createReadStream(usersFilePath)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', row => {
                if (Object.values(row).some(field => field)) { // Skip empty rows
                    users.push(row);
                }
            })
            .on('end', () => resolve(users));
    });
};






app.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const users = await getUsers();
        if (users.find(user => user.email === email)) {
            return res.status(409).json({ message: 'Email address is already registered.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: Date.now().toString(),
            fullName, 
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        };
        
        const writeHeaders = !fs.existsSync(usersFilePath) || fs.readFileSync(usersFilePath, 'utf8').trim().length === 0;
        const csvStream = csv.format({ headers: writeHeaders, includeEndRowDelimiter: true });
        const writableStream = fs.createWriteStream(usersFilePath, { flags: 'a' });
        
        writableStream.on('finish', () => {
             res.status(201).json({ message: 'User registered successfully!' });
        });

        csvStream.pipe(writableStream);
        csvStream.write(newUser);
        csvStream.end();

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'An error occurred on the server during registration.' });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    try {
        console.log(`Login attempt for email: ${email}`);
        const users = await getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            console.log(`User not found for email: ${email}`);
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        
        console.log(`User found for email: ${email}. Comparing password.`);
        const isMatch = await bcrypt.compare(password, user.password || '');

        if (!isMatch) {
            console.log(`Password mismatch for email: ${email}`);
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        
        console.log(`Login successful for email: ${email}`);
        const { password: userPassword, ...userWithoutPassword } = user;
        res.status(200).json({ message: 'Login successful!', user: userWithoutPassword });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'An error occurred on the server during login.' });
    }
});


app.get('/api/applications', async (req, res) => {


    const mockApplications = [
        { id: '101', title: 'Software Engineer Intern', company: 'Tech Solutions Inc.', status: 'Under Review' },
        { id: '102', title: 'Marketing Intern', company: 'Growth Co.', status: 'Accepted' },
        { id: '103', title: 'Data Analyst Intern', company: 'Analytics Firm', status: 'Submitted' },
        { id: '104', title: 'UX/UI Design Intern', company: 'Creative Designs', status: 'Rejected' },
    ];


    setTimeout(() => {
        res.status(200).json(mockApplications);
    }, 1000);
});


app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body) 
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Gemini API Error:', `Status: ${response.status}`, errorBody);
            return res.status(response.status).json({ error: `The AI service returned an error. ${errorBody}` });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Chat Proxy Server Error:', error);
        res.status(500).json({ error: 'An internal server error occurred while connecting to the AI service.' });
    }
});






app.use((err, req, res, next) => {
    console.error('An unhandled error occurred:', err.stack);
    res.status(500).json({ message: 'An internal server error occurred.' });
});





app.listen(PORT, () => {
    console.log(`✅ Unified Server is running successfully!`);
    console.log(`   - User Authentication (Login/Register) is active.`);
    console.log(`   - AI Chatbot Proxy is active.`);
    console.log(`   - User Dashboard data endpoint is active.`);
    console.log(`🚀 Access your application at: http://localhost:${PORT}`);
});

