import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { editPost } from '../actions/index';

class EditForm extends Component {
  state = {
      disabled: false,
  }

  componentDidMount(){
    if (this.props.post) {
        const { initialize} = this.props;
        const obj = {
          'title' : this.props.post.title,
          'category': this.props.post.category,
          'body': this.props.post.body,
          'author': this.props.post.author,
          'commentCount': this.props.post.commentCount,
          'deleted': this.props.post.deleted,
          'id': this.props.post.id,
          'timestamp': this.props.post.timestamp,
          'voteScore': this.props.post.voteScore,
        }
        initialize(obj)
        this.setState({
            disabled: true
        })
    } else {
      this.setState({
          disabled: false
      })
    }
  }

  handleEdit() {
    if (this.props.title && this.props.body) {
      this.props.handleSubmit();
      return this.props.history.push("/");
    } else {
      alert("You can't submit the post with an empty field for title or body!");
    }
  }

  render() {
    const { categories, post } = this.props;
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
          <Field name="author" component="input" type="text" placeholder="Author" disabled={this.state.disabled}/>
        </div>
        <div>
          <label>Choose category: </label>
          <Field name="category" component="select" disabled={this.state.disabled}>
            <option></option>
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </Field>
        </div>
        <div>
          <button type='submit' onClick={() => this.handleEdit()}>Edit</button>
        </div>
      </div>
    </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    const selector = formValueSelector('EditForm')
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
      onSubmit: data => dispatch(editPost(data)),
  }
};

const myReduxForm = reduxForm({
  form: 'EditForm', 
})(EditForm)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myReduxForm)
