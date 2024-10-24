#install flask and flask-cors before hand!!

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import mysql.connector
import credentials

# Setup for SQL database
mydb = mysql.connector.connect(
  host=credentials.host,
  user=credentials.user,
  password=credentials.password,
  database=credentials.database
)

mycursor = mydb.cursor(buffered=True)
   
#setup flask app
app = Flask(__name__)  
CORS(app)
  
#setup server to recieve and respond to post requests
@app.route('/updateNote', methods = ['POST'])  
def updateNote():
    #parse and send update to note in SQL database
    data = request.get_json()  

    sql = "UPDATE Notes SET xPos = %s, yPos = %s, innerText = %s WHERE noteID = %s"
    val = (data["xPos"], data["yPos"], data["innerText"], data["id"])
      
    mycursor.execute(sql, val)
    mydb.commit()

    response = json.dumps({"headers":{'Access-Control-Allow-Origin':'*'},"body":"Sticky Updated"})

    return response

@app.route('/deleteNote', methods = ['POST'])  
def deleteNote():
    #parse and send deletion to note in SQL database
    data = request.get_json()

    sql = "DELETE FROM Notes WHERE noteID = %s"
    val = (data["id"],)
      
    mycursor.execute(sql, val)
    mydb.commit()

    response = json.dumps({"headers":{'Access-Control-Allow-Origin':'*'},"body":"Sticky Deleted"})

    return response

@app.route('/getNotes', methods = ['POST'])
def sendNotes():
    #Request notes from SQL database and send response
    data = request.get_json()

    sql = "SELECT* FROM Notes WHERE url = %s"
    val = (data["url"],)

    mycursor.execute(sql, val)

    response = mycursor.fetchall()

    return jsonify(response)

@app.route('/newNote', methods = ['POST'])
def recieveNewNote():
    #Add new note to SQL database and send it back via response
    data = request.get_json()
    print(data)

    sql = "INSERT INTO Notes (userID, xPos, yPos, innerText, color, url) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (data["user"], 300, 300 + data["scrollHeight"], "", "rgb(255,255,0,0.8)", data["url"])

    mycursor.execute(sql, val)
    mydb.commit()

    sql = "SELECT * FROM Notes ORDER BY noteID DESC"

    mycursor.execute(sql)

    response = mycursor.fetchone()

    return jsonify(response)

if __name__ == "__main__":  
    app.run(port=5000)