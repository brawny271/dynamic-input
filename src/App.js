import { useState } from "react";
import "./App.css";
import FloatingInput from "./components/floting-input";

function App() {
  const initialFormState = {
    email: "",
    phone: "",
    username: "",
    password: "",
    age: "",
  };
  const initialErrorState = {
    email: "",
    phone: "",
    username: "",
    password: "",
    age: "",
  };
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [buttonText, setButtonText] = useState("Submit");

  const updateField = (field, value, error) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    const newErrors = { ...initialErrorState };
    let hasEmpty = false;
    Object.keys(form).forEach((field) => {
      if (!form[field]) {
        newErrors[field] =
          field.charAt(0).toUpperCase() + field.slice(1) + " is required.";
        hasEmpty = true;
      }
    });
    if (hasEmpty) {
      setErrors(newErrors);
      return;
    }
    if (
      errors.email ||
      errors.phone ||
      errors.username ||
      errors.password ||
      errors.age
    ) {
      return;
    }
    setForm(initialFormState);
    setErrors(initialErrorState);
    setButtonText("Submitted");
    setTimeout(() => {
      setButtonText("Submit");
    }, 1000);
  };

  const hasError = Object.values(errors).some((err) => err !== "");

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
        <div className="info">
          <p>
            <strong>Dynamic Component:</strong> Fully dynamic input fields with
            a floating label and responsive design.
          </p>
          <p>
            <strong>Validations:</strong> Implements required, min/max length,
            pattern, numeric range, and custom validations for each field.
          </p>
          <p>
            <strong>Feedback:</strong> Displays error feedback (red border and
            label) on blur and clears errors when corrected.
          </p>
          <p>
            <strong>Submission:</strong> Validates on submit, clears inputs on
            success, and animates the "Submitted" text.
          </p>
        </div>
        <div className="input-wrapper">
          <FloatingInput
            name="email"
            value={form.email}
            onFieldUpdate={updateField}
            error={errors.email}
            width="300px"
            height="40px"
            labelText="Email"
            type="email"
            minLength={8}
            maxLength={50}
          />
          <FloatingInput
            name="phone"
            value={form.phone}
            onFieldUpdate={updateField}
            error={errors.phone}
            width="300px"
            height="40px"
            labelText="Phone"
            type="tel"
            minLength={10}
            maxLength={10}
          />
          <FloatingInput
            name="username"
            value={form.username}
            onFieldUpdate={updateField}
            error={errors.username}
            width="300px"
            height="40px"
            labelText="Username"
            type="text"
            minLength={5}
            maxLength={15}
          />
          <FloatingInput
            name="password"
            value={form.password}
            onFieldUpdate={updateField}
            error={errors.password}
            width="300px"
            height="40px"
            labelText="Password"
            type="password"
            minLength={8}
            maxLength={20}
          />
          <FloatingInput
            name="age"
            value={form.age}
            onFieldUpdate={updateField}
            error={errors.age}
            width="300px"
            height="40px"
            labelText="Age"
            type="number"
            minNumber={18}
            maxNumber={100}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className={`submit-btn ${hasError ? "disabled" : ""}`}
        >
          {renderButtonText()}
        </button>
      </div>
    </div>
  );
}

export default App;
