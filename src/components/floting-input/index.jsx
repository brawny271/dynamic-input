import React from 'react';

function FloatingInput({
    value,
    onChange,
    onBlur,
    error,
    width = "300px",
    height = "40px",
    labelText = "Username",
    type = "text",
    minLength = 5,
    maxLength = 15,
}) {
    return (
        <div className={`input-container ${error ? "error" : ""}`} style={{ width, height }}>
            <input
                type={type}
                id="floatingInput"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder=" "
                required
                minLength={minLength}
                maxLength={maxLength}
            />
            <label htmlFor="floatingInput">{labelText}</label>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default FloatingInput;
