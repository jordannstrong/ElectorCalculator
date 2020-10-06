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
        baseURL + 'ar/arkansas_trump_vs_biden-7213.html',
        baseURL + 'ga/georgia_trump_vs_biden-6974.html',
        baseURL + 'nm/new_mexico_trump_vs_biden-6993.html',
        baseURL + 'mt/montana_trump_vs_biden-7196.html',
        baseURL + 'co/colorado_trump_vs_biden-6940.html',
        baseURL + 'ks/kansas_trump_vs_biden-7058.html',
        baseURL + 'ia/iowa_trump_vs_biden-6787.html',
        baseURL + 'ms/mississippi_trump_vs_biden-7052.html',
        baseURL + 'al/alabama_trump_vs_biden-7022.html',
        baseURL + 'ga/georgia_trump_vs_biden-6974.html',
        baseURL + 'sc/south_carolina_trump_vs_biden-6825.html',
        baseURL + 'me/maine_trump_vs_biden-6922.html',
        baseURL + 'ak/alaska_trump_vs_biden-7219.html',
        baseURL + 'mecd1/maine_cd1_trump_vs_biden-7214.html',
        baseURL + 'mecd2/maine_cd2_trump_vs_biden-7215.html',
        baseURL + 'nv/nevada_trump_vs_biden-6867.html',
        baseURL + 'la/louisiana_trump_vs_biden-7245.html',
        baseURL + 'de/delaware_trump_vs_biden-7028.html',
        baseURL + 'hi/hawaii_trump_vs_biden-7233.html',
        baseURL + 'or/oregon_trump_vs_biden-7261.html',
        baseURL + 'necd2/nebraska_cd2_trump_vs_biden-7279.html',
        baseURL + 'ok/oklahoma_trump_vs_biden-7259.html',
        baseURL + 'vt/vermont_trump_vs_biden-7276.html',

        ]

CORS(app)
@app.route("/", methods=["GET"])
def hello():
    return "Hello World"

class Polls(Resource):
    def get(self):
        pollData = []

        p = Pool(4)
        pollData = p.map(scrape, urls)
        p.terminate()
        p.join()

        return jsonify(pollData)

# Scrape data from given URL
def scrape(url):
    global pollData

    # Store the state abbreviation
    if url[58:60] == "cd": 
        state = url[56:61]
    else:
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
    app.run(host='0.0.0.0', port=80)