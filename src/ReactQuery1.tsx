import { useQuery } from "@tanstack/react-query"
import { fetchPokeList } from "./api"
import { useNavigate, useSearchParams } from "react-router-dom"
import PokeList from "./PokeList"
import Error from "./Error"
import { useEffect } from "react"


// useSearchParams 상태 저장 페이징 정보
const ReactQuery1 = () => {
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()
    const offsetParams = Number(params.get('offset'))

    useEffect(() => {
        if (!offsetParams) {
            navigate('/reactQuery1?offset=0', { replace: true })
        }
    }, [offsetParams, navigate])

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['pokeList', offsetParams],
        queryFn: () => fetchPokeList(offsetParams)
    })

    const handlePagination = (val: number) => {
        setParams({
            offset: `${offsetParams + val}`
        })
    }
    return (
        <>
            {data &&
                <PokeList
                    data={data}
                    handleNext={() => handlePagination(1)}
                    handlePrev={() => handlePagination(-1)}
                    offset={offsetParams} />}
            {isError && <Error error={error.message} />}
            {isLoading && <p>Loading</p>}
        </>
    )
}
export default ReactQuery1