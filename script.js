async function generateVideo() {
  const song = document.getElementById('songInput').value;
  const style = document.getElementById('styleSelect').value;
  const resultArea = document.getElementById('resultArea');

  if (!song) {
    alert('Please enter song lyrics or idea first!');
    return;
  }

  resultArea.innerHTML = '<p>⏳ Generating video with Mwala AI... Please wait 20 seconds...</p>';

  // Demo preview - Replace this with your free HuggingFace API key for real AI video
  setTimeout(() => {
    resultArea.innerHTML = `
      <p>✅ Video ready for: "${song}"</p>
      <p>Style: ${style}</p>
      <img src="https://picsum.photos/seed/${Date.now()}/400/700" style="width:100%; border-radius:12px;">
      <p style="font-size:12px; color:#888; margin-top:10px;">This is a demo preview. Connect your HuggingFace API key in script.js to generate real AI video.</p>
      <button onclick="window.location.reload()">Create Another</button>
    `;
  }, 3000);
}