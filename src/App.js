import { useRef, useState } from "react";
import "./App.css";
import FloatingInput from "./components/floting-input";
import { regexPatterns } from "./Rgex";

function App() {
  const inputRef = useRef();
  const [buttonText, setButtonText] = useState("Submit");

  const handleClick = () => {
    if (inputRef.current) {
      const error = inputRef.current.validate();
      if (error) {
        return;
      }
      inputRef.current.clear();
    }
    setButtonText("Submitted");
    setTimeout(() => {
      setButtonText("Submit");
    }, 1000);
  };

  const renderButtonText = () => {
    if (buttonText === "Submitted") {
      return buttonText.split("").map((char, index) => (
        <span
          key={index}
          className="letter"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ));
    }
    return buttonText;
  };

  return (
    <div className="container">
      <div className="card">
        <FloatingInput
          ref={inputRef}
          width="300px"
          height="40px"
          labelText="Email"
          type="email"
          minLength={8}
          maxLength={50}
          pattern={regexPatterns.email}
          patternErrorMessage="Please enter a valid email address."
        />
        <button type="button" onClick={handleClick} className="submit-btn">
          {renderButtonText()}
        </button>
      </div>
    </div>
  );
}

export default App;
