import { useQuery } from "@tanstack/react-query"
import { fetchPokeList, queryClient } from "./api"
import { useSearchParams } from "react-router-dom"
import PokeList from "./PokeList"
import Error from "./Error"
import PrevButton from "./PrevButton"
import NextButton from "./NextButton"


export const loader = async ({ request }: { request: { url: string } }) => {
    const url = new URL(request.url)
    const offset = Number(url.searchParams.get('offset')) + 1
    console.log(offset)
    await queryClient.prefetchQuery({
        queryKey: ['pokeList', offset],
        queryFn: () => fetchPokeList(offset)
    })
    return null
}
// 로더함수에 프리패치 적용
const ReactQuery3 = () => {
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
export default ReactQuery3