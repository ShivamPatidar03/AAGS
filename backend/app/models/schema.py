from pydantic import BaseModel

class PredictionRequest(BaseModel):
    crop: str
    season: str
    month: int
    soil_type: str
    area: float