export function Alert(props){
    const { children, styleType, center, marginTop } = props;

    const alertMarginTop = marginTop || "0px";

    return  <div 
                style={{marginTop: alertMarginTop}}
                className={`alert alert-${styleType} ${center ? "text-center" : ""}`}>{children}
            </div>
}