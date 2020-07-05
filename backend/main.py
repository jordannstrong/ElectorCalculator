from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
import json
import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
import csv
import os.path

app = Flask(__name__)
api = Api(app)

pollData = []

# Create list of URLs to scrape data from
baseURL = 'https://www.realclearpolitics.com/epolls/2020/president/'
urls = [baseURL + 'tx/texas_trump_vs_biden-6818.html',
        baseURL + 'in/indiana_trump_vs_biden-7189.html',
        baseURL + 'nh/new_hampshire_trump_vs_biden-6779.html',
        baseURL + 'ct/connecticut_trump_vs_biden-6999.html',
        baseURL + 'ma/massachusetts_trump_vs_biden-6876.html',
        baseURL + 'nj/new_jersey_trump_vs_biden-7193.html',
        baseURL + 'va/virginia_trump_vs_biden-6988.html',
        baseURL + 'wa/washington_trump_vs_biden-7060.html',
        baseURL + 'ky/kentucky_trump_vs_biden-6915.html',
        baseURL + 'mn/minnesota_trump_vs_biden-6966.html',
        baseURL + 'ut/utah_trump_vs_biden-7195.html',
        baseURL + 'md/maryland_trump_vs_biden-7209.html',
        baseURL + 'ny/new_york_trump_vs_biden-7040.html',
        baseURL + 'tn/tennessee_trump_vs_biden-7006.html',
        baseURL + 'ca/california_trump_vs_biden-6755.html',
        baseURL + 'oh/ohio_trump_vs_biden-6765.html',
        baseURL + 'nc/north_carolina_trump_vs_biden-6744.html',
        baseURL + 'az/arizona_trump_vs_biden-6807.html',
        baseURL + 'wi/wisconsin_trump_vs_biden-6849.html',
        baseURL + 'pa/pennsylvania_trump_vs_biden-6861.html',
        baseURL + 'fl/florida_trump_vs_biden-6841.html',
        baseURL + 'mi/michigan_trump_vs_biden-6761.html',
        baseURL + 'mo/missouri_trump_vs_biden-7210.html',
        baseURL + 'ar/arkansas_trump_vs_biden-7213.html',]

CORS(app)
@app.route("/", methods=["GET"])
def hello():
    return "Hello World"

class Polls(Resource):
    def get(self):
        pollData = []

        p = Pool(2)
        pollData = p.map(scrape, urls)
        p.terminate()
        p.join()

        return jsonify(pollData)

# Scrape data from given URL
def scrape(url):
    global pollData

    # Store the state abbreviation
    state = url[56:58]

    page = requests.get(url)
    bs = BeautifulSoup(page.content, 'html.parser')
    pollTable = bs.find('td', class_='spread')

    # Get the winner as well as the margin of victory
    spread = pollTable.getText()

    return [state, spread]

# Make Polls class available at /polls subdirectory
api.add_resource(Polls, '/polls')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)