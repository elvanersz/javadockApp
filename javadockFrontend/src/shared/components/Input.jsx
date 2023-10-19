export function Input(props) {
    const {id, labelText, error, onChange, type, defaultValue} = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input id={id}
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