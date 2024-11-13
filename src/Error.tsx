import { FC } from "react"

const Error: FC<{error:string}> = (props) => {
    return (
        <div>
            <h2>Error! {props.error}</h2>
        </div>
    )
}

export default Error