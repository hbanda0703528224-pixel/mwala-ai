async function generateVideo() {
  const song = document.getElementById('songInput').value;
  const style = document.getElementById('styleSelect').value;
  const tokenInput = document.getElementById('hfToken').value.trim();
  const resultArea = document.getElementById('resultArea');

  if (!song) {
    alert('Please enter song idea!');
    return;
  }
  if (!tokenInput || !tokenInput.startsWith('hf_')) {
    alert('Please paste your NEW HuggingFace token! Get it from hf.co/settings/tokens');
    return;
  }

  // Save token locally so user doesn't type every time
  localStorage.setItem('hf_token', tokenInput);
  const HF_TOKEN = tokenInput;

  resultArea.innerHTML = `<p>⏳ Mwala AI is creating for: "${song}"...<br>Wait 40 seconds...</p>`;

  const prompt = `${song}, ${style} style, afro music video, cinematic, Malawian`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
      method: "POST",
      headers: { "Authorization": `Bearer ${HF_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err.substring(0,200));
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    resultArea.innerHTML = `
      <p>✅ Generated!</p>
      <img src="${imageUrl}" style="width:100%; border-radius:12px; border:2px solid #ff3b30;">
      <a href="${imageUrl}" download="mwala-ai.png" style="display:block; margin-top:10px; background:#ff3b30; padding:10px; border-radius:8px; color:white; text-decoration:none; text-align:center;">Download</a>
    `;
  } catch (e) {
    resultArea.innerHTML = `<p style="color:orange;">⚠️ Model is loading or token error. Wait 30s and retry.<br><small>${e.message}</small></p><button onclick="generateVideo()">Retry</button>`;
  }
}

// Auto-fill token if saved before
window.onload = () => {
  const saved = localStorage.getItem('hf_token');
  if(saved) document.getElementById('hfToken').value = saved;
}
