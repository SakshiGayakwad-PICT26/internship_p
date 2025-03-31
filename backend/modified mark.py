import cv2
import numpy as np
from mtcnn import MTCNN
from deepface import DeepFace
import pickle
import csv
import os
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity

# Load stored face embeddings
with open("face_embeddings.pkl", "rb") as f:
    stored_embeddings = pickle.load(f)

# Attendance marking
def mark_attendance(name):
    date_str = datetime.now().strftime("%Y-%m-%d")
    time_str = datetime.now().strftime("%H:%M:%S")
    filename = f"attendance_{date_str}.csv"

    file_exists = os.path.isfile(filename)
    with open(filename, "a", newline="") as csvfile:
        writer = csv.writer(csvfile)
        if not file_exists:
            writer.writerow(["Name", "Date", "Time"])
        writer.writerow([name, date_str, time_str])

# Calculate cosine similarity
def cosine_sim(vec1, vec2):
    return cosine_similarity([vec1], [vec2])[0][0]

# Face recognition function
def recognize_face():
    detector = MTCNN()
    cap = cv2.VideoCapture(0)
    marked_names = set()

    if not cap.isOpened():
        print("❌ Error: Cannot access the camera.")
        return

    print("📷 Camera started. Press 'q' to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("❌ Failed to grab frame.")
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        detections = detector.detect_faces(rgb_frame)

        for detection in detections:
            confidence = detection.get('confidence', 0)
            if confidence < 0.95:
                continue  # skip low-confidence faces

            x, y, w, h = detection['box']
            x, y = max(0, x), max(0, y)

            # Skip tiny faces (e.g., <80px)
            if w < 80 or h < 80:
                continue

            face_img = frame[y:y+h, x:x+w]

            try:
                embedding = DeepFace.represent(face_img, model_name="Facenet", enforce_detection=False)[0]["embedding"]
            except Exception as e:
                print("⚠️ Embedding failed:", e)
                continue

            identity = "Unknown"
            best_sim = -1
            sim_threshold = 0.6  # 🔒 more strict for accuracy

            for name, stored_embedding in stored_embeddings.items():
                sim = cosine_sim(embedding, stored_embedding)
                if sim > best_sim and sim > sim_threshold:
                    best_sim = sim
                    identity = name

            # Draw and mark
            if identity != "Unknown":
                if identity not in marked_names:
                    mark_attendance(identity)
                    marked_names.add(identity)
                    label = f"{identity} - Marked ✅"
                    print(f"✅ {identity} marked.")
                else:
                    label = f"{identity} - Already Marked 🟡"
            else:
                label = "Unknown ❌"

            cv2.rectangle(frame, (x, y), (x + w, y + h),
                          (0, 255, 0) if identity != "Unknown" else (0, 0, 255), 2)
            cv2.putText(frame, label, (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

        cv2.imshow("📸 Face Recognition Attendance", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("👋 Exiting...")
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    recognize_face()
    