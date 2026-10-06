const HF_TOKEN = "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";

async function generateVideo() {
  const song = document.getElementById('songInput').value;
  const style = document.getElementById('styleSelect').value;
  const resultArea = document.getElementById('resultArea');

  if (!song) {
    alert('Please enter song idea first!');
    return;
  }

  resultArea.innerHTML = `<p>⏳ Mwala AI is creating real AI video for: "${song}"...<br>Wait 30-60 seconds (AI is thinking)...</p>`;

  // Use Free AI Model for Text-to-Image + Video Effect
  const prompt = `${song}, ${style} style, afro music video, high quality, cinematic lighting, malawian artist`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
      throw new Error("Model loading, retry in 20 sec...");
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    resultArea.innerHTML = `
      <p>✅ Mwala AI Generated!</p>
      <p style="font-size:13px;">Prompt: ${song} (${style})</p>
      <img src="${imageUrl}" style="width:100%; border-radius:12px; border:2px solid #ff3b30;">
      <p style="font-size:12px; color:#888; margin-top:10px;">This is AI-generated image. Next step we will convert it to moving video!</p>
      <a href="${imageUrl}" download="mwala-ai.png" style="display:block; margin-top:10px; background:#ff3b30; padding:10px; border-radius:8px; color:white; text-decoration:none;">Download Image</a>
      <button onclick="window.location.reload()" style="margin-top:10px;">Create Another</button>
    `;

  } catch (error) {
    resultArea.innerHTML = `
      <p style="color:orange;">⚠️ AI model is loading (first time takes 1 min). Please wait 20 seconds and click Generate again.</p>
      <p style="font-size:12px; color:#888;">Error: ${error.message}</p>
      <button onclick="generateVideo()">Retry Now</button>
    `;
  }
}
