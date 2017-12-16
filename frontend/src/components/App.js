import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//import Post from '../containers/Post';
import PostDetail from '../containers/PostDetail';
import AllPosts from '../containers/AllPosts';
//import Categories from '../containers/Categories';

import HomeScreen from '../containers/HomeScreen';
import Form from '../containers/Form';
import Test from '../containers/Test';

class App extends Component {

  render(){
    return(
      <div className="container">
      	<BrowserRouter>
      		<div>
        		<Route exact path="/details" component={AllPosts}/>
            <Route exact path="/details" component={PostDetail} />
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/newForm" component={Form} />
            <Route exact path="/test" component={Test} />
        	</div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
