import { useState } from "react";
import "./App.css";
import FloatingInput from "./components/floting-input";
import { regexPatterns } from "./Rgex";

function App() {
  const initialFormState = {
    email: "",
    phone: "",
    username: "",
    password: "",
  };
  const initialErrorState = {
    email: "",
    phone: "",
    username: "",
    password: "",
  };
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [buttonText, setButtonText] = useState("Submit");

  const handleChange = (field, value) => {
    if (field === "phone") {
      value = value.replace(/\D/g, "");
    }
    if (field === "username") {
      value = value.replace(
        /[^A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
        ""
      );
    }
    value = value.replace(/\s/g, "");
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateField = (field, value) => {
    if (/\s/.test(value)) {
      return "Spaces are not allowed.";
    }
    const trimmedValue = value;
    let error = "";
    switch (field) {
      case "email":
        if (!trimmedValue) error = "Email is required.";
        else if (trimmedValue.length < 8)
          error = "Minimum length is 8 characters.";
        else if (trimmedValue.length > 50)
          error = "Maximum length is 50 characters.";
        else if (!regexPatterns.email.test(trimmedValue))
          error = "Please enter a valid email address.";
        break;
      case "phone":
        if (!trimmedValue) {
          error = "Phone number is required.";
        } else if (trimmedValue.length !== 10) {
          error = "Phone number must be exactly 10 digits.";
        } else if (!regexPatterns.phone.test(trimmedValue)) {
          error = "Please enter a valid phone number.";
        }
        break;
      case "username":
        if (!trimmedValue) error = "Username is required.";
        else if (trimmedValue.length < 5)
          error = "Minimum length is 5 characters.";
        else if (trimmedValue.length > 15)
          error = "Maximum length is 15 characters.";
        else if (!regexPatterns.username.test(trimmedValue))
          error =
            "Username must be a combination of uppercase letters and digits.";
        break;
      case "password":
        if (!trimmedValue) error = "Password is required.";
        else if (trimmedValue.length < 8)
          error = "Minimum length is 8 characters.";
        else if (trimmedValue.length > 20)
          error = "Maximum length is 20 characters.";
        else if (!regexPatterns.strongPassword.test(trimmedValue))
          error =
            "Password must include uppercase, lowercase, digit, and special character.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (field) => {
    const error = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = () => {
    const emailError = validateField("email", form.email);
    const phoneError = validateField("phone", form.phone);
    const usernameError = validateField("username", form.username);
    const passwordError = validateField("password", form.password);
    const newErrors = {
      email: emailError,
      phone: phoneError,
      username: usernameError,
      password: passwordError,
    };
    setErrors(newErrors);
    if (emailError || phoneError || usernameError || passwordError) return;
    setForm(initialFormState);
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
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={errors.email}
            width="300px"
            height="40px"
            labelText="Email"
            type="email"
            minLength={8}
            maxLength={50}
          />
          <FloatingInput
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            error={errors.phone}
            width="300px"
            height="40px"
            labelText="Phone"
            type="tel"
            minLength={10}
            maxLength={10}
          />
          <FloatingInput
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            onBlur={() => handleBlur("username")}
            error={errors.username}
            width="300px"
            height="40px"
            labelText="Username"
            type="text"
            minLength={5}
            maxLength={15}
          />
          <FloatingInput
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            error={errors.password}
            width="300px"
            height="40px"
            labelText="Password"
            type="password"
            minLength={8}
            maxLength={20}
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
