import { FetchQueryOptions, useQuery } from "@tanstack/react-query"
import { fetchPokeList, queryClient, RootObject } from "./api"
import { LoaderFunctionArgs, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import PokeList from "./PokeList"
import Error from "./Error"
import PrevButton from "./PrevButton"
import NextButton from "./NextButton"

// react-query 가 소비하는 옵션은 별도의 변수로 분리하면 좋습니다.
const getPokeListOptions = (offset: number): FetchQueryOptions<RootObject> => {
    return {
        queryKey: ['pokeList', offset],
        queryFn: () => fetchPokeList(offset)
    }
}


export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const offset = Number(url.searchParams.get('offset')) || 0
    await queryClient.prefetchQuery(getPokeListOptions(offset))
    
    return null
}

const ReactQuery4 = () => {
    const [params] = useSearchParams()
    const offset = Number(params.get('offset')) || 0
    const { data, isLoading, isError, error } = useQuery(getPokeListOptions(offset))

    // useNavigate 함수와 <Link /> , <NavLink /> 모두 쿼리스트링을 기록하기 위한 좋은 수단입니다.
    const location = useLocation() 
    const navigate = useNavigate()
    const onPrevPage = () => navigate({
        pathname: location.pathname,
        // 쿼리스트링은 이렇게 조합할수도 있고
        search: new URLSearchParams({
            offset: `${offset - 1}`
        }).toString()
    })
    const onNextPage = () => navigate({
        pathname: location.pathname,
        // 이렇게 예상 결과물만 적어줄수도 있습니다.
        search: `?offset=${offset + 1}`
    })

    // early return 으로 경우의 수를 최대한 줄이면 좋습니다.
    if (isError) {
        return <Error error={error.message} />
    }

    if (isLoading) {
        return <p>Loading</p>
    }

    if (!data) {
        return <p>데이터가 없습니다.</p>
    }

    return (
        <>
            <PokeList data={data} />
            <PrevButton disabled={offset === 0} onClick={onPrevPage} />
            <NextButton onClick={onNextPage} />
        </>
)
}
export default ReactQuery4