"""Module providing Flask server usage"""
import os
from flask import Flask, request
import requests
from dotenv import load_dotenv


#  import openai

app = Flask(__name__)
load_dotenv()

openweathermap_api_key = os.environ.get(
    "OPENWEATHERMAP_API_KEY"
)  # API key from openweathermap.org


@app.route("/get_weather", methods=["GET"])
def get_weather():
    """Get location and time span
    Return json object with weather data for this location and period
    """

    # I have yet to understand how we get the data so....
    # I'll test dates and location in this commit
    # start_date = "2023-05-01 12:00:00"  # test start date
    # end_date = "2023-05-04 06:00:00"  # test end date
    # location = "Odessa"

    location = request.args.get("location")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    base_url = "https://api.openweathermap.org/data/2.5/forecast"
    complete_url = (
        base_url + "?q=" + location + "&units=metric&appid=" + openweathermap_api_key
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
            weather_data.append(data)
    return weather_data, 200


@app.route("/")
def hello_world():
    """Return 'Hello World!'"""

    return "Hello World!", 200
