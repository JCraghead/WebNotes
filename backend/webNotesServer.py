#install flask and flask-cors before hand!!

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import mysql.connector
from mysql.connector import Error
import credentials
import time

#define Database class for sql connection
class Database:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.connection = self.create_connection()
        

    def create_connection(self):
        while True:
            try:
                connection = mysql.connector.connect(
                    host=self.host,
                    user=self.user,
                    password=self.password,
                    database=self.database,
                    autocommit=True
                )
                print("Connection to MySQL DB successful")
                return connection
            except Error as e:
                print(f"The error '{e}' occurred. Retrying in 5 seconds...")
                time.sleep(5)

    def check_connection(self):
        if not self.connection.is_connected():
            print("Connection lost, attempting to reconnect...")
            self.connection = self.create_connection()

    def execute_query(self, query, params=None, returns=None):
        self.check_connection()
        cursor = self.connection.cursor(buffered=True)
        try:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)

            
            self.connection.commit()

            if returns:
                if returns == "fetchone":
                    response = cursor.fetchone()
                    cursor.close()
                    return response
                if returns == "fetchall":
                    response = cursor.fetchall()
                    cursor.close()
                    return response

        except Error as e:
            print(f"The error '{e}' occurred during query execution.")
            self.check_connection()  # Check connection again if there's an error
            cursor.close()  # Close the cursor
            raise e  # Optionally re-raise the exception

        cursor.close()


    def close(self):
        if self.connection.is_connected():
            self.connection.close()
            print("Connection closed.")

# create instance of database with given credenitals
mydb = Database(
    credentials.host,
    credentials.user,
    credentials.password,
    credentials.database
)

   
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
      
    mydb.execute_query(sql, val)

    response = json.dumps({"headers":{'Access-Control-Allow-Origin':'*'},"body":"Sticky Updated"})

    return response

@app.route('/deleteNote', methods = ['POST'])  
def deleteNote():
    #parse and send deletion to note in SQL database
    data = request.get_json()

    sql = "DELETE FROM Notes WHERE noteID = %s"
    val = (data["id"],)
      
    mydb.execute_query(sql, val)

    response = json.dumps({"headers":{'Access-Control-Allow-Origin':'*'},"body":"Sticky Deleted"})

    return response

@app.route('/getNotes', methods = ['POST'])
def sendNotes():
    #Request notes from SQL database and send response
    data = request.get_json()

    sql = "SELECT* FROM Notes WHERE url = %s"
    val = (data["url"],)

    response = mydb.execute_query(sql, val, "fetchall")


    return jsonify(response)

@app.route('/newNote', methods = ['POST'])
def recieveNewNote():
    #Add new note to SQL database and send it back via response
    data = request.get_json()
    print(data)

    sql = "INSERT INTO Notes (userID, xPos, yPos, innerText, color, url) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (data["user"], 300, 300 + data["scrollHeight"], "", "rgb(255,255,0,0.8)", data["url"])

    mydb.execute_query(sql, val)

    sql = "SELECT * FROM Notes ORDER BY noteID DESC"

    response = mydb.execute_query(sql, None, "fetchone")

    return jsonify(response)

if __name__ == "__main__":  
    app.run(port=5000)
