import pickle
import pandas as pd

MODEL_PATH = "model/aags_price_model.pkl"


def load_model():
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    return model


def predict_price(crop, season, month, model):
    input_df = pd.DataFrame([{
        "crop": crop.lower().strip(),
        "season": season.lower().strip(),
        "month": month
    }])
    
    return float(model.predict(input_df)[0])