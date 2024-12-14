import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";


export function Input(props) {
    const {id, labelText, error, onChange, type, defaultValue, disabled, accept, height, width} = props;
    
    const inputHeight = height || "40px";
    const inputWidth = width || "100%";

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input id={id}
                   disabled={disabled}
                   defaultValue={defaultValue}
                   accept={accept}
                   className={error ? "form-control is-invalid" : "form-control"}
                   onChange={onChange}
                   type={type}
                   style={{ 
                        height: inputHeight,
                        width: inputWidth
                    }}/>
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}