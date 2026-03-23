from fastapi import APIRouter
from app.models.schema import PredictionRequest
from app.services.ml_service import load_model, predict_price
from app.services.logic_service import calculate_profit

router = APIRouter()

# Load model once
model = load_model()


@router.post("/predict")
def predict(data: PredictionRequest):
    result = calculate_profit(
        crop=data.crop,
        season=data.season,
        month=data.month,
        soil_type=data.soil_type,
        area=data.area,
        model=model
    )
    
    return result


@router.get("/dashboard")
def get_dashboard_data():
    return {
        "price_trend": [
            {"month": "Jan", "Tomato": 20, "Capsicum": 40, "Cucumber": 15, "Watermelon": 10, "Cabbage": 12},
            {"month": "Feb", "Tomato": 25, "Capsicum": 50, "Cucumber": 18, "Watermelon": 12, "Cabbage": 15},
            {"month": "Mar", "Tomato": 30, "Capsicum": 55, "Cucumber": 22, "Watermelon": 15, "Cabbage": 18},
            {"month": "Apr", "Tomato": 28, "Capsicum": 60, "Cucumber": 20, "Watermelon": 18, "Cabbage": 16},
            {"month": "May", "Tomato": 22, "Capsicum": 48, "Cucumber": 15, "Watermelon": 20, "Cabbage": 12},
        ],
        "seasonal_demand": [
            {"season": "Summer", "demand": 75},
            {"season": "Winter", "demand": 95},
            {"season": "Monsoon", "demand": 60},
        ],
        "crop_comparison": [
            {"name": "Tomato", "profit": 12400, "cost": 3200},
            {"name": "Capsicum", "profit": 18900, "cost": 4100},
            {"name": "Cucumber", "profit": 8200, "cost": 2800},
            {"name": "Watermelon", "profit": 9500, "cost": 3000},
            {"name": "Cabbage", "profit": 7800, "cost": 2500},
        ]
    }