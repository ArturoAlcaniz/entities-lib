export default function CustomErrorMessage(msg: string): JSX.Element {
    return (
            msg ? (
                <div className="help form-feedback">
                    {msg}
                </div>
            ) : (
                <div></div>
            )
    )
}