import os
import traceback

from flask import Blueprint, request, jsonify
from utils.resume_analysis import allowed_file, analyze_resume_with_mistral_ai, extract_text_from_resume, extract_skills_from_text
from werkzeug.utils import secure_filename

resume_bp = Blueprint('resume', __name__)

CURRENT_DIR = os.getcwd()
MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')
MISTRAL_API_URL = os.getenv('MISTRAL_API_URL')

os.makedirs(CURRENT_DIR + '/temp', exist_ok=True)

@resume_bp.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    if 'file' not in request.files:
        return jsonify({'success': False, 'msg': "system could not locate the file"}), 402

    file = request.files['file']

    if file.filename == '':
        return jsonify({'success': False, 'msg': "Resume data couldn't be located"}), 402

    if file and allowed_file(file.filename):
        try:
            filename = secure_filename(file.filename)
            filepath = os.path.join(f'{CURRENT_DIR}/temp', filename)
            file.save(filepath)

            print(f"Processing file: {filename}")
            text = extract_text_from_resume(filepath)
            print(f"Extracted text length: {len(text)} characters")

            skills = extract_skills_from_text(text)
            print(f"Extracted skills: {skills}")

            print(f"Calling Mistral AI API with API key: {MISTRAL_API_KEY}...")
            result = analyze_resume_with_mistral_ai(
                text,
                api_key=MISTRAL_API_KEY,
                api_url=MISTRAL_API_URL
            )

            if result.get('error', False):
                error_msg = result.get('message', 'Unknown API error')
                print(f"API Error: {error_msg}")
                return jsonify({'success': False, 'msg': 'Error while processing Resume'}), 500

            print(f"Analysis completed successfully with sections: {list(result.keys())}")
            print(f"ATS Score: {result.get('ats_score')}")
            print(f"Key Info Keys: {list(result.get('key_information', {}).keys())}")
            print(f"Strengths Count: {len(result.get('strengths', []))}")

            if result.get('ats_score') is None:
                print("Warning: ATS score is missing")
                result['ats_score'] = 60

            data = {
                "ats_score": result.get("ats_score"),
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

            print("Analysis result successfully built")
            os.remove(filepath)

            return jsonify({'success': True, 'data': data}), 200

        except Exception as e:
            traceback.print_exc()
            print(f"Resume analysis error: {e}")
            return jsonify({'success': False, 'msg': 'Error while processing Resume'}), 500
    else:
        return jsonify({'success': False, 'msg': "Invalid file type. Please upload PDF or DOCX files."}), 500
