from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
import json
from rcp import get_polls, get_poll_data
from multiprocessing import Pool

app = Flask(__name__)
api = Api(app)

CORS(app)

polls = get_polls(url="https://www.realclearpolitics.com/epolls/latest_polls/state_president/")
pollData = []

@app.route("/")
def hello():
    print("Hello World!")

class Polls(Resource):
    def get(self):
        p = Pool(60)
        records = p.map(scrape, polls)
        p.terminate()
        p.join()
        return records

def scrape(poll):
    global pollData    
    if get_poll_data(poll['url'])[0] not in pollData:
        return get_poll_data(poll['url'])[0] 

api.add_resource(Polls, '/polls')

if __name__ == '__main__':
    app.run(port=5002)