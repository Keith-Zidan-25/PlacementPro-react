# app.config['UPLOAD_FOLDER'] = 'uploads'
# app.config['CHART_FOLDER'] = 'static/charts'
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload size

# app.config['MISTRAL_API_URL'] = "https://api.mistral.ai/v1/chat/completions"
# app.config['ALLOWED_EXTENSIONS'] = {'pdf', 'docx', 'doc'}

# Create necessary directories
# os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
# os.makedirs(app.config['CHART_FOLDER'], exist_ok=True)

# Load ML model and encoders
# try:
#     model = pickle.load(open('model/model.pkl', 'rb'))
#     label_encoders = pickle.load(open('model/label_encoders.pkl', 'rb'))
#     print("Model and encoders loaded successfully")
# except Exception as e:
#     print(f"Error loading model or encoders: {e}")
#     # Create dummy model and encoders for development if needed
#     model = None
#     label_encoders = {}

# Global session state variables
# @app.before_request
# def before_request():
#     if 'resume_text' not in session:
#         session['resume_text'] = ""
#     if 'resume_skills' not in session:
#         session['resume_skills'] = []

# @app.route('/')
# def home():
#     # Clear any existing session data
#     session.clear()
#     return render_template('index.html')

# @app.route('/input')
# def input_form():
#     return render_template('result.html', 
#                           resume_text=session.get('resume_text', ''), 
#                           show_input=True)

# @app.route('/result', methods=['POST'])
# def result():
#     try:
#         # Get form data
#         cgpa = request.form.get('cgpa')
#         internships = request.form.get('internships')
#         projects = request.form.get('projects')
#         selected_skills = request.form.getlist('skills')
        
#         # Input validation
#         if not all([cgpa, internships, projects]):
#             flash("Please fill all required fields", "error")
#             return redirect(url_for('input_form'))
        
#         try:
#             cgpa = float(cgpa)
#             if not (0 <= cgpa <= 10):
#                 flash("CGPA must be between 0 and 10", "error")
#                 return redirect(url_for('input_form'))
#         except ValueError:
#             flash("CGPA must be a number", "error")
#             return redirect(url_for('input_form'))
        
#         try:
#             internships = int(internships)
#             projects = int(projects)
#             if internships < 0 or projects < 0:
#                 flash("Number of internships and projects cannot be negative", "error")
#                 return redirect(url_for('input_form'))
#         except ValueError:
#             flash("Number of internships and projects must be integers", "error")
#             return redirect(url_for('input_form'))
        
#         # Combine resume and selected skills
#         resume_skills = session.get('resume_skills', [])
#         all_skills = list(set(resume_skills + selected_skills))
        
#         # Create profile
#         profile = {
#             'cgpa': cgpa,
#             'internships': internships,
#             'projects': projects,
#             'skills': all_skills
#         }
        
#         # Feature engineering and prediction
#         prediction_result = {}
#         if model:
#             # Convert profile to features
#             features = convert_to_features(profile, label_encoders)
            
#             # Prepare input for model
#             columns = ['cgpa', 'internships', 'projects', 'skill_python', 'skill_java', 'skill_sql',
#                        'skill_ml', 'skill_ai', 'skill_html', 'skill_css', 'skill_c++',
#                        'skill_react', 'skill_nodejs']
            
#             input_df = pd.DataFrame([features], columns=columns)
            
#             # Make prediction
#             prediction = model.predict(input_df)[0]
#             prediction_label = 'You are Likely to be Placed' if prediction == 1 else 'You are Likely to be Not Placed'
#             prediction_proba = model.predict_proba(input_df)[0][1]
            
#             prediction_result = {
#                 'prediction': prediction_label,
#                 'probability': round(prediction_proba * 100, 2)
#             }
#         else:
#             # If model is not available, use a dummy prediction
#             print("Using dummy prediction as model is not available")
#             prediction_result = {
#                 'prediction': 'You are Likely to be Placed' if cgpa >= 7.5 else 'You are Likely to be Not Placed',
#                 'probability': 85 if cgpa >= 7.5 else 45
#             }
        
#         # Generate charts
#         charts = {
#             'skills_chart': generate_skills_chart(all_skills),
#             'cgpa_chart': generate_cgpa_comparison(cgpa),
#             'experience_chart': generate_experience_chart(internships, projects)
#         }
        
#         # Generate recommendations
#         recommendations = generate_recommendations(cgpa, internships, projects, all_skills, prediction_result)
        
#         return render_template('result.html',
#                               resume_text=session.get('resume_text', ''),
#                               show_input=True,
#                               prediction=prediction_result['prediction'],
#                               proba=prediction_result['probability'],
#                               cgpa=cgpa,
#                               internships=internships,
#                               projects=projects,
#                               skills=all_skills,
#                               charts=charts,
#                               recommendations=recommendations)
    
#     except Exception as e:
#         print(f"Error processing result: {e}")
#         import traceback
#         traceback.print_exc()
#         flash(f"Error processing result: {str(e)}", 'error')
#         return redirect(url_for('input_form'))