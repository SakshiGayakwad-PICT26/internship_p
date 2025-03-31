
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os
import csv
from datetime import datetime
import signal

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

@app.route("/run-capture", methods=["POST"])
def run_capture():
    try:
        subprocess.Popen(["python", "capture.py"], shell=False)  # ⬅️ Use shell=False
        return jsonify({"status": "Capture script started."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/run-train", methods=["POST"])
def run_train():
    try:
        subprocess.Popen(["python", "modified train.py"], shell=False)  # ⬅️ Use shell=False
        return jsonify({"status": "Training script started."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
