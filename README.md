# Interview Question Generator

A lightweight web tool that takes any job title and returns three thoughtful, role-specific interview questions — powered by the Google Gemini API.

Built as part of a technical screen exercise. The goal was to keep the code simple, readable, and secure.

---

## Live Demo

[View the live site →](https://your-site-name.netlify.app)

---

## What It Does

1. User enters a job title (e.g. *Customer Success Manager*)
2. On submission, the page calls a serverless function
3. The function proxies the request to the Google Gemini API
4. Three tailored interview questions are returned and displayed

---

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | Plain HTML, CSS, JavaScript (no framework) |
| Backend | Netlify Serverless Function (Node.js) |
| AI | Google Gemini API (`gemini-2.5-flash`) |
| Hosting | Netlify |

---

## Project Structure

```
├── index.html                  # Frontend UI
├── netlify/
│   └── functions/
│       └── ask.js              # Serverless function — proxies requests to Gemini
├── netlify.toml                # Netlify configuration
└── README.md
```

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) — `npm install -g netlify-cli`
- An [Gemini API key](https://aistudio.google.com/app/apikey)

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/babaolu/InterGen.git
cd interview-question-generator

# 2. Install dependencies
npm install

# 3. Add your API key to a local environment file
echo "GEMINI_API_KEY=your_key_here" > .env

# 4. Start the local dev server (serves both the site and the function)
netlify dev
```

The app will be available at `http://localhost:8888`.

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## Deploying to Netlify

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Netlify

- Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
- Select your repository
- Leave build settings as default (no build command needed)

### 3. Add the API Key as an Environment Variable

In the Netlify dashboard:

**Site configuration → Environment variables → Add a variable**

| Key | Value |
|---|---|
| `GEMINI_API_KEY` | `AIty...` |

The key is stored securely server-side and is never exposed to the browser.

### 4. Deploy

Netlify will deploy automatically on every push to `main`.

---

## Security

- The Gemini API key is stored exclusively as a Netlify environment variable — it is never written in code or committed to the repository
- The serverless function acts as a proxy, so the key is never visible in the browser or network requests from the client
- No user data, personal information, or session data is stored or logged

---

## Design Decisions

**Why a serverless function instead of calling the API directly from the browser?**
Calling the Gemini API directly from client-side JavaScript would expose the API key to anyone who inspects the network tab. The serverless function keeps the key server-side while adding minimal complexity.

**Why no framework?**
The UI is simple enough that plain HTML/CSS/JS is the right tool. No build step, no dependencies on the frontend, easy to read.

**Why Gemini 2.5 Flash?**
Good balance of response quality and speed for this use case. The prompt is straightforward so a frontier model is not required.

---

## License

MIT
