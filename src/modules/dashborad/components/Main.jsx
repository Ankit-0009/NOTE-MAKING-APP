import { Route, Routes } from "react-router-dom"
import { Home } from "../../notes/components/Home"
import { Add } from "../../notes/components/Add"
import { List } from "../../notes/components/List"

export const Main = () => {
    return(
        <>
            {/* These Routes used to navigate the different components. */}
            <Routes>
                <Route path="/" element = {<Home/>}></Route>
                <Route path="/add" element = {<Add/>}></Route>
                <Route path="/view-all" element = {<List/>}></Route>
            </Routes>
        </>
    )
}