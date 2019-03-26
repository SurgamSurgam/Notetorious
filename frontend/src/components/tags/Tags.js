import React from "react";
import axios from "axios";
import { TagsDisplay } from "./TagsDisplay.js";
import { AddTagDisplay } from "./AddTagDisplay.js";
import "./Tags.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default class Tags extends React.Component {
  state = {
    newTag: { name: "" },
    editing: null,
    editUserInput: "",
    showModal: false
  };

  componentDidMount() {
    this.props.fetchTagsForCurrentUser();
    this.props.fetchTagsOfEveryone();
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = e => {
    this.setState({
      newTag: { [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
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

  handleDelete = async deleteId => {
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
        this.setState({ editUserInput: "" });
      });
  };

  render() {
    console.log(this.state);

    return (
      <div className="tagsMainWrapper">
        <div className="secondLayerDiv tagsContainer">
          <h1 className="nbTitle">Tags</h1>
          <h3 className="textOpensModal" onClick={this.handleOpenModal}>
            <i className="fas fa-book-dead textOpensModalIcon" />
            New Tag
          </h3>
          <Modal
            isOpen={this.state.showModal}
            contentLabel="Minimal Modal Example"
          >
            <button className="modalButton" onClick={this.handleCloseModal}>
              X
            </button>
            <AddTagDisplay
              newTag={this.state.newTag}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </Modal>
        </div>
        <TagsDisplay
          allTagsForEveryone={this.props.allTagsForEveryone}
          handleDelete={this.handleDelete}
          toggleEditing={this.toggleEditing}
          handleEditChange={this.handleEditChange}
          handleEditSubmit={this.handleEditSubmit}
          editing={this.state.editing}
          editUserInput={this.state.editUserInput}
          handleOpenModal={this.handleOpenModal}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
          handleTagDropdown={this.handleTagDropdown}
        />
      </div>
    );
  }
}
