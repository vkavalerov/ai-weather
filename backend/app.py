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
    weather_data = request.args.get("weather_data")

    if not weather_data:
        return "Parameter weather data is missing.", 400
    openai.api_key = OPENAI_API_KEY
    prompt = (
        f"Тебе будет дан прогноз погоды, и твоя задача написать небольшую реакцию на этот прогноз. Твоя реакция обязательно должна быть на русском языке!"
        f"Не расписывай на каждый день, просто 4-6 предложений как реакция на погоду."
        f"Прогноз погоды: {weather_data}."
    )
    openai_response = openai.ChatCompletion.create(
        messages=[
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
        model="gpt-3.5-turbo",
    )

    description = openai_response.choices[0].message.content

    return description, 200


@app.route("/")
def hello_world():
    """Test endpoint."""
    return "Hello World!", 200
