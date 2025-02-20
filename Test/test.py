from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Assuming you have a database with questions and answers
def connect_db():
    return sqlite3.connect('questions.db')

@app.route('/upload_question', methods=['POST'])
def upload_question():
    question_data = request.json
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO questions (question, correct_answer) VALUES (?, ?)",
                   (question_data['question'], question_data['correct_answer']))
    conn.commit()
    conn.close()
    return jsonify({"message": "Question uploaded"}), 201

@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    user_answer = request.json['answer']
    question_id = request.json['question_id']
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT correct_answer FROM questions WHERE id = ?", (question_id,))
    correct_answer = cursor.fetchone()
    
    if correct_answer and user_answer.lower() == correct_answer[0].lower():  # Case insensitive match
        score = 1
    else:
        score = 0
    
    # Store score or return directly
    conn.close()
    return jsonify({"score": score})

if __name__ == '__main__':
    app.run(debug=True)
