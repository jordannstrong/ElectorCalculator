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

scheduler = BackgroundScheduler()
if not scheduler.running:
    scheduler.start()

# Shut down the scheduler when exiting the app
atexit.register(lambda: scheduler.shutdown())

#with open('result.csv', 'w') as fp: 
#    pass

#for line in open("result.csv"):
#    pollData.append(line.strip().split(','))

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
        global pollData
        return jsonify(pollData)

def getPollData():
    global pollData
    p = Pool(2)
    tempData = p.map(scrape, urls)
    p.terminate()
    p.join()
    #with open('result.csv', 'w', newline='\n', encoding="utf-8") as result_file:
    #    writer = csv.writer(result_file)
    #    writer.writerows(tempData)
    pollData = tempData

def scrape(url):
    global pollData
    state = url[56:58]
    page = requests.get(url)
    bs = BeautifulSoup(page.content, 'html.parser')
    pollTable = bs.find('td', class_='spread')
    spread = pollTable.getText()
    return [state, spread]
        
api.add_resource(Polls, '/polls')


scheduler.add_job(getPollData, 'interval', hours=1)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)