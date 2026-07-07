# AI Meeting Notes Summarizer

## Overview

AI Meeting Notes Summarizer is a web application that uses Azure OpenAI and Azure AI Language Services to automatically summarize meeting transcripts and extract important information.

## Features

- Executive Summary
- Key Discussion Points
- Decisions Taken
- Action Items
- Named Entity Recognition (People, Organizations, Locations, Dates)
- PDF Export
- Responsible AI Notice

## Technologies Used

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- jsPDF

### Backend
- Node.js
- Express.js

### Azure Services
- Azure OpenAI (GPT-5 Mini)
- Azure AI Language Service

## Project Structure

```
ai-meeting-notes-summarizer/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend folder using `.env.example`.

Required variables:

```
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_MODEL=
AZURE_LANGUAGE_ENDPOINT=
AZURE_LANGUAGE_KEY=
PORT=5000
```

## Future Improvements

- Audio transcription support
- Speaker identification
- Meeting history
- Authentication
- Cloud deployment

## Authors

Raashmi Chekuri
VIT-AP University