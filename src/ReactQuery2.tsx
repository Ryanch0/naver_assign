import { useQuery } from "@tanstack/react-query"
import { fetchPokeList, queryClient } from "./api"
import { useNavigate, useSearchParams } from "react-router-dom"
import PokeList from "./PokeList"
import Error from "./Error"
import { useEffect } from "react"


// 다음 버튼에 마우스 호버할때 프리패치 적용
const ReactQuery2 = () => {
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()
    const offsetParams = Number(params.get('offset'))

    useEffect(()=>{
        if (!offsetParams) {
            navigate('/reactQuery2?offset=0', { replace: true })
        }
    },[offsetParams,navigate])

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

    const handleHoverNextPage = () => {
        const nextOffset = offsetParams + 1
        queryClient.prefetchQuery({
            queryKey:['pokeList',nextOffset],
            queryFn: () => fetchPokeList(nextOffset)
        })
    }

    
    //사실 이건 의미없는기능이지만 넣었습니다
    const handleHoverPrevPage = () => {
        const prevOffset = offsetParams -1
        queryClient.prefetchQuery({
            queryKey:['pokeList',prevOffset],
            queryFn: () => fetchPokeList(prevOffset)
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
                hoverNext={handleHoverNextPage}
                hoverPrev={handleHoverPrevPage}/>}
            {isError && <Error error={error.message}/>}
            {isLoading && <p>Loading</p>}
        </>
    )
}
export default ReactQuery2