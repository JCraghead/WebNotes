#install flask and flask-cors before hand!!

from flask import Flask, request 
from flask_cors import CORS
import json  
   
#setup flask app
app = Flask(__name__)  
CORS(app)
  
#setup server to recieve and respond to post requests
@app.route('/sendNotes', methods = ['POST'])  
def receiveNotes():
    #parse and print data
    data = request.get_json()  
    print(data) 

    #send response
    response = json.dumps({"headers":{'Access-Control-Allow-Origin':'*'},"body":"Stickies recieved"})
    return response
   
if __name__ == "__main__":  
    app.run(port=5000)