import './App.css'

export default function App() {
  return (
    <main id="container">
      <div id="left"> 
        <h1>视频分析助手</h1>
        <input type="text" placeholder="请输入您的DeepSeek API Key" className="form-input" />
        <input type="text" placeholder="请输入视频标题" className="form-input" />
        <button className="form-button" id="analyze-button">开始分析视频</button>
      </div>

      <div id="right">
        <h1>视频内容总结</h1>
        <div id="summary-container">
          <p id="summary-text">这里将显示视频内容总结...</p>
        </div>
      </div>
      
    </main>
  )
}
