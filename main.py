from flask import Flask, render_template, request, redirect, url_for
import yt_dlp, os

app = Flask(__name__)
DOWNLOAD_FOLDER = "downloads"
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        url = request.form["url"]
        ydl_opts = {
            "outtmpl": f"{DOWNLOAD_FOLDER}/%(title).mp4",
            "format": "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]",
            "merge_output_format": "mp4"
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url)
            filename = ydl.prepare_filename(info)
            video_name = os.path.basename(filename)
        return redirect(url_for("player", name=video_name))
    return render_template("index.html")

@app.route("/player/<name>")
def player(name):
    return render_template("player.html", filename=name)

@app.route("/downloads/<name>")
def download_file(name):
    return redirect(f"/downloads/{name}")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
