import { FC, MouseEventHandler } from "react"

const NextButton: FC<{ disabled?: boolean, onClick:MouseEventHandler<HTMLButtonElement>, onMouseEnter?: MouseEventHandler<HTMLButtonElement> }> = ({ disabled, onClick, onMouseEnter }) => {
    return (
        <button disabled={disabled} onClick={onClick} onMouseEnter={onMouseEnter}>Next</button>
    )
}

export default NextButton