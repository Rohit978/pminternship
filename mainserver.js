const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const app = express();
const port = 3000;
const usersFilePath = path.join(__dirname, 'users.csv');

// Middleware
app.use(cors()); // Allows your frontend to communicate with this server
app.use(express.json()); // Allows the server to read JSON data from requests

// Helper function to read users from the CSV file
const getUsers = () => {
    return new Promise((resolve, reject) => {
        const users = [];
        // Ensure file exists before reading
        if (!fs.existsSync(usersFilePath)) {
            return resolve([]);
        }
        fs.createReadStream(usersFilePath)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => reject(error))
            .on('data', row => {
                // Skip empty rows that might exist in the CSV
                if (Object.values(row).some(field => field)) {
                    users.push(row);
                }
            })
            .on('end', () => resolve(users));
    });
};

// --- REGISTRATION ENDPOINT ---
app.post('/register', async (req, res) => {
    const {
        fullName, email, dob, streetAddress, city, state,
        board10, marks10, board12, marks12, password
    } = req.body;

    // Basic validation to ensure required fields are present
    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const users = await getUsers();
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return res.status(409).json({ message: 'Email address is already registered.' });
        }

        // Securely hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            id: Date.now().toString(), // Create a simple unique ID
            fullName,
            email,
            dob,
            streetAddress,
            city,
            state,
            board10,
            marks10,
            board12,
            marks12,
            password: hashedPassword, // Store the secure hashed password
            createdAt: new Date().toISOString()
        };
        
        // Check if the CSV file is empty or doesn't exist to decide whether to write headers
        const writeHeaders = !fs.existsSync(usersFilePath) || fs.readFileSync(usersFilePath, 'utf8').trim().length === 0;

        // Use a streaming approach to append the new user to the CSV file
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
        res.status(500).json({ message: 'An error occurred on the server.' });
    }
});

// --- LOGIN ENDPOINT ---
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    try {
        const users = await getUsers();
        const user = users.find(u => u.email === email);

        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Securely compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Important: Do not send the hashed password back to the client
        const { password: userPassword, ...userWithoutPassword } = user;
        res.status(200).json({ message: 'Login successful!', user: userWithoutPassword });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'An error occurred on the server.' });
    }
});

// Start the server and listen for requests on port 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

