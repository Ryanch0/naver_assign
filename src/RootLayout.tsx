import { Outlet } from "react-router-dom"
import MainNavigation from "./MainNavigation"

const RootLayout = () => {
    return(
        <>
        <p>리액트 라우터 + 리액트 쿼리 과제 입니다</p>
        <MainNavigation />
        <Outlet />
        </>
    )
}
export default RootLayout