"""Module providing Flask server usage""" 
from flask import Flask 
 
app = Flask(__name__) 
 
 
@app.route("/") 
def hello_world(): 
    """returns 'Hello World!'""" 
 
    return "Hello World!" 
 
 
if name == "__main__": 
    app.run()