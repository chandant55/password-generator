import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import "./index.css";
import PasswordStrengthIndicator from "./components/strengthchecker";
import Button from "./Button";
import CheckBox from "./components/Checkbox";

function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      {/* Password Text and Copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>

          <Button
            text={copied ? "copied" : "copy"}
            customClass={"copyBtn"}
            onClick={handleCopy}
          />
        </div>
      )}
      {/* Character length */}
      <div className="charLength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>
      {/* checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <CheckBox
              key={index}
              title={checkbox.title}
              state={checkbox.state}
              onChange={() => handleCheckboxChange(index)}
            />
          );
        })}
      </div>

      {/* strength */}

      <PasswordStrengthIndicator password={password} />

      {/* error handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      {/* generate button */}

      <Button
        text="Generate Password"
        onClick={() => {
          generatePassword(checkboxData, length);
        }}
        customClass="generateBtn"
      />
    </div>
  );
}

export default App;
