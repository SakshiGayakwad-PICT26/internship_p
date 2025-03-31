import os
import numpy as np
from deepface import DeepFace
import pickle
import cv2
from mtcnn import MTCNN

# Path to dataset
dataset_path = "dataset"
embeddings = {}

detector = MTCNN()

def crop_face(img_path):
    img = cv2.imread(img_path)
    if img is None:
        return None
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    detections = detector.detect_faces(rgb_img)
    
    if detections:
        x, y, w, h = detections[0]["box"]
        x, y = max(0, x), max(0, y)  # Ensure positive coordinates
        return rgb_img[y:y+h, x:x+w]
    return None

def train_facenet():
    for user_name in os.listdir(dataset_path):
        user_folder = os.path.join(dataset_path, user_name)
        if not os.path.isdir(user_folder):
            continue
        
        embeddings[user_name] = []
        
        for file in os.listdir(user_folder):
            if file.lower().endswith((".jpg", ".jpeg", ".png")):
                img_path = os.path.join(user_folder, file)
                face_img = crop_face(img_path)
                if face_img is None:
                    print(f"Skipping {file}: Face not detected")
                    continue

                try:
                    embedding = DeepFace.represent(face_img, model_name="Facenet", enforce_detection=False)[0]["embedding"]
                    embeddings[user_name].append(embedding)
                except Exception as e:
                    print(f"Skipping {file}: {e}")
        
        if embeddings[user_name]:
            embeddings[user_name] = np.mean(embeddings[user_name], axis=0)
    
    with open("face_embeddings.pkl", "wb") as f:
        pickle.dump(embeddings, f)
    
    print("✅ FaceNet training complete! Embeddings saved.")

if __name__ == "__main__":
    train_facenet()
