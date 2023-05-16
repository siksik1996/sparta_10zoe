from flask import Flask, render_template, request, jsonify

from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient()
db = client.dbsparta


@app.route("/musics/", methods=["GET"])
def get_music_list():
    all_music = list(db.music.find({},{'_id':False}))
    return jsonify({'result': all_music})


if __name__ == '__main__':
    app.run('0.0.0.0', port=8080, debug=True)
