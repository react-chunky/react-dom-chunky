import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// // import { default as screens } from '../../screens'
// import { AppContainer } from 'react-hot-loader'
//
// var routes = []
// var menu = []
//
// // for(const name in screens) {
// //     const screen = screens[name]
// //     if (!screen.menu) {
// //         continue
// //     }
// //     menu.push({ id: `${menu.length}`, title: screen.title, link: `/${menu.length === 0 ? '' : name}` })
// // }
// //
// // for(const name in screens) {
// //     const screenProps = {
// //         menu
// //     }
// //     const Screen = screens[name].screen
// //     const path = screens[name].path
// //     routes.push(<Route exact path={`/${routes.length === 0 ? '' : path}`} key={name} render={(props) => <Screen {...screenProps} {...props} />}/>)
// // }
//
const Main = () => (
  <div>
    <h1> Home </h1>
  </div>
)

// routes.push(<Route exact path={`/`} key={'name'} render={(props) => <Main {...props} />}/>)

const App = () => (
  <Router>
    <div>
      <Route path="/" component={Main}/>
    </div>
  </Router>
)

// const App = () => {
//     return (<AppContainer>
//     <Router>
//         <div>
//         { routes }
//         </div>
//     </Router>
//   </AppContainer>)
// }

export default App
