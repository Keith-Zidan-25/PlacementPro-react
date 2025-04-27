import os
import uuid

from flask import Blueprint, request, jsonify
from utils.resume_analysis import allowed_file, analyze_resume_with_mistral_ai, extract_text_from_resume, extract_skills_from_text

resume_bp = Blueprint('resume', __name__)

CURRENT_DIR = os.getcwd()
MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')
MISTRAL_API_URL = os.getenv('MISTRAL_API_URL')

os.makedirs(CURRENT_DIR + '/tmp', exist_ok=True)

@resume_bp.route('/upload-resume', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({ 'success': False, 'error': "No file provided." }), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({ 'success': False, 'error': "No selected file." }), 400

    if file and allowed_file(file.filename):
        try:
            file_id = str(uuid.uuid4())
            filename = f"{file_id}.pdf"
            filepath = os.path.join(CURRENT_DIR, 'tmp', filename)
            file.save(filepath)

            return jsonify({ 'success': True, 'msg': 'File Successfully uploaded', 'file_id': file_id }), 200
        except Exception as e:
            return jsonify({ 'success': False, 'error': str(e) }), 500

@resume_bp.route('/analyze-resume/<file_id>', methods=['GET'])
def analyze_by_id(file_id):
    try:
        filename = f"{file_id}.pdf"
        filepath = os.path.join(CURRENT_DIR, 'tmp', filename)
        if not os.path.exists(filepath):
            return jsonify({ 'success': False, 'error': 'File not found' }), 404

        text = extract_text_from_resume(filepath)
        skills = extract_skills_from_text(text)

        result = analyze_resume_with_mistral_ai(text, api_key=MISTRAL_API_KEY, api_url=MISTRAL_API_URL)

        if result.get('error', False):
            return jsonify({ 'success': False, 'error': result.get('message', 'AI error') }), 500

        data = {
            "ats_score": result.get("ats_score", 60),
            "key_information": {
                "personal_details": result.get("key_information", {}).get("personal_details", []),
                "education": result.get("key_information", {}).get("education", []),
                "skills": result.get("key_information", {}).get("skills", []),
                "experience": result.get("key_information", {}).get("experience", []),
                "projects": result.get("key_information", {}).get("projects", [])
            },
            "strengths": result.get("strengths", [])[:5],
            "improvements": result.get("improvements", [])[:5],
            "suitable_roles": result.get("suitable_roles", [])[:5],
            "skills_to_develop": result.get("skills_to_develop", [])[:5],
            "recommended_certs": result.get("recommended_certs", [])[:5],
            "keywords": result.get("keywords", [])[:10],
        }
        return jsonify({ 'success': True, 'data': data }), 200

    except Exception as e:
        return jsonify({ 'success': False, 'error': str(e) }), 500
    
    finally:
        if os.path.exists(filepath):
            os.remove(filepath)