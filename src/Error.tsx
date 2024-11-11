const Error = (props:{error:string}) => {
    return (
        <div>
            <h2>Error! {props.error}</h2>
        </div>
    )
}

export default Error