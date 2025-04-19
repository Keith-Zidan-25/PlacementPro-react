import os
import json
import nltk
import string

import numpy as np
import pandas as pd

from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import DBSCAN
from sentence_transformers import SentenceTransformer

nltk.download('punkt')
nltk.download('wordnet')
model = SentenceTransformer('all-MiniLM-L6-v2')

class WeakTopicAnalyzer:
    _cached_data = None
    
    def __init__(self, wrong_questions):
        self.wrong_questions = wrong_questions
        self.topic_embeddings = []
        self.topic_labels = []
        self.topic_mapping = {}
            
    def perform_analysis(self):
        """Runs the Analysis Pipeline

        Returns:
            sorted_topic (list): List of weak topics sorted by cluster
            most_common_topic (str): The final classified weakness of the user  
        """
        if WeakTopicAnalyzer._cached_data is None:
            self.predefined_topic_parser()
        sorted_topics, most_common_topic = self.classify_and_cluster()
        return sorted_topics, most_common_topic
    
    def preprocess_text(self, text) -> str:
        """
        Preprocess the Text by Lemmatizing (turning the words to their base form), Lowercasing, Striping any punctuation & Tokenizing.
        Args:
            text (str): Questions in text format for preprocessing
        Returns:
            processed_text (str): Processed tokens returned in string format
        """
        lemmatizer = WordNetLemmatizer()
        text = text.lower()
        text = text.translate(str.maketrans('', '', string.punctuation))
        tokens = word_tokenize(text)
        tokens = [lemmatizer.lemmatize(word) for word in tokens]
        return " ".join(tokens)
    
    def classify_question(self, question) -> str:
        """
        Classifies the Questions into Pre-defined Topics for Clustering.
        Args:
            question (any): Incorrectly answered question during the quiz

        Returns:
            topic_lables (list): List of Identified Topic Labels
        """
        question_embedding = model.encode([question])
        similarities = cosine_similarity(question_embedding, self.topic_embeddings).flatten()
        best_match_index = similarities.argmax()
        return self.topic_labels[best_match_index]
    
    def group_weak_topics(self, weak_topic_counts):
        """
        Groups together the classified weak topic points to provide the final/proper weak topic to provide to the user by filtering the clusters provided by DBSCAN.

        Args:
            weak_topic_counts (Series): List of all the Topics & subtopics identified by the classifier & DBSCAN Algorithm

        Returns:
            final_weak_topic (tuple): Main Topic or Topics that the user failed to user correctly
        """
        grouped_topics = {}
        for subtopic, count in weak_topic_counts.items():
            parent_topic = self.topic_mapping.get(subtopic, "Miscellaneous")
            grouped_topics[parent_topic] = grouped_topics.get(parent_topic, 0) + count
        
        sorted_topics = sorted(grouped_topics.items(), key=lambda x: x[1], reverse=True)
        most_common_topic = sorted_topics[0][0] if sorted_topics else "Unknown"
        
        return sorted_topics, most_common_topic
    
    def classify_and_cluster(self):
        classified_data = []
        wrong_questions = self.wrong_questions
        for q in wrong_questions:
            q_processed = self.preprocess_text(q)
            topic = self.classify_question(q_processed)
            classified_data.append((q, topic))

        classified_df = pd.DataFrame(classified_data, columns=['Question', 'Topic'])

        question_embeddings = model.encode(classified_df['Question'])

        dbscan = DBSCAN(eps=0.75, min_samples=3, metric='cosine')
        classified_df['Cluster'] = dbscan.fit_predict(question_embeddings)

        weak_topics = classified_df[classified_df['Cluster'] != -1]
        weak_topic_counts = weak_topics['Topic'].value_counts()
        
        sorted_topics, most_common_topic = self.group_weak_topics(weak_topic_counts)
        
        return sorted_topics, most_common_topic
        
    def predefined_topic_parser(self):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, 'data.json')
        
        if WeakTopicAnalyzer._cached_data is None:
            with open(file_path,mode="r") as f:
                topics_data = json.load(f)["topics"]

            topic_sentences = []
            topic_labels = []
            topic_mapping = {}

            for category, subtopics in topics_data.items():
                for subcategory, topic_list in subtopics.items():
                    sentence = " ".join(topic_list)
                    topic_sentences.append(sentence)
                    label = f"{category} -> {subcategory}"
                    topic_labels.append(label)
                    topic_mapping[label] = category

            embeddings = model.encode(topic_sentences)
            WeakTopicAnalyzer._cached_data = (embeddings, topic_labels, topic_mapping)
            print(f"Topic embeddings: {embeddings}")

        self.topic_embeddings, self.topic_labels, self.topic_mapping = WeakTopicAnalyzer._cached_data