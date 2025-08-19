# GraphRAG

GraphRAG is a Flask-based API that bridges natural language queries with Neo4j graph databases by automatically translating plain English into Cypher queries. It leverages Google Gemini for natural language understanding and provides a developer-friendly REST API with CORS support for frontend integration.

---

## 📑 Table of Contents

1. [Features](#features)
2. [Architecture Overview](#architecture-overview)
3. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Environment Variables](#environment-variables)
   * [Running the App](#running-the-app)
4. [API Endpoints](#api-endpoints)
5. [Example Database Schema](#example-database-schema)
6. [Demo](#demo)
7. [Future Enhancements](#future-enhancements)
8. [Notes](#notes)
9. [License](#license)
10. [Acknowledgments](#acknowledgments)

---
## ✨Features

- **Natural Language to Cypher:** Converts user-friendly questions into Cypher queries using Google Gemini.
- **Neo4j Integration:** Connects seamlessly to a Neo4j Aura instance or self-hosted database.
- **REST API:** Provides HTTP endpoints for submitting queries and retrieving results.
- **CORS Enabled:** Ready for integration with web frontends.
- **Environment-based Configuration:** Securely manages credentials and API keys with `.env`.
- **Performance Tracking** → Returns execution time for each query.
---

## 🏗 Architecture Overview

1. User sends a **natural language query** via API.
2. Google Gemini processes and generates an equivalent **Cypher query**.
3. Flask executes the Cypher query against the **Neo4j database**.
4. Results + metadata (execution time, original query) are returned as JSON.

---
## Getting Started

### Prerequisites

- Python 3.8+
- [Neo4j Aura](https://neo4j.com/cloud/aura/) account or local Neo4j instance
- [Google Gemini API](https://ai.google.dev/) key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rasika1205/GraphRAG.git
   cd GraphRAG
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root with the following keys:

   ```env
   API_KEY=your_google_gemini_api_key
   NEO4J_URI=bolt://<your_neo4j_host>:<port>
   NEO4J_USERNAME=your_neo4j_username
   NEO4J_PASSWORD=your_neo4j_password
   ```

4. **Run the app**

   ```bash
   python app.py
   ```

   The API will be accessible at `http://localhost:5000/`.

## 📡 API Endpoints

### `GET /`

Health check endpoint.

**Response:**
```json
{ "message": "Flask + Neo4j is working!" }
```

### `POST /query`

Submit a natural language query.

**Request:**
```json
{
  "query": "Who are the friends of Alice?"
}
```

**Response:**
```json
{
  "naturalQuery": "Who are the friends of Alice?",
  "cypherQuery": "MATCH (a:Person {name: 'Alice'})-[:FRIEND]->(b:Person) RETURN b",
  "results": [ ... ],
  "executionTime": 0.15
}
```

## Example Database Schema

- `(Person)-[:FRIEND]->(Person)`
- `(Person)-[:LIKES]->(Movie)`
- `(Movie { title: 'string', year: 'int' })`

## 🖼 Demo
<img width="1460" height="911" alt="Screenshot 2025-08-19 204347" src="https://github.com/user-attachments/assets/957e1dbf-fb73-474c-a149-a812ffb2db31" />
<img width="1616" height="911" alt="Screenshot 2025-08-19 204303" src="https://github.com/user-attachments/assets/311460aa-45d1-4add-9297-2b1a872ba47b" />


---

## 🔮 Future Enhancements

* **Frontend UI** → Build a React/Vue dashboard for query input and result visualization.
* **Graph Visualization** → Integrate with libraries like `D3.js` or `Neo4j Bloom` for interactive graph views.
* **Multi-Database Support** → Extend beyond Neo4j to support SQL/NoSQL databases.
* **Advanced NLP** → Incorporate LLM fine-tuning for more accurate Cypher generation.
* **Authentication & Rate Limiting** → Add JWT-based authentication for production use.
* **Caching Layer** → Speed up repeated queries using Redis or similar.

---

## 📝 Notes

* Ensure your **Neo4j Aura instance is accessible** and IP whitelisted if cloud-hosted.
* Use `debug=False` in production mode.
* For scalability, consider deploying with Docker + Gunicorn.

---

## 📜 License

This project is **proprietary** and protected by copyright © 2025 Rasika Gautam.

You are welcome to view the code for educational or evaluation purposes (e.g., portfolio review by recruiters).  
However, you may **not copy, modify, redistribute, or claim this project as your own** under any circumstances — including in interviews or job applications — without written permission.

---


## 🙌 Acknowledgments

* [Flask](https://flask.palletsprojects.com/)
* [Neo4j Python Driver](https://neo4j.com/docs/api/python-driver/current/)
* [Google Gemini API](https://ai.google.dev/)

---
## 🧑‍💻 Author

**Rasika Gautam**
*Data Science & AI Enthusiast* | B.Tech MAC, NSUT
[GitHub](https://github.com/rasika1205)

