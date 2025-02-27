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

        if (/\s/.test(val) && !["fullName"].includes(field)) {
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
            case "panCard":
                if (!trimmedValue) errorMessage = "PAN card number is required.";
                else if (!regexPatterns.panCard.test(trimmedValue))
                    errorMessage = "Invalid PAN card number.";
                break;
            case "bankAccount":
                if (!trimmedValue) errorMessage = "Bank account number is required.";
                else if (!regexPatterns.bankAccount.test(trimmedValue))
                    errorMessage = "Invalid bank account number.";
                break;
            case "ifsc":
                if (!trimmedValue) errorMessage = "IFSC code is required.";
                else if (!regexPatterns.ifsc.test(trimmedValue))
                    errorMessage = "Invalid IFSC code.";
                break;
            case "url":
                if (!trimmedValue) errorMessage = "URL is required.";
                else if (!regexPatterns.url.test(trimmedValue))
                    errorMessage = "Invalid URL.";
                break;
            case "address":
                if (!trimmedValue) errorMessage = "Address is required.";
                else if (trimmedValue.length < 5)
                    errorMessage = "Address must be at least 5 characters long.";
                break;
            case "zipCode":
                if (!trimmedValue) errorMessage = "Zip code is required.";
                else if (!regexPatterns.zipCode.test(trimmedValue))
                    errorMessage = "Invalid zip code.";
                break;
            case "ssn":
                if (!trimmedValue) errorMessage = "SSN is required.";
                else if (!regexPatterns.ssn.test(trimmedValue))
                    errorMessage = "Invalid SSN format.";
                break;
            case "ipv4":
                if (!trimmedValue) errorMessage = "IPv4 address is required.";
                else if (!regexPatterns.ipv4.test(trimmedValue))
                    errorMessage = "Invalid IPv4 address.";
                break;
            case "alphanumeric":
                if (!trimmedValue) errorMessage = "This field is required.";
                else if (!regexPatterns.alphanumeric.test(trimmedValue))
                    errorMessage = "Only letters and numbers are allowed.";
                break;
            default:
                if (!trimmedValue) {
                    errorMessage =
                        field.charAt(0).toUpperCase() + field.slice(1) + " is required.";
                }
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
