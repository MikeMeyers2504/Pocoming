import React, { Component } from "react";
import { BrowserRouter,Route } from "react-router-dom";

import Post from '../containers/Post';
import PostDetail from '../containers/PostDetail';
import AllPosts from '../containers/AllPosts';
import Categories from '../containers/Categories';

class App extends Component {

  render(){
    return(
      <div className="container">
      	<BrowserRouter>
      		<div>
            <Route exact path="/" component={Categories} />
        		<Route exact path="/" component={AllPosts}/>
            <Route path="/" component={PostDetail} />
        	</div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
