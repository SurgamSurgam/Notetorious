import React from "react";
import axios from "axios";
import { TagsDisplay } from "./TagsDisplay.js";
import { AddTagDisplay } from "./AddTagDisplay.js";

export default class Tags extends React.Component {
  state = {
    newTag: { name: "" },
    editing: null,
    editUserInput: ""
  };

  componentDidMount() {
    this.props.fetchTagsForCurrentUser();
    this.props.fetchTagsOfEveryone();
  }

  handleChange = e => {
    this.setState({
      newTag: { [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // router.post("/user/note/:note_id", loginRequired, addTag);
    axios
      .post(`/api/tags/`, this.state.newTag) //add note_id
      .then(() => {
        this.setState({
          newTag: { name: "" }
        });
      })
      .then(() => {
        this.props.fetchTagsForCurrentUser();
        this.props.fetchTagsOfEveryone();
      });
  };

  handleDelete = async (e, deleteId) => {
    let tag = Object.values(this.props.allTagsForEveryone).find(
      tag => tag.id === deleteId
    );

    await axios.delete(`/api/tags/${tag.id}`);
    this.props.fetchTagsForCurrentUser();
    this.props.fetchTagsOfEveryone();
  };

  // edit title stuff
  toggleEditing = id => {
    if (this.state.editing !== id) {
      this.setState({
        editing: id
      });
    } else {
      this.setState({
        editing: null
      });
    }
  };

  handleEditChange = e => {
    this.setState({
      editUserInput: e.target.value
    });
  };

  handleEditSubmit = (e, tag_id) => {
    e.preventDefault();
    axios
      .patch(`/api/tags/${tag_id}`, { name: this.state.editUserInput })
      .then(() => {
        this.props.fetchTagsForCurrentUser();
        this.props.fetchTagsOfEveryone();
        this.toggleEditing(null);
        this.setState({editUserInput: ''})
      });
  };

  render() {
    console.log(this.state);

    return (
      <>
        <h1>All Tags</h1>
        <AddTagDisplay
          newTag={this.state.newTag}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <TagsDisplay
          allTagsForEveryone={this.props.allTagsForEveryone}
          handleDelete={this.handleDelete}
          toggleEditing={this.toggleEditing}
          handleEditChange={this.handleEditChange}
          handleEditSubmit={this.handleEditSubmit}
          editing={this.state.editing}
          editUserInput={this.state.editUserInput}
        />
      </>
    );
  }
}
