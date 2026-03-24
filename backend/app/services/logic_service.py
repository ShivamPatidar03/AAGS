import pickle
from pathlib import Path
from app.services.ml_service import predict_price

# Base directory (backend/)
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load lookup tables
with open(BASE_DIR / "model" / "yield_table.pkl", "rb") as f:
    yield_table = pickle.load(f)

with open(BASE_DIR / "model" / "soil_factor.pkl", "rb") as f:
    soil_factor = pickle.load(f)

with open(BASE_DIR / "model" / "season_factor.pkl", "rb") as f:
    season_factor = pickle.load(f)

with open(BASE_DIR / "model" / "input_cost.pkl", "rb") as f:
    input_cost = pickle.load(f)


def get_value(df, col, key, value_col):
    row = df[df[col].str.lower().str.strip() == key]
    if row.empty:
        raise ValueError(f"{key} not found")
    return float(row[value_col].values[0])


def calculate_profit(crop, season, month, soil_type, area, model):
    crop = crop.lower().strip()
    season = season.lower().strip()
    soil_type = soil_type.lower().strip()
    
    predicted_price = predict_price(crop, season, month, model)
    
    base_yield = get_value(yield_table, "crop", crop, "base_yield_per_sqm")
    soil_factor_val = get_value(soil_factor, "soil_type", soil_type, "yield_factor")
    season_factor_val = get_value(season_factor, "season", season, "factor")
    cost_per_sqm = get_value(input_cost, "crop", crop, "cost_per_sqm")
    
    total_yield = base_yield * soil_factor_val * season_factor_val * area
    cost = cost_per_sqm * area
    revenue = predicted_price * total_yield
    profit = revenue - cost
    
    status = "Profitable" if profit > 0 else "Loss Risk"
    
    return {
        "predicted_price": round(predicted_price, 2),
        "yield": round(total_yield, 2),
        "cost": round(cost, 2),
        "revenue": round(revenue, 2),
        "profit": round(profit, 2),
        "status": status
    }