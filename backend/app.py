"""
These modules define a Flask app that provides weather data
and descriptions for a given location and time period.
"""
import os
from datetime import datetime, timedelta
from flask import Flask, request
import requests
from dotenv import load_dotenv


app = Flask(__name__)
load_dotenv()

OPENWEATHERMAP_API_KEY = os.environ.get("OPENWEATHERMAP_API_KEY")
OPENWEATHERMAP_API_URL = os.environ.get("OPENWEATHERMAP_API_URL")


@app.route("/get_weather", methods=["GET"])
def get_weather():
    """
    This endpoint retrieves weather data for a given location and time period.

    Returns:
        A JSON object containing an array of weather descriptions for the given days.
    """

    location = request.args.get("location")
    days = request.args.get("days")

    if not location:
        return "Parameter location is missing.", 400
    if not days:
        return "Parameter days is missing.", 400
    try:
        days = int(days)
    except ValueError:
        return "Parameter days is invalid.", 400
    start_date = datetime.now()
    end_date = (start_date + timedelta(days=days + 1)).replace(
        hour=3, minute=0, second=0
    )

    complete_url = (
        OPENWEATHERMAP_API_URL
        + "?q="
        + location
        + "&units=metric&appid="
        + OPENWEATHERMAP_API_KEY
    )

    response = requests.get(complete_url, timeout=5)
    data = response.json()

    weather_data = []
    for forecast in data["list"]:
        if start_date <= datetime.fromtimestamp(forecast["dt"]) <= end_date:
            weather_data.append(forecast)
    return weather_data, 200


@app.route("/")
def hello_world():
    """Test endpoint."""
    return "Hello World!", 200
