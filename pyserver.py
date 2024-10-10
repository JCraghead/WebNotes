#install flask and flask-cors before hand!!

from flask import Flask, request 
from flask_cors import CORS
import json  
   
# Setup flask server 
app = Flask(__name__)  
CORS(app)
  
# Setup url route which will calculate 
# total sum of array. 
@app.route('/sendNotes', methods = ['POST'])  
def receiveNotes():  
    data = request.get_json()  
    print(data) 

    response = json.dumps({"headers":{'Access-Control-Allow-Origin':'*'}})
    return response
   
if __name__ == "__main__":  
    app.run(port=5000)