import './App.css';
import {useState} from 'react';

export default function App() {
  const [summary, setSummary] = useState('这里将显示视频内容总结');
  const [apiKey, setApiKey] = useState('');
  const [videourl, setVideourl] = useState('');
  const [loading, setLoading] = useState(false);


  const Mock=true;


  async function handleAnalyzeVideo() 
  {
    if (!apiKey.trim() || !videourl.trim()) 
    {
      alert('请填写API Key和视频链接');
      return;
    }
    setLoading(true);


    try {
      if(Mock)
      {
        setTimeout(() => {
          setSummary(`
            这是一个模拟的视频内容总结
          1. 视频介绍了如何使用React进行前端开发。
          2. 视频中展示了组件的创建和状态管理。
          3. 视频还讲解了如何与后端API进行交互。
          4. 最后，视频提供了一些优化性能的技巧。
            `);
          setLoading(false);
        }, 5000);
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/v1/video/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({ video_url: videourl.trim() })
    });

      const result = await response.json();
      if(!response.ok||result.code !== 200) 
      {
        alert('分析视频失败，请检查API Key和视频链接是否正确');
      }
      else
      {
        setSummary(result.data.summary);
      }
    } 

    catch (error) 
    {
      console.error('Error analyzing video:', error);
      alert('分析视频时出错');
    }

    finally 
    {
      if(!Mock)setLoading(false);
    }
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
