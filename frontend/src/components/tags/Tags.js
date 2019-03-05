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

  render() {
    console.log(this.state);
    let tagsFromEveryone;

    if (this.props.allTagsForEveryone) {
      tagsFromEveryone = Object.values(this.props.allTagsForEveryone).reverse().map(tag => {
        return (
          <div className="allTagsDiv" key={tag.id}>
            <p>
              Id: {tag.id} Name: {tag.name}
            </p>
          </div>
        );
      });
    }

    return (
      <>
        <h1>All Tags</h1>
        <TagsDisplay tagsFromEveryone={tagsFromEveryone} />
        <AddTagDisplay
          newTag={this.state.newTag}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
