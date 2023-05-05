import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

API_URL = os.environ.get("API_URL")


def main():
    print("Welcome to our weather app!")
    print("Please enter your location name: ")
    location = input()
    print("Please enter your number of days you wont to see weather(1-14): ")
    days = input()
    print("Making request to API(get_weather)...")
    resp0 = requests.get(f"{API_URL}/get_weather?location={location}&days={days}")
    if resp0.status_code == 200:
        print("Success!")
        print("Got this response from API:")
        print(resp0.text)
        print("Making request to API(describe_weather)...")
        print("how many times to discribe?: ")
        times = input()
        for i in range(int(times)):
            resp1 = requests.get(
                f"{API_URL}/describe_weather?weather_data={resp0.text}"
            )
            if resp1.status_code == 200:
                print("Success!")
                print("Got this response from API:")
                print(resp1.text)
            else:
                print("Error!")
                print(resp1.text)
    else:
        print("Error!")
        print(resp0.text)


if __name__ == "__main__":
    main()
