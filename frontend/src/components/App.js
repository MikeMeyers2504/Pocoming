import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//import history from '../utils/history';

//import Post from '../containers/Post';
import PostDetail from '../containers/PostDetail';

import HomeScreen from '../containers/HomeScreen';
import Form from '../containers/Form';
import EditForm from '../containers/EditForm';
import Test from '../containers/Test';
import CategoryView from '../containers/CategoryView';
import newComment from '../containers/AddComment';
import EditComment from '../containers/EditComment';

class App extends Component {

  render(){
    return(
      <div className="container">
      	<BrowserRouter>
      		<div>
            <Route exact path="/postDetails" component={PostDetail} />
            <Route exact path="/postDetails/newComment" component={newComment} />
            <Route exact path="/postDetails/editComment" component={EditComment} />
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/newForm" component={Form} />
            <Route exact path="/editForm" component={EditForm} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/categories/:category" component={CategoryView} />
        	</div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
