import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { createPost } from '../actions/index';

class MyForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
    <form onSubmit={handleSubmit}>
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
          <input type='submit' value='Create post' />
        </div>
      </div>
    </form>
    )
  }
}

const myReduxForm = reduxForm({
  form: 'MyForm', 
})(MyForm)
export default connect(
  state => ({
    initialValues: null
  }),
  dispatch => ({
    onSubmit: data => dispatch(createPost(data))
  })
)(myReduxForm)

