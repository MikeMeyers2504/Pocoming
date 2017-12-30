import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { editComment } from '../actions/index';
import { time } from '../actions/extra';

class EditComment extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    if (this.props.comment) {
        const { initialize} = this.props;
        const obj = {
          'body': this.props.comment.body,
          'author': this.props.comment.author,
        }
        initialize(obj)
    }else{
        alert("Something has gone wrong, go back!");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.body && this.props.author) {
      this.props.onSubmit({
          body: this.props.body,
          author: this.props.author,
          parentDeleted: this.props.comment.parentDeleted,
          parentId: this.props.comment.parentId,
          deleted: this.props.comment.deleted,
          id: this.props.comment.id,
          timestamp: time(),
          voteScore: this.props.comment.voteScore
        })
      return this.props.history.push("/");
    }else {
      alert("You can't submit the comment with an empty field for body or author!");
    } 
  }

  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <div className="form">
        <div>
          <label>Body: </label>
          <Field name="body" component="textarea" type="text" placeholder="Body"/>
        </div>
        <div>
          <label>Author: </label>
          <Field name="author" component="input" type="text" placeholder="Author"/>
        </div> 
        <div>
          <button type='submit'>Edit</button>
        </div>
      </div>
    </form>
    )
  }
}

const mapStateToProps = (state) => {
    const selector = formValueSelector('EditComment')
    return {
        body: selector(state, 'body'),
        author: selector(state, 'author'),
        initialValues: null,
        comment: state.activeComment,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onSubmit: (data) => {dispatch(editComment(data))}
  };
};

const myReduxForm = reduxForm({
  form: 'EditComment', 
})(EditComment)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myReduxForm)
