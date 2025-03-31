
# import cv2
# import numpy as np
# from mtcnn import MTCNN
# from deepface import DeepFace
# import pickle
# import csv
# import os
# import sys
# from datetime import datetime
# from sklearn.metrics.pairwise import cosine_similarity

# if len(sys.argv) < 2:
#     print("❌ Error: Subject name not provided!")
#     sys.exit(1)

# subject_name = sys.argv[1]
# date_str = datetime.now().strftime("%Y-%m-%d")
# attendance_file = f"attendance_{subject_name}_{date_str}.csv"

# with open("face_embeddings.pkl", "rb") as f:
#     stored_embeddings = pickle.load(f)

# if not os.path.exists(attendance_file):
#     with open(attendance_file, "w", newline="") as csvfile:
#         writer = csv.writer(csvfile)
#         writer.writerow(["Subject", "Name", "Date", "Time", "Status"])

# def mark_attendance(name):
#     time_str = datetime.now().strftime("%H:%M:%S")

#     with open(attendance_file, "a", newline="") as csvfile:
#         writer = csv.writer(csvfile)
#         writer.writerow([subject_name, name, date_str, time_str, "Present"])

# def cosine_sim(vec1, vec2):
#     return cosine_similarity([vec1], [vec2])[0][0]

# def recognize_face():
#     detector = MTCNN()
#     cap = cv2.VideoCapture(0)
#     marked_names = set()

#     if not cap.isOpened():
#         print("❌ Error: Cannot access the camera.")
#         return

#     print(f"📷 Attendance started for {subject_name}. Press 'q' to stop.")

#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             print("❌ Failed to grab frame.")
#             break

#         rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         detections = detector.detect_faces(rgb_frame)

#         for detection in detections:
#             confidence = detection.get('confidence', 0)
#             if confidence < 0.95:
#                 continue

#             x, y, w, h = detection['box']
#             x, y = max(0, x), max(0, y)

#             if w < 80 or h < 80:
#                 continue

#             face_img = frame[y:y+h, x:x+w]

#             try:
#                 embedding = DeepFace.represent(face_img, model_name="Facenet", enforce_detection=False)[0]["embedding"]
#             except Exception as e:
#                 print("⚠️ Embedding failed:", e)
#                 continue

#             identity = "Unknown"
#             best_sim = -1
#             sim_threshold = 0.6  

#             for name, stored_embedding in stored_embeddings.items():
#                 sim = cosine_sim(embedding, stored_embedding)
#                 if sim > best_sim and sim > sim_threshold:
#                     best_sim = sim
#                     identity = name

#             if identity != "Unknown":
#                 if identity not in marked_names:
#                     mark_attendance(identity)
#                     marked_names.add(identity)
#                     label = f"{identity} - Marked ✅"
#                     print(f"✅ {identity} marked for {subject_name}.")
#                 else:
#                     label = f"{identity} - Already Marked 🟡"
#             else:
#                 label = "Unknown ❌"

#             cv2.rectangle(frame, (x, y), (x + w, y + h),
#                           (0, 255, 0) if identity != "Unknown" else (0, 0, 255), 2)
#             cv2.putText(frame, label, (x, y - 10),
#                         cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

#         cv2.imshow(f"📸 Face Recognition - {subject_name}", frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             print("👋 Exiting...")
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# if __name__ == "__main__":
#     recognize_face()



import cv2
import numpy as np
from mtcnn import MTCNN
from deepface import DeepFace
import pickle
import csv
import os
import sys
import signal
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity

# Check if subject name is passed as an argument
if len(sys.argv) < 2:
    print("❌ Error: Subject name not provided!")
    sys.exit(1)

subject_name = sys.argv[1]
date_str = datetime.now().strftime("%Y-%m-%d")
attendance_file = f"attendance_{subject_name}_{date_str}.csv"

# Load stored face embeddings
with open("face_embeddings.pkl", "rb") as f:
    stored_embeddings = pickle.load(f)

# Ensure attendance file exists
if not os.path.exists(attendance_file):
    with open(attendance_file, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Subject", "Name", "Date", "Time", "Status"])

# Function to mark attendance
def mark_attendance(name):
    time_str = datetime.now().strftime("%H:%M:%S")

    with open(attendance_file, "a", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([subject_name, name, date_str, time_str, "Present"])

def cosine_sim(vec1, vec2):
    return cosine_similarity([vec1], [vec2])[0][0]

# Flag to control while loop
running = True

def stop_marking(signum, frame):
    """Handles termination signal and stops the camera"""
    global running
    print("🛑 Stopping attendance marking...")
    running = False

# Register signal handlers
signal.signal(signal.SIGTERM, stop_marking)
signal.signal(signal.SIGINT, stop_marking)

def recognize_face():
    global running
    detector = MTCNN()
    cap = cv2.VideoCapture(0)  # Open the webcam
    marked_names = set()

    if not cap.isOpened():
        print("❌ Error: Cannot access the camera.")
        return

    print(f"📷 Attendance started for {subject_name}. Press 'q' to stop.")

    while running:
        ret, frame = cap.read()
        if not ret:
            print("❌ Failed to grab frame.")
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        detections = detector.detect_faces(rgb_frame)

        for detection in detections:
            confidence = detection.get('confidence', 0)
            if confidence < 0.95:
                continue

            x, y, w, h = detection['box']
            x, y = max(0, x), max(0, y)

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
            sim_threshold = 0.6  

            for name, stored_embedding in stored_embeddings.items():
                sim = cosine_sim(embedding, stored_embedding)
                if sim > best_sim and sim > sim_threshold:
                    best_sim = sim
                    identity = name

            if identity != "Unknown":
                if identity not in marked_names:
                    mark_attendance(identity)
                    marked_names.add(identity)
                    label = f"{identity} - Marked ✅"
                    print(f"✅ {identity} marked for {subject_name}.")
                else:
                    label = f"{identity} - Already Marked 🟡"
            else:
                label = "Unknown ❌"

            cv2.rectangle(frame, (x, y), (x + w, y + h),
                          (0, 255, 0) if identity != "Unknown" else (0, 0, 255), 2)
            cv2.putText(frame, label, (x, y - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)

        cv2.imshow(f"📸 Face Recognition - {subject_name}", frame)

        if cv2.waitKey(1) & 0xFF == ord('q') or not running:
            print("👋 Exiting...")
            break

    cap.release()  # ✅ Release camera
    cv2.destroyAllWindows()  # ✅ Close OpenCV windows
    print("✅ Camera released successfully.")

if __name__ == "__main__":
    recognize_face()
