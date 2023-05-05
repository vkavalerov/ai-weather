"""
These modules define a Flask app that provides weather data
and descriptions for a given location and time period.
"""
import os
from datetime import datetime, timedelta
from flask import Flask, request
import requests
from dotenv import load_dotenv
import openai

app = Flask(__name__)
load_dotenv()

OPENWEATHERMAP_API_KEY = os.environ.get("OPENWEATHERMAP_API_KEY")
OPENWEATHERMAP_API_URL = os.environ.get("OPENWEATHERMAP_API_URL")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")


@app.route("/get_weather", methods=["GET"])
def get_weather():
    """
    This endpoint retrieves weather data for a given location and time period.

    Returns:
        A JSON object containing an array of weather descriptions for the given days.
    """

    location = request.args.get("location")
    days_str = request.args.get("days")

    if not location:
        return "Parameter location is missing.", 400
    if not days_str:
        return "Parameter days is missing.", 400
    try:
        days = int(days_str)
        if days <= 0 or days >= 15:
            return "Parameter days can only take values between 1 and 14.", 400
    except ValueError:
        return "Parameter days must be an integer.", 400
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
    if response.status_code != 200:
        return "Got an error from OpenWeatherMap API: " + response.text, 502
    data = response.json()

    weather_data = []
    for forecast in data["list"]:
        if start_date <= datetime.fromtimestamp(forecast["dt"]) <= end_date:
            weather_data.append(forecast)
    return weather_data, 200


@app.route("/describe_weather", methods=["GET"])
def describe_weather():
    """
    This endpoint generates a description of the weather
    for a given location and time period.

    Returns:
        A JSON object containing the ai-generated description.
    """
    location = request.args.get("location")
    days_str = request.args.get("days")

    if not location:
        return "Parameter location is missing.", 400
    if not days_str:
        return "Parameter days is missing.", 400
    try:
        days = int(days_str)
        if days <= 0 or days >= 15:
            return "Parameter days can only take values between 1 and 14.", 400
    except ValueError:
        return "Parameter days must be an integer.", 400
    start_date = datetime.now()
    end_date = (start_date + timedelta(days=days + 1)).replace(
        hour=3, minute=0, second=0
    )

    get_weather_response = requests.get(
        f"http://localhost:5000/get_weather?location={location}&days={days}", timeout=5
    )
    # if get_weather_response.status_code() != 200: whatever
    weather_data = get_weather_response.json()

    if not weather_data:
        return "Parameter weather data is missing.", 400
    openai.api_key = OPENAI_API_KEY
    prompt = (
        f"Describe the weather in {location} from {start_date} to {end_date}. "
        f"The weather data is as follows: {weather_data}."
    )
    openai_response = openai.Completion.create(
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.7,
        model="text-davinci-002",
    )
    # if openai_response.status_code() != 200: whatever
    description = openai_response.choices[0].text

    return description, 200


@app.route("/")
def hello_world():
    """Test endpoint."""
    return "Hello World!", 200
