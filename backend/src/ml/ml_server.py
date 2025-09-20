from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd 
import joblib
import os
import traceback
import sys
from datetime import datetime

# Force stdout to flush immediately
sys.stdout.reconfigure(line_buffering=True)

# Create a debug log function that writes to both console and file
def debug_log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_message = f"[{timestamp}] {message}"
    print(log_message)
    sys.stdout.flush()  # Force immediate output
    
    # Also write to a file
    with open("ml_debug.log", "a") as f:
        f.write(log_message + "\n")
        f.flush()

import sklearn, numpy, scipy, pandas as _pd, joblib as _joblib
debug_log("[VERSIONS] " + str({
    "python": os.popen("python -V").read().strip(),
    "sklearn": sklearn.__version__,
    "numpy": numpy.__version__,
    "scipy": scipy.__version__,
    "pandas": _pd.__version__,
    "joblib": _joblib.__version__,
}))

app = Flask(__name__)
CORS(app)

# Add logging configuration
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

try:
    stroke_model = joblib.load('strokeModel.pkl')
    diabetes_model = joblib.load('diabetesModel.pkl')
    heart_model = joblib.load('heartModel.pkl')
    debug_log("[LOAD] models loaded successfully")
    logger.info("Models loaded successfully")
except Exception as e:
    debug_log(f"[LOAD ERROR] {str(e)}")
    logger.error(f"Model loading error: {str(e)}")
    raise

threshold = 0.22

@app.before_request
def log_request_info():
    debug_log(f"[REQUEST] {request.method} {request.url}")
    debug_log(f"[REQUEST] Headers: {dict(request.headers)}")
    if request.get_json(silent=True):
        debug_log(f"[REQUEST] Body: {request.get_json()}")

@app.get("/healthz")
def healthz():
    debug_log("[HEALTHZ] Health check called")
    return {
        "status": "healthy",
        "sklearn": sklearn.__version__,
        "numpy": numpy.__version__,
        "scipy": scipy.__version__,
        "pandas": _pd.__version__,
        "joblib": _joblib.__version__,
    }

@app.route('/predict/stroke', methods=['POST'])
def predict_stroke():
    debug_log("="*50)
    debug_log("[STROKE] Endpoint hit!")
    debug_log(f"[STROKE] Request method: {request.method}")
    debug_log(f"[STROKE] Request URL: {request.url}")
    debug_log(f"[STROKE] Content-Type: {request.content_type}")
    
    try:
        # Get raw data first
        raw_data = request.get_data()
        debug_log(f"[STROKE] Raw data length: {len(raw_data)}")
        debug_log(f"[STROKE] Raw data (first 200 chars): {raw_data[:200]}")
        
        # Try to parse JSON
        data = request.get_json(force=True)
        debug_log(f"[STROKE] Parsed JSON: {data}")
        
        if not data:
            debug_log("[STROKE] No data received")
            return jsonify({"error": "No data received"}), 400
            
        features = data.get("features", data)
        debug_log(f"[STROKE] Features: {features}")
        
        # Check if we have required features
        required_features = ['gender', 'age', 'hypertension', 'heart_disease', 
                           'ever_married', 'work_type', 'avg_glucose_level', 'bmi', 'smoking_status']
        
        missing = [f for f in required_features if f not in features]
        if missing:
            debug_log(f"[STROKE] Missing features: {missing}")
            return jsonify({"error": f"Missing features: {missing}"}), 400
        
        # Handle the residence_type vs Residence_type issue
        if 'residence_type' in features:
            features['Residence_type'] = features.pop('residence_type')
            debug_log("[STROKE] Fixed residence_type -> Residence_type")
        
        debug_log(f"[STROKE] Final features for model: {features}")
        
        # Create DataFrame
        df = pd.DataFrame([features])
        debug_log(f"[STROKE] DataFrame created: shape={df.shape}, columns={list(df.columns)}")
        debug_log(f"[STROKE] DataFrame content:\n{df}")
        
        # Check model
        debug_log(f"[STROKE] Model type: {type(stroke_model)}")
        debug_log(f"[STROKE] Model class: {stroke_model.__class__.__name__}")
        
        # Try prediction
        debug_log("[STROKE] Attempting prediction...")
        prob = stroke_model.predict_proba(df)[:, 1][0]
        debug_log(f"[STROKE] Raw probability: {prob}")
        
        prediction = int(prob > threshold)
        debug_log(f"[STROKE] Final prediction: {prediction} (threshold: {threshold})")
        
        result = {"prediction": prediction, "probability": round(float(prob), 3)}
        debug_log(f"[STROKE] Returning result: {result}")
        
        return jsonify(result)
        
    except Exception as e:
        error_msg = f"{type(e).__name__}: {str(e)}"
        traceback_str = traceback.format_exc()
        debug_log(f"[STROKE ERROR] {error_msg}")
        debug_log(f"[STROKE TRACEBACK] {traceback_str}")
        
        return jsonify({
            "error": error_msg,
            "traceback": traceback_str
        }), 500
    
@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    debug_log("[DIABETES] Endpoint hit!")
    try:
        data = request.get_json()
        features = data["features"]
        
        df = pd.DataFrame([features])

        prob = diabetes_model.predict_proba(df)[:, 1][0]
        prediction = int(diabetes_model.predict(df)[0])

        return jsonify({
            "prediction": prediction,
            "probability": round(float(prob), 3)
        })
    
    except Exception as e:
        debug_log(f"[DIABETES ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/predict/heart', methods=['POST'])
def predict_heart():
    debug_log("[HEART] Endpoint hit!")
    try:
        data = request.get_json()
        features = data["features"]

        df = pd.DataFrame([features])

        prob = heart_model.predict_proba(df)[:, 1][0]
        prediction = int(heart_model.predict(df)[0])

        return jsonify({
            "prediction": prediction,
            "probability": round(float(prob), 3)
        })
    
    except Exception as e:
        debug_log(f"[HEART ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500

# Add a catch-all route to see what requests are coming in
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    debug_log(f"[CATCH-ALL] Request to /{path}")
    return jsonify({"message": f"No handler for /{path}"}), 404

if __name__ == '__main__':
    port = 5000 
    debug_log(f"[STARTUP] Starting server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)