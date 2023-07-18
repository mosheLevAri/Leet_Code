# LeetCode Practice Platform

Welcome to the LeetCode Practice Platform!
This platform provides a LeetCode-style exercise repository and an online code editor, allowing users to practice coding, improve their skills, and analyze their performance using AI tools. The backend is built with Express.js and employs JWT and Passport for secure authentication.

## Features
- LeetCode-Style Exercises: Challenge yourself with a wide range of coding problems that resemble LeetCode exercises.
- Online Code Editor: Write and test your code directly on the platform without the need for any external tools or environments.
- Secure Authentication: The platform utilizes JSON Web Tokens (JWT) and Passport with Google OAuth for secure user authentication.
- Skill Improvement: Track your progress and see how your skills improve over time by analyzing your performance using AI tools.

## Prerequisites
Before running the LeetCode Practice Platform, ensure you have the following installed:

- Node.js: Install Node.js
- MongoDB: Install MongoDB


## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/leetcode-practice-platform.git
```

2. Install dependencies:
``` bash
cd leetcode-practice-platform
npm install
```

3. Set up environment variables:
Create a .env file in the root directory and add the following variables:

``` makefile
Copy code
PORT=3000
DB_CONNECTION_STRING=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

4. Start the server:
``` sql
npm start
```

5. Access the platform:

Open your browser and visit http://localhost:3000 to access the LeetCode Practice Platform.

## Technologies Used
- Frontend: HTML, CSS, JavaScript, React
- Backend: Node.js, Express.js
- Authentication: JSON Web Tokens (JWT), Passport (Google OAuth)
- Database: MongoDB
- AI Tools: GPT (Generative Pre-trained Transformer)

## Contributions
Contributions to the LeetCode Practice Platform are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue on the GitHub repository.