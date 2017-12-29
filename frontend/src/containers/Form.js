import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { createPost } from '../actions/index';

class MyForm extends Component {
  handleAdd() {
    if (this.props.title && this.props.author && this.props.category) {
      this.props.handleSubmit();
      return this.props.history.push("/");
    } else {
      alert("You can't submit the post with an empty field for title, author or category!");
    }
  }

  render() {
    const { handleSubmit, categories } = this.props;
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
          <button type='submit' onClick={() => this.handleAdd()} >Create</button>
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
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onSubmit: (data) => dispatch(createPost(data)),
  };
};

const myReduxForm = reduxForm({
  form: 'MyForm', 
})(MyForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myReduxForm)
