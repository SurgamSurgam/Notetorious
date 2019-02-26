import React from "react";
import axios from "axios";
import { TagsDisplay } from "./TagsDisplay.js";
import { AddTagDisplay } from "./AddTagDisplay.js";

export default class Tags extends React.Component {
  state = {
    newTag: { name: "" }
  };

  componentDidMount() {
    this.props.fetchTags();
  }

  handleChange = e => {
    this.setState({
      newTag: { [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/api/tags", this.state.newTag)
      .then(() => {
        this.setState({
          newTag: { name: "" }
        });
      })
      .then(() => {
        this.props.fetchTags();
      });
  };

  render() {
    console.log(this.state);
    let tags;

    if (this.props.tags) {
      tags = Object.values(this.props.tags).map(tag => {
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
        <TagsDisplay tags={tags} />
        <AddTagDisplay
          newTag={this.state.newTag}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </>
    );
  }
}
