import { useState, useRef } from 'react';
import { OpenAI } from 'openai';
import SendIcon from './sendIcon.png';
import Markdown from 'react-markdown';
import { getSystemPrompt } from './constants';

const ChatbotApp = (props) => {
  const { systemPromptName, baseURL, defaultSystemPrompt } = props;

  const openai = new OpenAI({
    baseURL: baseURL,
    apiKey: 'anything',
    dangerouslyAllowBrowser: true,
  });

  const [query, setQuery] = useState('');

  const [currentResponse, setCurrentResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const textareaRef = useRef(null);

  const [history, setHistory] = useState([]);

  const [streamController, setStreamController] = useState(null);

  function handleOnKeyDown(e) {
    const target = e.target;
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
        target.style.height = '54px';
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      streamController.abort();
      return;
    }
    setLoading(true);
    try {
      console.log(
        'System Prompt: ',
        getSystemPrompt(systemPromptName, defaultSystemPrompt)
      );
      const userMessage = {
        role: 'user',
        content: e.target[0].value,
      };

      const newMessage = { role: 'assistant', content: '' };
      const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: getSystemPrompt(systemPromptName, defaultSystemPrompt),
          },
          ...history.filter((m) => m.content !== undefined && m.content !== ''),
          userMessage,
        ],
        stream: true,
      });
      setStreamController(stream.controller);
      setHistory((history) => [...history, userMessage]);
      setQuery('');
      for await (const chunk of stream) {
        if (chunk.choices[0]?.delta?.content !== undefined) {
          newMessage.content =
            newMessage.content + chunk.choices[0]?.delta?.content;
          setCurrentResponse(newMessage.content);
        }
      }
      setCurrentResponse('');
      setHistory((history) => [...history, newMessage]);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  function handleOnInputChange(e) {
    const target = e.target;
    setQuery(target.value);
  }

  return (
    <div className="chatContainer">
      <div className="chatHistory">
        <div className="scroll">
          {currentResponse === '' ? undefined : (
            <div key={Math.random()} className="chatBoxContainer">
              <strong>🤖 AI</strong>
              <div className="chatBox">
                <Markdown>{currentResponse}</Markdown>
              </div>
            </div>
          )}
          {history
            .slice()
            .reverse()
            .filter((message) => message.role !== 'system')
            .map((message) => {
              return (
                <div
                  key={message.content + Math.random()}
                  className="chatBoxContainer"
                >
                  {message.role === 'user' ? (
                    <strong>🙂 You</strong>
                  ) : (
                    <strong>🤖 AI</strong>
                  )}

                  <div className="chatBox">
                    <Markdown>{message.content}</Markdown>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="bottomContainer">
        <form onSubmit={handleSubmit} ref={formRef}>
          <textarea
            ref={textareaRef}
            type="text"
            placeholder="Message AI assistant"
            onKeyDown={handleOnKeyDown}
            onChange={handleOnInputChange}
            value={query}
          ></textarea>
          <button
            disabled={!query.length}
            className={loading ? 'action-btn loading' : 'action-btn'}
            type="submit"
          >
            <img src={SendIcon} alt="send button" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotApp;
