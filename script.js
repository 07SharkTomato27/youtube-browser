function extractVideoID(url) {
  try {
    let id = '';
    if (url.includes("youtube.com")) {
      const u = new URL(url);
      id = u.searchParams.get("v");
    } else if (url.includes("youtu.be")) {
      id = url.split("/").pop();
    } else {
      id = url; // 動画IDだけ入力された場合
    }
    return id;
  } catch {
    return null;
  }
}

function loadVideo() {
  const input = document.getElementById("urlInput").value.trim();
  const id = extractVideoID(input);
  if (id) {
    const embedUrl = `https://www.youtube.com/embed/${id}`;
    document.getElementById("ytFrame").src = embedUrl;
  } else {
    alert("正しいYouTubeのURLまたは動画IDを入力してください！");
  }
}
