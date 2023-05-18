from flask import Flask, jsonify
from flask_cors import CORS

from pymongo import MongoClient


app = Flask(__name__)

CORS(app, resources={r'/*': {'origins': '*'}})

client = MongoClient('mongodb://root:root@db/?retryWrites=true&w=majority')
db = client.dbsparta


@app.route("/musics/", methods=["GET"])
def get_music_list():
    all_music = list(db.music.find({},{'_id':False}))[:5]
    return jsonify(all_music)


if __name__ == '__main__':
    app.run('0.0.0.0', port=8080, debug=True)
