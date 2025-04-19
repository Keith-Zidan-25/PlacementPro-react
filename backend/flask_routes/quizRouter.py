
from flask import Blueprint, request, jsonify
from utils.quiz_analysis import WeakTopicAnalyzer

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/analyse-quiz', methods=['POST'])
def analysis():
    data = request.json
    print(f"Received Data: {data}")
    input_data = data.get('questions', {})
    wrong_questions = [entry["question"] for entry in input_data.values()]
    print(f"Found Questions: {wrong_questions}")
    
    w = WeakTopicAnalyzer(wrong_questions)
    sorted_topics, most_common_topic = w.perform_analysis()
    
    return jsonify({
        "success": True,
        "sorted_topics": sorted_topics,
        "most_common_topic": most_common_topic
    }), 200
