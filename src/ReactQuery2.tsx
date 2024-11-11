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

    useEffect(() => {
        if (!offsetParams) {
            navigate('/reactQuery2?offset=0', { replace: true })
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

    const handleHoverNextPage = () => {
        const nextOffset = offsetParams + 1
            queryClient.prefetchQuery({
                queryKey: ['pokeList', nextOffset],
                queryFn: () => fetchPokeList(nextOffset)
            })
            console.log(nextOffset)
    }

    // 버튼을 떠나지 않고 계속 hover를 한다면 프리패치는 이전의 프리패치 offset으로 같은 요청만 날리게됩니다.
    // 따라서 아래와 같은 방식을 사용하면 그 문제는 해결할 수 있지만 이렇게하면 마우스 호버시의 프리패치의 의미가 사라집니다.
    // useEffect(()=>{
    //     handleHoverNextPage()
    // },[offsetParams])

    // 다른 대안으로 setInterval을 ref에 담고 onMouseLeave했을때 타이머를 초기화하는 방법도 생각해봤으나
    // 그다지 좋은 옵션은 아니었습니다.

    return (
        <>
            {data &&
                <PokeList
                    data={data}
                    handleNext={() => handlePagination(1)}
                    handlePrev={() => handlePagination(-1)}
                    offset={offsetParams}
                    hoverNext={handleHoverNextPage}
                />}
            {isError && <Error error={error.message} />}
            {isLoading && <p>Loading</p>}
        </>
    )
}
export default ReactQuery2