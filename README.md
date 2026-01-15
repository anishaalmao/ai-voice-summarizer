🎙️ AI Voice Summarizer

A full-stack web application that allows users to record or upload voice notes, automatically transcribe speech to text, and generate an AI-powered summary.

Built with a focus on clean UX, modular backend design, and real-world AI tooling.

⸻

✨ Features
	•	🎤 Record voice directly in the browser
	•	📁 Upload pre-recorded audio files
	•	🧠 Speech-to-text using local OpenAI Whisper
	•	✨ AI summarization using Hugging Face (BART)
	•	🎨 Clean, pastel-themed UI
	•	📋 Copy transcript with one click

⸻

🧱 Tech Stack

Frontend
	•	React
	•	CSS (custom styling)
	•	MediaRecorder API

Backend
	•	Node.js
	•	Express
	•	Multer (file uploads)
	•	Python (Whisper)
	•	Hugging Face Inference API

🧠 How It Works
	1.	User records or uploads an audio file
	2.	Backend runs local Whisper to generate transcript
	3.	Transcript is returned to frontend
	4.	User clicks Summarize
	5.	Hugging Face model generates a concise summary

⸻

🚀 Getting Started

Prerequisites
	•	Node.js
	•	Python 3
	•	FFmpeg installed

Backend Setup
```cd backend```
```npm install```
Create .env file: HF_API_KEY=your_huggingface_api_key
Run backend: ```node index.js```

Frontend Setup
```cd frontend```
```npm install```
```npm start```

App runs at: http://localhost:3000

📌 Future Improvements
	•	Download transcript as text file
	•	Multi-language support
	•	History of past recordings
	•	Improved summary formatting

🧑‍💻 Author
Anishaa Chaudhuri
B.Tech Computer Science Student
Passionate about full-stack development and AI-powered applications