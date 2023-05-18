import requests

from bs4 import BeautifulSoup
from pymongo import MongoClient

from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

client = MongoClient('mongodb://root:root@db/?retryWrites=true&w=majority')
db = client.dbsparta

def crawl_musics():
    headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get('https://www.genie.co.kr/chart/top200', headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    trs = soup.select('#body-content > div.newest-list > div > table > tbody > tr')

    for tr in trs:
        title = tr.select_one('td.info > a.title.ellipsis').text.strip()
        rank = tr.select_one('td.number').text[0:2].strip()
        artist = tr.select_one('td.info > a.artist.ellipsis').text
        doc = {
            'title':title,
            'rank':rank,
            'artist':artist
        }
        db.music.insert_one(doc)


@app.route("/musics/", methods=["GET"])
def get_music_list():
    crawl_musics()
    all_music = list(db.music.find({},{'_id':False}))[:5]
    return jsonify(all_music)


if __name__ == '__main__':
    app.run('0.0.0.0', port=8080, debug=True)
