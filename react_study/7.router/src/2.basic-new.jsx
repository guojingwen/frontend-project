import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/a"
  }
]);

export default function Basic () {
    return <div>
            <Link to="/">首页</Link>&nbsp;
            <Link to="/user">用户中心</Link>&nbsp;
            <Link to="/abc">404</Link>
            {/* <RouterProvider router={router}>
                
            </RouterProvider> */}
    </div>
}