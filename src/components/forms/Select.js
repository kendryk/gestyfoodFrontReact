import React from "react";

const Select = ({name, value,label,onChange,children})=>{

return(
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
            onChange={onChange}
            name={name}
            id={name}
            value={value}
            className="form-select"
        >
            {children}
        </select>

    </div>
    );
};

export default Select;


