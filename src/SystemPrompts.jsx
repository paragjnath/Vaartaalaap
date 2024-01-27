import { chatGPTPrompts } from './constants';

const SystemPrompts = (props) => {
  const { systemPromptName, onSelectPromptName } = props;

  const handlePromptChange = (e) => {
    onSelectPromptName(e.target.value);
  };

  return (
    <select onChange={handlePromptChange} value={systemPromptName}>
      {chatGPTPrompts.map((prompt) => (
        <option key={prompt.name} value={prompt.name}>
          {prompt.name}
        </option>
      ))}
    </select>
  );
};

export default SystemPrompts;
