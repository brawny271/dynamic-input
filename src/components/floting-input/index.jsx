import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { regexPatterns } from '../../Rgex';

const FloatingInput = forwardRef(({
    width = '300px',
    height = '',
    labelText = 'Username',
    type = 'text',
    minLength = 5,
    maxLength = 15,
    pattern = regexPatterns.alphanumeric,
    patternErrorMessage = 'Invalid format. Only alphanumeric characters allowed.',
    min = null,
    max = null,
    requiredMessage = 'This field is required.',
    customValidation = null,
    onChange,
}, ref) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);

    const validate = (val) => {
        let message = '';
        const trimmedVal = val.trim();
        if (!trimmedVal) {
            message = requiredMessage;
        } else if (trimmedVal.length < minLength) {
            message = `Minimum length is ${minLength} characters.`;
        } else if (trimmedVal.length > maxLength) {
            message = `Maximum length is ${maxLength} characters.`;
        } else if (pattern && !pattern.test(trimmedVal)) {
            message = patternErrorMessage;
        } else if (type === 'number') {
            const numVal = Number(trimmedVal);
            if (min !== null && numVal < min) {
                message = `Minimum value is ${min}.`;
            } else if (max !== null && numVal > max) {
                message = `Maximum value is ${max}.`;
            }
        }
        if (!message && customValidation) {
            message = customValidation(trimmedVal);
        }
        return message;
    };

    useImperativeHandle(ref, () => ({
        validate: () => {
            const validationMessage = validate(value);
            setError(validationMessage);
            return validationMessage;
        },
        clear: () => {
            setValue('');
            setError('');
            setTouched(false);
        }
    }));

    const handleBlur = () => {
        setTouched(true);
        setError(validate(value));
    };

    const handleChange = (e) => {
        const newVal = e.target.value;
        setValue(newVal);
        if (touched) {
            setError(validate(newVal));
        }
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={`input-container ${error ? 'error' : ''}`} style={{ width, height }}>
            <input
                type={type}
                id="floatingInput"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder=" "
                required
                minLength={minLength}
                maxLength={maxLength}
                {...(pattern ? { pattern: typeof pattern === 'string' ? pattern : pattern.toString().slice(1, -1) } : {})}
                {...(type === 'number' && min !== null ? { min } : {})}
                {...(type === 'number' && max !== null ? { max } : {})}
            />
            <label htmlFor="floatingInput">{labelText}</label>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
});

export default FloatingInput;
