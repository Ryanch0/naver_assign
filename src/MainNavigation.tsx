import { NavLink } from "react-router-dom"

const MainNavigation = () => {
    return (
        <>
            <ul>
                <li>
                    <NavLink to='/reactQuery1?offset=0' style={({isActive}) => {return {color: isActive? 'red' : undefined}} }>과제1</NavLink>
                </li>
                <li>
                    <NavLink to='/reactQuery2?offset=0' style={({isActive}) => {return {color: isActive? 'red' : undefined}} }>과제2</NavLink>
                </li>
                <li>
                    <NavLink to='/reactQuery3?offset=0' style={({isActive}) => {return {color: isActive? 'red' : undefined}} }>과제3</NavLink>
                </li>
            </ul>

        </>
    )
}
export default MainNavigation