import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'
import ReactQuery1 from './ReactQuery1'
import ReactQuery2 from './ReactQuery2'
import ReactQuery3, { loader as reactQuery3Loader } from './ReactQuery3'
import ReactQuery4, { loader as reactQuery4Loader } from './ReactQuery4'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'element={<RootLayout/>}>
    <Route path='reactQuery1' element={<ReactQuery1/>}/>
    <Route path='reactQuery2' element={<ReactQuery2/>}/>
    <Route path='reactQuery3' element={<ReactQuery3/>} loader={reactQuery3Loader}/>
    <Route path='reactQuery4' element={<ReactQuery4/>} loader={reactQuery4Loader}/>
    <Route path='*' element={<Navigate to='/'/>} />
  </Route>
))

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
