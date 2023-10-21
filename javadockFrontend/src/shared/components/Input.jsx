export function Input(props) {
    const {id, labelText, error, onChange, type, defaultValue, disabled} = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input id={id}
                   disabled={disabled}
                   defaultValue={defaultValue}
                   className={error ? "form-control is-invalid" : "form-control"}
                   onChange={onChange}
                   type={type}/>
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    )
}