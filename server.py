from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
import json
import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool

app = Flask(__name__)
api = Api(app)

pollData = []

CORS(app)

@app.route("/")
def hello():
    print("Hello World!")

class Polls(Resource):
    def get(self):
        global pollData
        file = open("urls.txt", "r")
        urls = []
        for line in file:
            urls.append(line.strip().split())
        file.close()

        pollData = []

        p = Pool(24)
        pollData = p.map(scrape, urls)
        p.terminate()
        p.join()
        print(pollData)
        return jsonify(pollData)

def scrape(url):
    global pollData
    state = url[0][56:58]
    page = requests.get(url[0])
    bs = BeautifulSoup(page.content, 'html.parser')
    pollTable = bs.find('td', class_='spread')
    spread = pollTable.getText()
    return [state, spread]
        
api.add_resource(Polls, '/polls')

if __name__ == '__main__':
    app.run(port=5002)