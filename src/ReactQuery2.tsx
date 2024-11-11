import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchPokeList } from "./api"
import { useSearchParams } from "react-router-dom"
import PokeList from "./PokeList"
import Error from "./Error"
import PrevButton from "./PrevButton"
import NextButton from "./NextButton"

// 다음 버튼에 마우스 호버할때 프리패치 적용
const ReactQuery2 = () => {
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

    const queryClient = useQueryClient()
    const handleHoverNextPage = () => {
        const nextOffset = offset + 1
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
                (   <>
                        <PokeList data={data} />
                        <PrevButton disabled={offset === 0} onClick={() => handlePagination(-1)} />
                        <NextButton onClick={() => handlePagination(1)} onMouseEnter={handleHoverNextPage} />
                    </>
                )
            }    
            {isError && <Error error={error.message} />}
            {isLoading && <p>Loading</p>}
        </>
    )
}
export default ReactQuery2