from flask_cors import CORS
# from flask_session import Session
from flask import Flask
from flask_routes.resumeRouter import resume_bp
from flask_routes.quizRouter import quiz_bp

app = Flask(__name__)

# Session(app)
CORS(app, supports_credentials=True)
# CORS(app, origins=['http://localhost:5173', 'http://localhost:3020'])

app.secret_key = 'placement_predictor_secret_key'  # Required for flash messages and sessions

app.register_blueprint(resume_bp, url_prefix='/api/resume')
app.register_blueprint(quiz_bp, url_prefix='/api/quiz')

if __name__ == '__main__':
    app.run(debug=True)