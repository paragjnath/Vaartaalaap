import { useState } from 'react';
import ChatbotApp from './ChatbotApp';
import SystemPrompts from './SystemPrompts';
import Settings from './Settings';
import { getDefaultSystemPromptName } from './constants';

function App() {
  const [defaultSystemPrompt, setDefaultSystemPrompt] = useState(
    localStorage.getItem('default_system_prompt') ||
      'You are an intelligent assistant. You always provide well-reasoned answers that are both correct and helpful.'
  );

  const [baseURL, setBaseUrl] = useState(
    localStorage.getItem('base_url') || 'http://localhost:1234/v1'
  );

  const [systemPromptName, setSystemPromptName] = useState(
    getDefaultSystemPromptName()
  );

  const handleSelectPrompt = (promptName) => {
    setSystemPromptName(promptName);
  };

  const handleSave = (data) => {
    localStorage.setItem('default_system_prompt', data.defaultSystemPrompt);
    localStorage.setItem('base_url', data.baseURL);
    setBaseUrl(data.baseURL);
    setDefaultSystemPrompt(data.defaultSystemPrompt);
  };

  return (
    <div className="app markdown-body">
      <header className="appHeader">
        <SystemPrompts
          systemPromptName={systemPromptName}
          onSelectPromptName={handleSelectPrompt}
        />
        <Settings
          onSave={handleSave}
          baseURL={baseURL}
          defaultSystemPrompt={defaultSystemPrompt}
        />
      </header>
      <ChatbotApp
        systemPromptName={systemPromptName}
        baseURL={baseURL}
        defaultSystemPrompt={defaultSystemPrompt}
      />
    </div>
  );
}

export default App;
