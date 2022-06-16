function obtainProgressClass(value: string){
    if(value === "100")
        return "is-success"

    if(value >= "60")
        return "is-warning"
    
    if(value < "60")
        return "is-danger"

    return ""

}

export default function passwordStrengthMeter(value: string) {
    return (
        <progress className={"progress progressCustom is-small mt-1 " + obtainProgressClass(value)} value={value} max={100}>
            {value + "%"}
        </progress>
    )
}