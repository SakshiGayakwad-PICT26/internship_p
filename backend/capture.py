import cv2
import os
import time
from mtcnn import MTCNN

# Initialize MTCNN detector
detector = MTCNN()

def capture_images(user_name, save_path="dataset", num_images=300):
    user_folder = os.path.join(save_path, user_name)
    os.makedirs(user_folder, exist_ok=True)
    
    cap = cv2.VideoCapture(0)
    count = 0
    
    while count < num_images:
        ret, frame = cap.read()
        if not ret:
            continue
        
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        detections = detector.detect_faces(rgb_frame)
        
        for detection in detections:
            x, y, w, h = detection['box']
            face = frame[y:y+h, x:x+w]
            
            if face.size > 0:
                file_path = os.path.join(user_folder, f"{count}.jpg")
                cv2.imwrite(file_path, face)
                count += 1
                print(f"Captured {count}/{num_images} images")
        
        cv2.imshow("Face Capture", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        
    cap.release()
    cv2.destroyAllWindows()
    print("Image capture completed!")

# Run script
if __name__ == "__main__":
    user_name = input("Enter User Name: ")
    capture_images(user_name)
