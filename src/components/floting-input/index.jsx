import React from 'react';
import { regexPatterns } from '../../Rgex';

function FloatingInput({
    name,
    value,
    onFieldUpdate,
    error,
    width = "300px",
    height = "40px",
    labelText = "Username",
    type = "text",
    minLength = 5,
    maxLength = 15,
    ...rest
}) {
    const handleChange = (e) => {
        let newValue = e.target.value;
        if (name === "phone" || name === "age") {
            newValue = newValue.replace(/\D/g, "");
        }
        if (name === "username") {
            newValue = newValue.replace(
                /[^A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,
                ""
            );
        }
        newValue = newValue.replace(/\s/g, "");
        onFieldUpdate(name, newValue, "");
    };

    const validateField = (field, val) => {
        if (/\s/.test(val)) {
            return "Spaces are not allowed.";
        }
        const trimmedValue = val;
        let errorMessage = "";
        switch (field) {
            case "email":
                if (!trimmedValue) errorMessage = "Email is required.";
                else if (trimmedValue.length < 8)
                    errorMessage = "Minimum length is 8 characters.";
                else if (trimmedValue.length > 50)
                    errorMessage = "Maximum length is 50 characters.";
                else if (!regexPatterns.email.test(trimmedValue))
                    errorMessage = "Please enter a valid email address.";
                break;
            case "phone":
                if (!trimmedValue) {
                    errorMessage = "Phone number is required.";
                } else if (trimmedValue.length !== 10) {
                    errorMessage = "Phone number must be exactly 10 digits.";
                } else if (!regexPatterns.phone.test(trimmedValue)) {
                    errorMessage = "Please enter a valid phone number.";
                }
                break;
            case "username":
                if (!trimmedValue) errorMessage = "Username is required.";
                else if (trimmedValue.length < 5)
                    errorMessage = "Minimum length is 5 characters.";
                else if (trimmedValue.length > 15)
                    errorMessage = "Maximum length is 15 characters.";
                else if (!regexPatterns.username.test(trimmedValue))
                    errorMessage =
                        "Username must be a combination of letters, digits, and may include special characters (no spaces allowed).";
                break;
            case "password":
                if (!trimmedValue) errorMessage = "Password is required.";
                else if (trimmedValue.length < 8)
                    errorMessage = "Minimum length is 8 characters.";
                else if (trimmedValue.length > 20)
                    errorMessage = "Maximum length is 20 characters.";
                else if (!regexPatterns.strongPassword.test(trimmedValue))
                    errorMessage =
                        "Password must include uppercase, lowercase, digit, and special character.";
                break;
            case "age":
                if (!trimmedValue) {
                    errorMessage = "Age is required.";
                } else {
                    const ageNumber = Number(trimmedValue);
                    if (ageNumber < 18) {
                        errorMessage = "Minimum age is 18.";
                    } else if (ageNumber > 100) {
                        errorMessage = "Maximum age is 100.";
                    }
                }
                break;
            default:
                break;
        }
        return errorMessage;
    };

    const handleBlur = () => {
        const errorMessage = validateField(name, value);
        onFieldUpdate(name, value, errorMessage);
    };

    return (
        <div
            className={`input-container ${error ? "error" : ""}`}
            style={{ width, height }}
        >
            <input
                type={type}
                id={`floatingInput-${name}`}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=" "
                required
                minLength={minLength}
                maxLength={maxLength}
                {...rest}
            />
            <label htmlFor={`floatingInput-${name}`}>{labelText}</label>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default FloatingInput;
