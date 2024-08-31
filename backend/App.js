import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Lazy load components
const Login = lazy(() => import('./components/Login'));
const Room = lazy(() => import('./components/Room'));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/room/:id" component={Room} />
                    <Route path="*" component={() => <div>404 Not Found</div>} />
                </Switch>
            </Suspense>
        </Router>
    );
};

export default App;
