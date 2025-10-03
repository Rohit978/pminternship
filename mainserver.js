const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const app = express();
const port = 3000;
const usersFilePath = path.join(__dirname, 'users.csv');


app.use(cors()); // Allows your frontend to communicate with this server
app.use(express.json()); // Allows the server to read JSON data from requests


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

                if (Object.values(row).some(field => field)) {
                    users.push(row);
                }
            })
            .on('end', () => resolve(users));
    });
};


app.post('/register', async (req, res) => {
    const {
        fullName, email, dob, streetAddress, city, state,
        board10, marks10, board12, marks12, password
    } = req.body;


    if (!email || !password || !fullName) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const users = await getUsers();
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            return res.status(409).json({ message: 'Email address is already registered.' });
        }


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
        res.status(500).json({ message: 'An error occurred on the server.' });
    }
});


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


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }


        const { password: userPassword, ...userWithoutPassword } = user;
        res.status(200).json({ message: 'Login successful!', user: userWithoutPassword });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'An error occurred on the server.' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

