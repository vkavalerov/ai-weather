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
        A JSON object containing an array of weather descriptions for the given time period.
    """
    location = request.args.get("location")
    now = datetime.now()
    start_date = now.strftime("%Y-%m-%d %H:%M:%S")
    days = request.args.get("days")

    if not location:
        return {"Parameter location is missing."}, 400
    if not days:
        return {"Parameter days is missing."}, 400
    end_date = datetime.strftime(now + timedelta(days=int(days)), "%Y-%m-%d %H:%M:%S")
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
        if start_date <= forecast["dt_txt"] <= end_date:
            # weather is an object that has multiple features such as:
            # city, temperature, pressure, etc
            # weather = {
            #     "city": location,
            #     "temperature": forecast["main"]["temp"],
            #     "temp_min": forecast["main"]["temp_min"],
            #     "temp_max": forecast["main"]["temp_max"],
            #     "pressure": forecast["main"]["pressure"],
            #     "humidity": forecast["main"]["humidity"],
            #     "description": forecast["weather"][0]["description"],
            #     "icon": forecast["weather"][0]["icon"],
            # }
            weather_data.append(forecast)
    return weather_data, 200


@app.route("/")
def hello_world():
    """Test endpoint."""
    return "Hello World!", 200
