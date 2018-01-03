import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import PostDetail from '../components/PostDetail';
import HomeScreen from '../components/HomeScreen';
import Form from '../components/Form';
import EditForm from '../components/EditForm';
import CategoryView from '../components/CategoryView';
import newComment from '../components/AddComment';
import EditComment from '../components/EditComment';

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
            <Route exact path="/categories/:category" component={CategoryView} />
        	</div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
