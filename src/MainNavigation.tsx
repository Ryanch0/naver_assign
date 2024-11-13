import { CSSProperties } from "react"
import { NavLink, NavLinkRenderProps } from "react-router-dom"

const getStyle = ({ isActive }: NavLinkRenderProps): CSSProperties | undefined => {
    if (isActive) {
        return { color: 'red' }
    }

    return
}

const MainNavigation = () => {
    return (
        <>
            <ul>
                <li>
                    <NavLink to={{
                        pathname: '/reactQuery1',
                        search: new URLSearchParams({
                            offset: '0'
                        }).toString()
                    }} style={getStyle}>과제1</NavLink>
                </li>
                <li>
                    <NavLink to={{
                        pathname: '/reactQuery2',
                        search: '?offset=0'
                    }} style={getStyle}>과제2</NavLink>
                </li>
                <li>
                    <NavLink to='/reactQuery3' style={getStyle}>과제3</NavLink>
                </li>
                <li>
                    <NavLink to='/reactQuery4' style={getStyle}>예제</NavLink>
                </li>
            </ul>

        </>
    )
}
export default MainNavigation