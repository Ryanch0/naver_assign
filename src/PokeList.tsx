import { RootObject } from "./api"

type Type = {
    data: RootObject,
    handlePrev: () => void,
    handleNext: () => void,
    hoverNext?: () => void,
    offset: number
}

const PokeList = ({ data, handlePrev, handleNext, offset, hoverNext}: Type) => {
    return (
        <>
            <ul>
                {data?.results.map(item => {
                    return <li key={item.name}>
                        {item.name}
                    </li>
                })}
            </ul>
            <button
                disabled={offset === 0}
                onClick={handlePrev}
            >Prev</button>
            <button
                onClick={handleNext}
                onMouseEnter={hoverNext}
                >Next</button>
        </>
    )
}

export default PokeList