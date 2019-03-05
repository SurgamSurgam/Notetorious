import React from "react";
import axios from "axios";
import { TagsDisplay } from "./TagsDisplay.js";
import { AddTagDisplay } from "./AddTagDisplay.js";

export default class Tags extends React.Component {
  state = {
    newTag: { name: "" }
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

  render() {
    console.log(this.state);
    let tagsFromEveryone;

    if (this.props.allTagsForEveryone) {
      tagsFromEveryone = Object.values(this.props.allTagsForEveryone)
        .reverse()
        .map(tag => {
          return (
            <div className="allTagsDiv" key={tag.id}>
              <p>
                Id: {tag.id} Name: <b>{tag.name}</b>{" "}
                <button onClick={e => this.handleDelete(e, tag.id)}>
                  Delete tag
                </button>
              </p>
            </div>
          );
        });
    }

    return (
      <>
        <h1>All Tags</h1>
        <AddTagDisplay
          newTag={this.state.newTag}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <TagsDisplay tagsFromEveryone={tagsFromEveryone} />
      </>
    );
  }
}
