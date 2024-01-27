import { useState } from 'react';
import './Settings.css';

const Settings = (props) => {
  const { onSave, baseURL, defaultSystemPrompt } = props;
  const [show, setShow] = useState(false);

  const [baseURLInput, setBaseURLInput] = useState(baseURL);

  const [defaultSystemPromptInput, setDefaultSystemPromptInput] =
    useState(defaultSystemPrompt);

  const handleClick = () => {
    setShow((show) => !show);
  };

  function handleOnUrlChange(e) {
    const target = e.target;
    setBaseURLInput(target.value);
  }

  function handleOnPromptChange(e) {
    const target = e.target;
    setDefaultSystemPromptInput(target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave({
      baseURL: baseURLInput,
      defaultSystemPrompt: defaultSystemPromptInput,
    });
    setShow(false);
  };

  if (show) {
    return (
      <div className="DialogContainer">
        <div className="BackDrop" onClick={handleClick}></div>
        <div className="Dialog">
          <h4>Settings</h4>
          <form onSubmit={handleSubmit}>
            <label>Base URL</label>
            <input value={baseURLInput} onChange={handleOnUrlChange} />
            <label>Default System Prompt</label>
            <textarea
              value={defaultSystemPromptInput}
              onChange={handleOnPromptChange}
            />
            <div className="ButtonContainer">
              <button type="submit" className="action-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return <button onClick={handleClick}>Settings</button>;
};

export default Settings;
