document.getElementById("fetchBtn").addEventListener("click", () => {
  const urlOrId = document.getElementById("videoUrl").value.trim();
  if (!urlOrId) {
    alert("YouTubeのURLか動画IDを入力してください");
    return;
  }

  const videoId = extractVideoID(urlOrId);
  if (!videoId) {
    alert("動画IDが取得できませんでした");
    return;
  }

  const apiUrl = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) throw new Error("APIエラー");
      return res.json();
    })
    .then((data) => {
      // 情報表示
      document.getElementById("info").innerHTML = `
        <h2>${data.title}</h2>
        <p>チャンネル: ${data.author_name}</p>
        <img src="${data.thumbnail_url}" alt="サムネイル" />
      `;
      // 埋め込みプレイヤー
      document.getElementById("player").innerHTML = `
        <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" allowfullscreen 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
      `;
    })
    .catch(() => {
      document.getElementById("info").textContent = "動画情報の取得に失敗しました。";
      document.getElementById("player").innerHTML = "";
    });
});

// URLまたはIDから動画IDを抽出する関数
function extractVideoID(input) {
  try {
    // URL形式
    if (input.includes("youtube.com")) {
      const url = new URL(input);
      return url.searchParams.get("v");
    }
    // 短縮URL形式
    if (input.includes("youtu.be")) {
      return input.split("/").pop();
    }
    // それ以外はIDとして返す（ざっくり）
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }
    return null;
  } catch {
    return null;
  }
}
