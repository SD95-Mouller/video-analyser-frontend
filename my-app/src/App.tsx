import './App.css';
import {useState} from 'react';

export default function App() {
  const [summary, setSummary] = useState('这里将显示视频内容总结');
  const [apiKey, setApiKey] = useState('');
  const [videourl, setVideourl] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAnalyzeVideo() 
  {
    if (!apiKey || !videourl) 
    {
      alert('请填写API Key和视频链接');
      return;
    }
    setLoading(true);
    const response = await fetch('https://http://127.0.0.1:8000/v1/video/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ video_url: videourl })
    });

    const result = await response.json();
    setSummary(result.data.summary);
    setLoading(false);``
  }

  return (
    <main id="container">
      <div id="left"> 
        <h1>视频分析助手</h1>
        <input type="text" 
               placeholder="请输入您的DeepSeek API Key" 
               className="form-input" 
               value={apiKey}
               onChange={(e) => setApiKey(e.target.value)}
        />
        <input type="text" 
               placeholder="请输入视频链接" 
               className="form-input" 
               value={videourl}
               onChange={(e) => setVideourl(e.target.value)}
        />
        <button className="form-button" 
                id="analyze-button"
                onClick={handleAnalyzeVideo}
                disabled={loading}
        >
          {loading ? '分析中...' : '分析视频'}
        </button>
      </div>

      <div id="right">
        <h1>视频内容总结</h1>
        <div id="summary-container">
          <p id="summary-text">{summary}</p>
        </div>
      </div>
      
    </main>
  )
}
