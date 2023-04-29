"""Module providing Flask server usage"""
from flask import Flask, jsonify
import requests

app = Flask(__name__)


@app.route("/get_weather", methods=["GET"])
def get_weather():
    """Get location and time span
    Return json object with weather data for this location and period
    """

    # I have yet to understand how we get the data so....
    # I'll test dates and location in this commit

    # location = request.args.get('location')
    # start_date = request.args.get('start_date')
    # end_date = request.args.get('end_date')

    start_date = "2023-04-29 15:00:00"  # test start date
    end_date = "2023-04-30 12:00:00"  # test end date
    test_loc = "Odessa"

    api_key = "cd9b969bbe27d1a7006d234402947f0a"  # API key from openweathermap.org
    base_url = "https://api.openweathermap.org/data/2.5/forecast?"
    complete_url = base_url + "q=" + test_loc + "&appid=" + api_key

    response = requests.get(complete_url, timeout=5)
    data = response.json()

    weather_data = []
    for forecast in data["list"]:
        if start_date <= forecast["dt_txt"] <= end_date:
            weather_data.append(forecast["weather"][0]["description"])
    return jsonify(weather_data)


@app.route("/")
def hello_world():
    """Return 'Hello World!'"""

    return "Hello World!"


if __name__ == "__main__":
    app.run(debug=True)
