from flask import Flask, render_template, request, jsonify

from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient()
db = client.dbsparta


@app.route("/musics/", methods=["GET"])
def get_music_list():
    all_music = list(db.music.find({},{'_id':False}))
    return jsonify({'result': all_music})

@app.route("/comments", methods=["POST"])
def comments_post():
    name_receive = request.form['name_give']
    emoji_receive = request.form['emoji_give']
    comment_receive = request.form['comment_give']

    doc = {
        'name': name_receive,
        'emoji': emoji_receive,
        'comment': comment_receive
    }

    db.comments.insert_one(doc)

    return jsonify({'msg':'고맙습니다:)'})

@app.route("/comments", methods=["GET"])
def comments_get():
    comments_data = list(db.comments.find({},{'_id':False}))
    return jsonify({'result':comments_data})

if __name__ == '__main__':
    app.run('0.0.0.0', port=8080, debug=True)