import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, Redirect} from 'react-router-dom'

import routes from '../../routes'
import styles from './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className={styles.App}>
                        <Redirect exact from="/" to="/test" />
                        <Switch>
                            {routes.map((item, i) => <PropsRoute key={i}
                                                                 exact={item.exact}
                                                                 path={item.path}
                                                                 component={item.component}/>)}
                        </Switch>
            </div>
        )
    }
}

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest)
    console.log(finalProps)
    return (
        React.createElement(component, finalProps)
    )
}

const PropsRoute = ({ component, ...rest }) => {

    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest)
        }}/>
    )
}

export default hot(module)(App)
