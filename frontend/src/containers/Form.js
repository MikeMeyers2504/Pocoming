import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { createPost } from '../actions/index';

const stringPathEdit = '/editForm';
const stringPathNew = '/newForm';
// Ik was in deze file bezig met het editing van een post, 
// er is enkel nog maar in deze file iets voorzien 
// bij action, reducers moet er nog bijgezet worden!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
class MyForm extends Component {
  componentDidMount(){
    if (this.props.history.location.pathname === '/editForm') {
      if (this.props.post) {
        const { initialize} = this.props;
        const obj = {
          'title' : this.props.post.title,
          'category': this.props.post.category,
          'body': this.props.post.body,
          'author': this.props.post.author,   
        }
        initialize(obj)
      } 
    }
  }

  handleAdd() {
    console.log("title: " + this.props.title);
    console.log("body: " + this.props.body);
    console.log("author: " + this.props.author);
    console.log("category: " + this.props.category);
    if (this.props.title && this.props.author && this.props.category) {
      console.log("we zitte erin");
      this.props.handleSubmit();
      return this.props.history.push("/");
    } else {
      alert("You can't submit the post with an empty field for title, author or category!");
    }
  }

  showRightButton() {
    const pathname = this.props.history.location.pathname;
    if (pathname === stringPathEdit) {
      return (
        <button type='submit'>Edit</button>
      )
    } 
    if (pathname === stringPathNew) {
      return (
        <button type='submit' onClick={() => this.handleAdd()} >Create</button>
      )
    }
  }

  render() {
    const { handleSubmit, categories } = this.props;
    console.log(this.props.history.location.pathname);
    return (
    <form>
      <div className="form">
        <div>
          <label>Title: </label>
          <Field name="title" component="input" type="text" placeholder="Title"/>
        </div>
        <div>
          <label>Body: </label>
          <Field name="body" component="textarea" type="text" placeholder="Body"/>
        </div>
        <div>
          <label>Author: </label>
          <Field name="author" component="input" type="text" placeholder="Author"/>
        </div>
        <div>
          <label>Choose category: </label>
          <Field name="category" component="select">
            <option></option>
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </Field>
        </div>
        <div>
          {this.showRightButton()}
        </div>
      </div>
    </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    const selector = formValueSelector('MyForm')
    return {
        title: selector(state, 'title'),
        body: selector(state, 'body'),
        author: selector(state, 'author'),
        category: selector(state, 'category'),
        initialValues: null,
        categories: state.categories,
        post: state.activePost,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
       onSubmit: data => dispatch(createPost(data))
    };
};

const myReduxForm = reduxForm({
  form: 'MyForm', 
})(MyForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myReduxForm)
