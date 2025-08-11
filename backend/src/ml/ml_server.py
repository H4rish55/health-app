from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd 
import joblib

app = Flask(__name__)
CORS(app)

stroke_model = joblib.load('strokeModel.pkl')
diabetes_model = joblib.load('diabetesModel.pkl')

threshold = 0.22

@app.route('/predict/stroke', methods=['POST'])
def predict_stroke():
    try:
        data = request.get_json()
        features = data["features"]
        
        df = pd.DataFrame([features])

        prob = stroke_model.predict_proba(df)[:, 1][0]
        prediction = int(prob > threshold)

        return jsonify({
            "prediction": prediction,
            "probability": round(float(prob), 3)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
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
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)



