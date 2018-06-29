import React, { Component } from 'react';

import PostAdd from './posts-add';
import PostTable from './posts-table';

export default class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.sendToEdit = this.sendToEdit.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.postAddForm = React.createRef();
    this.postTable = React.createRef();
  }

  sendToEdit(post) {
    this.postAddForm.current.updateAction(post);
  }

  refreshTable(post) {
    this.postTable.current.fetchPosts(post);
  }

  render() {
    return (
      <div className="col">
        <PostAdd ref={this.postAddForm} refreshTable={this.refreshTable} />
        <PostTable sendToEdit={this.sendToEdit} ref={this.postTable} />
      </div>
    );
  }
}
