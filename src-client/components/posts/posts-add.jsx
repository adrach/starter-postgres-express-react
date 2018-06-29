import React from 'react';
import PropTypes from 'prop-types';

import API from '../../api/api';

class PostAdd extends React.Component {
  constructor(props) {
    const obj1 = { title: '', author: '', content: '' };

    super(props);
    this.state = { post: obj1, editMode: false };
    this.handleAddPost = this.handleAddPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateAction = this.updateAction.bind(this);
  }

  updateAction(post) {
    if (post) {
      this.setState({ post, editMode: true });
    } else {
      this.setState({ post: { title: '', author: '', content: '' }, editMode: false });
    }
  }

  handleAddPost(event) {
    event.preventDefault();
    const { editMode, post } = this.state;
    const { refreshTable } = this.props;
    if (!post) return;
    if (editMode) {
      API.put(`/api/posts/${post.id}`, post)
        .then((res) => {
          refreshTable();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      API.post('api/posts', post)
        .then((res) => {
          refreshTable();
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleChange(event) {
    const { post } = this.state;
    post[event.target.id] = event.target.value;
    this.setState({ post });
  }

  render() {
    const { editMode, post } = this.state;
    return (
      <div className="card text-left mb-3">
        <div className="card-body">
          <form onSubmit={this.handleAddPost}>
            <div className="form-group">
              <label htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="title"
                placeholder="Enter title"
                onChange={this.handleChange}
                value={post.title}
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">
                Author
              </label>
              <input type="text" className="form-control" id="author" placeholder="author" onChange={this.handleChange} value={post.author} />
            </div>

            <div className="form-group">
              <label htmlFor="content">
                Content
              </label>
              <textarea className="form-control" id="content" placeholder="content" onChange={this.handleChange} value={post.content} />
            </div>

            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-primary">
                {editMode ? 'Edit' : 'Add'}
              </button>
              {editMode
                    && (
                    <button type="button" className="btn btn-warning" onClick={() => this.updateAction()}>
                      Close
                    </button>
                    )
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

PostAdd.propTypes = {
  refreshTable: PropTypes.func.isRequired
};
export default PostAdd;
