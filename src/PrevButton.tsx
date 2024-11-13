import { FC, MouseEventHandler } from "react"

const PrevButton: FC<{ disabled?: boolean, onClick:MouseEventHandler<HTMLButtonElement> }> = ({ disabled, onClick }) => {
    return (
        // <button disabled={offset === 0} onClick={handlePrev}>Prev</button>
        <button disabled={disabled} onClick={onClick}>Prev</button>
    )
}

export default PrevButton