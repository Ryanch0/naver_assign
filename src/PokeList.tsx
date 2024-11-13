import { FC, PropsWithChildren } from "react"
import { RootObject } from "./api"

type Type = {
    data: RootObject
}

const PokeList: FC<PropsWithChildren<Type>> = ({ data }) => {
    return (
        <ul>
            {data?.results.map(item => {
                return <li key={item.name}>
                    {item.name}
                </li>
            })}
        </ul>
    )
}

export default PokeList