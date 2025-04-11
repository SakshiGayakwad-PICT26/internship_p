from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import csv
from datetime import datetime
import signal

from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)

process = None
current_subject = None
attendance_file = ""

@app.route("/start-attendance", methods=["POST"])
def start_attendance():
    global process, current_subject, attendance_file
    data = request.json  
    current_subject = data.get("subject", "Unknown")

    attendance_file = f"attendance_{current_subject}_{datetime.now().strftime('%Y-%m-%d')}.csv"

    # Create attendance file if not exists
    if not os.path.exists(attendance_file):
        with open(attendance_file, "w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["Subject", "Name", "Date", "Time", "Status"])

    # Start the face recognition script
    if process is None:
        process = subprocess.Popen(["python", "mark.py", current_subject], shell=False)  # ⬅️ Use shell=False
        return jsonify({"status": f"Attendance started for {current_subject}"})
    else:
        return jsonify({"status": "Attendance already running."})

@app.route("/stop-attendance", methods=["POST"])
def stop_attendance():
    global process
    if process:
        os.kill(process.pid, signal.SIGTERM)  # ⬅️ Send termination signal
        process.wait()  # ⬅️ Wait for process to fully terminate
        process = None
        return jsonify({"status": "Attendance stopped."})
    return jsonify({"status": "No attendance process running."})

@app.route("/get-attendance", methods=["GET"])
def get_attendance():
    global attendance_file, current_subject
    data = []

    if os.path.exists(attendance_file):
        with open(attendance_file, "r") as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row.get("Subject") == current_subject:
                    data.append({
                        "name": row.get("Name", "Unknown"),
                        "time": row.get("Time", "Unknown")
                    })
    return jsonify(data)

# @app.route("/run-capture", methods=["POST"])
# def run_capture():
#     try:
#         subprocess.Popen(["python", "capture.py"], shell=False)  # ⬅️ Use shell=False
#         return jsonify({"status": "Capture script started."})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
@app.route("/run-capture", methods=["POST"])
def run_capture():
    try:
        data = request.get_json()
        user_name = data.get("name", "UnknownUser")
        subprocess.Popen(["python", "capture.py", user_name], shell=False)
        return jsonify({"status": f"Capture script started for {user_name}."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/run-train", methods=["POST"])
def run_train():
    try:
        subprocess.Popen(["python", "modified train.py"], shell=False)  # ⬅️ Use shell=False
        return jsonify({"status": "Training script started."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/upload-images", methods=["POST"])
def upload_images():
    try:
        name = request.form.get("name")
        files = request.files.getlist("images")

        if not name or not files:
            return jsonify({"error": "Missing name or images"}), 400

        save_path = os.path.join("dataset", secure_filename(name))
        os.makedirs(save_path, exist_ok=True)

        for file in files:
            filename = secure_filename(file.filename)
            file_path = os.path.join(save_path, filename)
            file.save(file_path)

        return jsonify({"status": f"{len(files)} images uploaded for {name}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
