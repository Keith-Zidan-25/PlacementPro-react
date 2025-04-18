import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from datetime import datetime

reference_data = {
    'average_cgpa': 7.5,
    'average_internships': 1.2,
    'average_projects': 3.5,
    'placed_cgpa_avg': 8.1,
    'placed_internships_avg': 1.8,
    'placed_projects_avg': 4.2,
    'popular_skills': {
        'Python': 85,
        'Java': 65,
        'SQL': 60,
        'HTML/CSS': 55,
        'JavaScript': 50,
        'Machine Learning': 45,
        'Data Analytics': 40,
        'Cloud Computing': 30,
        'Mobile Development': 25
    }
}

def generate_skills_chart(user_skills, folder_path):
    """Generate a chart comparing user skills with industry demand"""
    plt.figure(figsize=(10, 6))
    
    # Data preparation
    all_skills = list(reference_data['popular_skills'].keys())
    user_has_skill = [1 if skill in user_skills else 0 for skill in all_skills]
    industry_demand = [reference_data['popular_skills'][skill]/100 for skill in all_skills]
    
    # Create chart
    x = np.arange(len(all_skills))
    width = 0.35
    
    fig, ax = plt.subplots(figsize=(12, 7))
    rects1 = ax.bar(x - width/2, user_has_skill, width, label='Your Skills', color='#7b1fa2')
    rects2 = ax.bar(x + width/2, industry_demand, width, label='Industry Demand', color='#e1bee7')
    
    # Add labels and formatting
    ax.set_title('Your Skills vs Industry Demand', fontsize=16)
    ax.set_ylabel('Presence / Demand Level', fontsize=12)
    ax.set_xticks(x)
    ax.set_xticklabels(all_skills, rotation=45, ha='right')
    ax.legend()
    ax.grid(axis='y', linestyle='--', alpha=0.7)
    
    # Add value annotations
    for rect in rects1:
        height = rect.get_height()
        if height > 0:
            ax.annotate('Yes', xy=(rect.get_x() + rect.get_width() / 2, height),
                        xytext=(0, 3), textcoords="offset points",
                        ha='center', va='bottom', fontweight='bold')
    
    for rect in rects2:
        height = rect.get_height()
        ax.annotate(f'{int(height*100)}%', xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3), textcoords="offset points",
                    ha='center', va='bottom')
    
    plt.tight_layout()
    
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"{folder_path}/skills_chart_{timestamp}.png"
    plt.savefig(filename)
    plt.close()
    
    return filename

def generate_cgpa_comparison(user_cgpa,  folder_path):
    """Generate a chart comparing user's CGPA with averages"""
    user_cgpa = float(user_cgpa)
    
    categories = ['Your CGPA', 'Average CGPA', 'Avg. CGPA (Placed Students)']
    values = [user_cgpa, reference_data['average_cgpa'], reference_data['placed_cgpa_avg']]
    colors = ['#7b1fa2' if i == 0 else '#9c27b0' for i in range(len(categories))]
    
    plt.figure(figsize=(10, 6))
    bars = plt.bar(categories, values, color=colors)
    plt.axhline(y=reference_data['placed_cgpa_avg'], color='red', linestyle='--', alpha=0.7, 
                label=f"Placement Threshold ({reference_data['placed_cgpa_avg']})")
    
    # Add value labels on top of bars
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 0.1,
                f'{height:.1f}', ha='center', va='bottom')
    
    plt.title('CGPA Comparison', fontsize=16)
    plt.ylabel('CGPA (out of 10)', fontsize=12)
    plt.ylim(0, 10.5)  # Set y-axis limit for CGPA scale
    plt.legend()
    plt.grid(axis='y', linestyle='--', alpha=0.3)
    
    # Save chart
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"{folder_path}/cgpa_chart_{timestamp}.png"
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()
    
    return filename

def generate_experience_chart(internships, projects, folder_path):
    """Generate a chart showing impact of experience"""
    internships = int(internships)
    projects = int(projects)
    
    categories = ['Internships', 'Projects']
    your_values = [internships, projects]
    avg_values = [reference_data['average_internships'], reference_data['average_projects']]
    placed_values = [reference_data['placed_internships_avg'], reference_data['placed_projects_avg']]
    
    x = np.arange(len(categories))
    width = 0.25
    
    fig, ax = plt.subplots(figsize=(10, 6))
    rects1 = ax.bar(x - width, your_values, width, label='Your Experience', color='#7b1fa2')
    rects2 = ax.bar(x, avg_values, width, label='Average', color='#9c27b0')
    rects3 = ax.bar(x + width, placed_values, width, label='Placed Students', color='#e1bee7')
    
    # Add labels and formatting
    ax.set_title('Experience Comparison', fontsize=16)
    ax.set_ylabel('Count', fontsize=12)
    ax.set_xticks(x)
    ax.set_xticklabels(categories)
    ax.legend()
    ax.grid(axis='y', linestyle='--', alpha=0.7)
    
    # Add value annotations
    for rects in [rects1, rects2, rects3]:
        for rect in rects:
            height = rect.get_height()
            ax.annotate(f'{height:.1f}', xy=(rect.get_x() + rect.get_width() / 2, height),
                        xytext=(0, 3), textcoords="offset points",
                        ha='center', va='bottom')
    
    plt.tight_layout()
    
    # Save chart
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    filename = f"{folder_path}/experience_chart_{timestamp}.png"
    plt.savefig(filename)
    plt.close()
    
    return filename

def generate_recommendations(cgpa, internships, projects, skills, prediction_result):
    """Generate personalized recommendations based on profile"""
    recommendations = []
    cgpa = float(cgpa)
    internships = int(internships)
    projects = int(projects)
    
    if cgpa < reference_data['placed_cgpa_avg']:
        gap = reference_data['placed_cgpa_avg'] - cgpa
        recommendations.append(f"Focus on improving your academic performance. Aim to increase your CGPA by at least {gap:.1f} points to match the average of placed students.")
    
    if internships < reference_data['placed_internships_avg']:
        recommendations.append(f"Consider taking on more internships. Placed students have an average of {reference_data['placed_internships_avg']} internships.")
    
    if projects < reference_data['placed_projects_avg']:
        recommendations.append(f"Work on more projects to demonstrate your applied skills. Try to complete at least {int(reference_data['placed_projects_avg']) - projects} more projects.")
    
    missing_popular_skills = []
    for skill, popularity in reference_data['popular_skills'].items():
        if popularity > 50 and skill not in skills:
            missing_popular_skills.append(skill)
    
    if missing_popular_skills:
        recommendations.append(f"Consider learning these in-demand skills: {', '.join(missing_popular_skills[:3])}.")
    
    if not recommendations:
        if prediction_result['prediction'] == 'You are Likely to be Placed':
            recommendations.append("Your profile is strong. Consider taking on leadership roles to further enhance your resume.")
            recommendations.append("Start preparing for technical interviews and aptitude tests early.")
        else:
            recommendations.append("Focus on practical applications of your skills through personal projects.")
            recommendations.append("Consider participating in hackathons or coding competitions to stand out.")
    
    return recommendations