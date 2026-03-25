# 🌱 AAGS — Agentic AgroAutonomous Greenhouse System

AAGS (Agentic AgroAutonomous Greenhouse System) is an AI-powered agricultural project designed to help farmers and greenhouse operators predict crop profitability using machine learning and agronomy-based calculations.

The system combines:
- **Frontend UI** for farmer input and dashboard visualization
- **FastAPI backend** for prediction and business logic
- **Machine Learning model** for mandi price prediction
- **Profit analysis engine** for yield, revenue, cost, and profit estimation

---

##  Project Objective

The main goal of AAGS is to support smart agricultural decision-making by predicting whether a crop will be profitable under given conditions.

The system takes user inputs such as:
- Crop name
- Season
- Soil type
- Area
- Month

And predicts:
- Mandi Price (₹/kg)
- Expected Yield
- Estimated Cost
- Revenue
- Profit
- Profitability Status

---

## Features

- AI-based crop price prediction using Machine Learning
- Profitability forecasting for greenhouse farming
- Yield calculation using agronomy factors
- Cost and revenue estimation
- Profit/Loss status detection
- Interactive frontend dashboard
- Real-time backend API integration
- Data visualization for market trends and comparisons

---

## Tech Stack

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion

### Backend
- FastAPI
- Python
- Uvicorn

### Machine Learning
- Scikit-learn
- Random Forest Regressor
- XGBoost Regressor
- Linear Regression
- Pandas
- NumPy

---

## Dataset Used

The project uses multiple agricultural datasets:

- `crop_info` → crop, duration_days
- `input_cost` → crop, cost_per_sqm
- `season_factor` → season, factor
- `soil_factor` → soil_type, yield_factor
- `yield_table` → crop, base_yield_per_sqm
- `mandi_prices` → date, crop, price

---

## Machine Learning Pipeline

The mandi price prediction model was built using:
- Linear Regression (baseline)
- Random Forest Regressor
- XGBoost Regressor

### Final Model Selection
The best model was selected based on:
- MAE
- RMSE
- R² Score

Random Forest was chosen as the main model after tuning and evaluation.

---

## Folder structure

AAGS-Project/
│
├── frontend/              # React frontend
├── backend/               # FastAPI backend
│   ├── app/
│   ├── model/
│   └── requirements.txt
│
├── datasets/              # CSV files used for model training
└── README.md

---

## Output

The system provides:

Crop profitability dashboard
Price prediction
Yield and cost analysis
Market trend charts
Soil impact and crop comparison insights

---

## Future Scope

Add more crops and regions
Integrate real-time mandi APIs
Add farmer recommendation system
Add multilingual voice assistant
Add greenhouse automation integration
Mobile app version for farmers

--

## Developer

Shivam Patidar

Computer Science Student
Aspiring Agentic AI Developer
Building AI solutions for agriculture

-Skills

Machine Learning
Python & FastAPI
React & Full Stack Development
Data Science

-Vision

To build AI-powered agricultural systems that can be used by farmers globally and contribute to smart farming and sustainability.
