from flask import Flask, jsonify
from neo4j import GraphDatabase
from flask_cors import CORS
from flask import request
import time
import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()
genai.configure(api_key=os.getenv("API_KEY"))

app = Flask(__name__)
CORS(app)

NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USERNAME, NEO4J_PASSWORD))
try:
    with driver.session() as session:
        result = session.run("RETURN 'Hello from Aura!' AS msg")
        for record in result:
            print(record["msg"])
except Exception as e:
    print("Error:", e)


@app.route("/")
def home():
    return {"message": "Flask + Neo4j is working!"}

def run_cypher_query(query):
    with driver.session() as session:
        result = session.run(query)
        return [record.data() for record in result]


def natural_to_cypher(user_query):
    prompt = f"""
    You are an assistant that converts natural language into Cypher queries for Neo4j.
    Database schema:
    (Person)-[:FRIEND]->(Person)
    (Person)-[:LIKES]->(Movie)
    (Movie { { 'title': 'string', 'year': 'int' } })

    User query: "{user_query}"

    Generate only the Cypher query, nothing else.
    """

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    cypher_query = response.candidates[0].content.parts[0].text.strip()

    # Remove code block formatting if present
    cypher_query = cypher_query.replace("```cypher", "").replace("```", "").strip()
    return cypher_query


@app.route("/query", methods=["POST"])
def query():
    try:
        data = request.json
        natural_query = data.get("query")

        cypher_query = natural_to_cypher(natural_query)

        # Execute on Neo4j
        start_time = time.time()
        with driver.session() as session:
            results = session.run(cypher_query)
            records = [record.data() for record in results]
        execution_time = round(time.time() - start_time, 2)
        driver.close()
        return jsonify({
            "naturalQuery": natural_query,
            "cypherQuery": cypher_query,
            "results": records,
            "executionTime": execution_time
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)