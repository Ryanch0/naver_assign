import { useQuery } from "@tanstack/react-query"
import { fetchPokeList, queryClient } from "./api"
import { useNavigate, useSearchParams } from "react-router-dom"
import PokeList from "./PokeList"
import Error from "./Error"
import { useEffect } from "react"


export const loader = async ({ request }: { request: { url: string } }) => {
    const url = new URL(request.url)
    const preOffset = Number(url.searchParams.get('offset')) + 1
    console.log(preOffset)
    await queryClient.prefetchQuery({
        queryKey: ['pokeList', preOffset],
        queryFn: () => fetchPokeList(preOffset)
    })
    return null
}
// 로더함수에 프리패치 적용
const ReactQuery3 = () => {
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()
    const offsetParams = Number(params.get('offset'))

    useEffect(() => {
        if (!offsetParams) {
            navigate('/reactQuery3?offset=0', { replace: true })
        }
    }, [offsetParams, navigate])


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['pokeList', offsetParams],
        queryFn: () => fetchPokeList(offsetParams)
    })

    const handleNextPage = () => {
        setParams({
            offset: `${offsetParams + 1}`
        })
    }

    const handlePrevPage = () => {
        setParams({
            offset: `${offsetParams - 1}`
        })
    }
    return (
        <>
            {data &&
                <PokeList
                    data={data}
                    handleNext={handleNextPage}
                    handlePrev={handlePrevPage}
                    offset={offsetParams}
                />}
            {isError && <Error error={error.message} />}
            {isLoading && <p>Loading</p>}
        </>
    )
}
export default ReactQuery3