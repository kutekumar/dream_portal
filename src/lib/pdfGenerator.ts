import type { Dream } from './supabase';

export async function generatePDF(dream: Dream): Promise<void> {
  const { interpretation, created_at, dream_text } = dream;

  if (!interpretation) return;

  const date = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Dream Journal - ${date}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', serif;
      line-height: 1.8;
      color: #2C3E50;
      padding: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 60px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .header {
      text-align: center;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 3px solid #667eea;
    }
    h1 {
      font-size: 42px;
      color: #667eea;
      margin-bottom: 10px;
      font-weight: 300;
      letter-spacing: 2px;
    }
    .date {
      font-size: 16px;
      color: #7F8C8D;
      font-style: italic;
    }
    .section {
      margin: 40px 0;
    }
    h2 {
      font-size: 24px;
      color: #764ba2;
      margin-bottom: 20px;
      border-left: 5px solid #667eea;
      padding-left: 15px;
    }
    .dream-text {
      background: #F8F9FA;
      padding: 30px;
      border-radius: 15px;
      font-size: 16px;
      line-height: 1.9;
      border-left: 5px solid #667eea;
      font-style: italic;
    }
    .summary {
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      padding: 25px;
      border-radius: 15px;
      font-size: 17px;
      line-height: 1.8;
      border: 2px solid #667eea30;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .card {
      background: #F8F9FA;
      padding: 20px;
      border-radius: 12px;
      border-left: 4px solid;
    }
    .card h3 {
      font-size: 18px;
      margin-bottom: 8px;
      color: #2C3E50;
    }
    .card p {
      font-size: 14px;
      color: #7F8C8D;
      line-height: 1.6;
    }
    .intensity-bar {
      height: 8px;
      background: #E0E0E0;
      border-radius: 10px;
      margin-top: 10px;
      overflow: hidden;
    }
    .intensity-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 10px;
    }
    .symbol-list {
      list-style: none;
      margin-top: 15px;
    }
    .symbol-item {
      padding: 15px;
      margin: 10px 0;
      background: white;
      border-radius: 10px;
      border-left: 4px solid;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .symbol-name {
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 5px;
    }
    .symbol-meaning {
      color: #7F8C8D;
      font-size: 14px;
    }
    .insights {
      list-style: none;
      counter-reset: insight-counter;
    }
    .insights li {
      counter-increment: insight-counter;
      padding: 20px;
      margin: 15px 0;
      background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%);
      border-radius: 12px;
      position: relative;
      padding-left: 60px;
    }
    .insights li:before {
      content: counter(insight-counter);
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
    }
    .lucid-score {
      text-align: center;
      padding: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      color: white;
      margin-top: 40px;
    }
    .lucid-score-value {
      font-size: 72px;
      font-weight: bold;
      margin: 20px 0;
    }
    .lucid-score-label {
      font-size: 20px;
      opacity: 0.9;
    }
    .footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 2px solid #E0E0E0;
      text-align: center;
      color: #7F8C8D;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Dream Journal</h1>
      <div class="date">${date}</div>
    </div>

    <div class="section">
      <h2>Your Dream</h2>
      <div class="dream-text">${escapeHtml(dream_text)}</div>
    </div>

    <div class="section">
      <h2>Interpretation Summary</h2>
      <div class="summary">${escapeHtml(interpretation.summary)}</div>
    </div>

    <div class="section">
      <h2>Themes Discovered</h2>
      <div class="grid">
        ${interpretation.themes.map(theme => `
          <div class="card" style="border-left-color: ${generateThemeColor(theme.name)}">
            <h3>${escapeHtml(theme.name)}</h3>
            <p>${escapeHtml(theme.description)}</p>
            <div class="intensity-bar">
              <div class="intensity-fill" style="width: ${theme.intensity}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <h2>Symbols & Meanings</h2>
      <ul class="symbol-list">
        ${interpretation.symbols.map(symbol => `
          <li class="symbol-item" style="border-left-color: ${symbol.color}">
            <div class="symbol-name">${escapeHtml(symbol.name)}</div>
            <div class="symbol-meaning">${escapeHtml(symbol.meaning)}</div>
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="section">
      <h2>Emotional Landscape</h2>
      <div class="grid">
        ${interpretation.emotions.map(emotion => `
          <div class="card" style="border-left-color: ${emotion.color}">
            <h3>${escapeHtml(emotion.name)}</h3>
            <div class="intensity-bar">
              <div class="intensity-fill" style="width: ${emotion.intensity}%; background: ${emotion.color}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <h2>Key Insights</h2>
      <ul class="insights">
        ${interpretation.insights.map(insight => `
          <li>${escapeHtml(insight)}</li>
        `).join('')}
      </ul>
    </div>

    <div class="lucid-score">
      <div class="lucid-score-label">Lucid Dream Potential</div>
      <div class="lucid-score-value">${interpretation.lucidDreamPotential}%</div>
    </div>

    <div class="footer">
      Generated by Dream Portal • Your gateway to understanding dreams
    </div>
  </div>
</body>
</html>
  `;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `dream-journal-${new Date(created_at).toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function generateThemeColor(themeName: string): string {
  const colors: Record<string, string> = {
    'adventure': '#FF6B6B',
    'fear': '#4A148C',
    'love': '#EC407A',
    'transformation': '#26A69A',
    'conflict': '#D32F2F',
    'journey': '#FFA726',
    'mystery': '#5E35B1',
    'growth': '#66BB6A',
    'loss': '#607D8B',
    'discovery': '#42A5F5',
  };

  const lowerTheme = themeName.toLowerCase();
  for (const [key, color] of Object.entries(colors)) {
    if (lowerTheme.includes(key)) return color;
  }

  return '#667eea';
}
