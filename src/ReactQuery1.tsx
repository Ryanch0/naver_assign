import { useQuery } from "@tanstack/react-query"
import { fetchPokeList } from "./api"
import { useSearchParams } from "react-router-dom"
import PokeList from "./PokeList"
import Error from "./Error"
import PrevButton from "./PrevButton"
import NextButton from "./NextButton"


// useSearchParams 상태 저장 페이징 정보
const ReactQuery1 = () => {
    const [params, setParams] = useSearchParams()
    const offset = Number(params.get('offset')) || 0
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['pokeList', offset],
        queryFn: () => fetchPokeList(offset)
    })
    const handlePagination = (val: number) => {
        setParams({
            offset: `${offset + val}`
        })
    }
    return (
        <>
            {data &&
                (   <>
                        <PokeList data={data} />
                        <PrevButton disabled={offset === 0} onClick={() => handlePagination(-1)} />
                        <NextButton onClick={() => handlePagination(1)} />
                    </>
                )
            }
            {isError && <Error error={error.message} />}
            {isLoading && <p>Loading</p>}
        </>
    )
}
export default ReactQuery1