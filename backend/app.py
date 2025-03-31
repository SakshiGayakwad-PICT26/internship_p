from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import os
import signal
import csv
from datetime import datetime

app = Flask(__name__)
CORS(app)

process = None
attendance_file = f"attendance_{datetime.now().strftime('%Y-%m-%d')}.csv"

# ----------- Attendance Routes -----------

@app.route("/start-attendance", methods=["POST"])
def start_attendance():
    global process
    if process is None:
        process = subprocess.Popen(["python", "modified mark.py"])
        return jsonify({"status": "Attendance marking started."})
    else:
        return jsonify({"status": "Attendance is already running."})

@app.route("/stop-attendance", methods=["POST"])
def stop_attendance():
    global process
    if process:
        process.terminate()
        process = None
        return jsonify({"status": "Attendance marking stopped."})
    return jsonify({"status": "No attendance process running."})

@app.route("/get-attendance", methods=["GET"])
def get_attendance():
    data = []
    if os.path.exists(attendance_file):
        with open(attendance_file, "r") as file:
            reader = csv.DictReader(file)
            for row in reader:
                data.append({
                    "name": row["Name"],
                    "time": row["Time"]
                })
    return jsonify(data)

# ----------- Admin Actions: Capture and Train -----------

@app.route("/run-capture", methods=["POST"])
def run_capture():
    try:
        subprocess.Popen(["python", "capture.py"])
        return jsonify({"status": "Capture script started."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/run-train", methods=["POST"])
def run_train():
    try:
        subprocess.Popen(["python", "modified train.py"])
        return jsonify({"status": "Training script started."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
