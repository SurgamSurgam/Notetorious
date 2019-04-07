import React from "react";
import ReactQuill from "react-quill";
import Modal from "react-modal";
import Select from "react-select";
import { connect } from "react-redux";

Modal.setAppElement("#root");

const mapStateToProps = state => {
  return {
    savedSearchResults: state.notebooks.savedSearchResults
  };
};

class SingleNoteDisplay extends React.Component {
  state = {
    isSearchedModeOn: false,
    searchedResultsObj: { title: "", body: "" }
  };

  componentDidMount() {
    if (this.props.savedSearchResults.length) {
      this.setState({
        title: this.props.savedSearchResults[0].title,
        body: this.props.savedSearchResults[0].body
      });
    }
  }

  handleQueryResultsChange = async e => {
    await this.setState({
      searchedResultsObj: { ...this.state.searchedResultsObj, body: e }
    });
    this.props.checkDiscrepancyCurrentObjVsEditedObj();
  };

  handleQueryResultsChangeTitle = async e => {
    await this.setState({
      searchedResultsObj: {
        ...this.state.searchedResultsObj,
        title: e.target.value
      }
    });

    this.props.checkDiscrepancyCurrentObjVsEditedObj();
  };

  render() {
    let noteInfo = (
      <ul className="noteInfoUl">
        <li>Title: {this.props.currentNoteObj.title}</li>
        <li>Created at: {this.props.currentNoteObj.created_at}</li>
        <li>Updated at: {this.props.currentNoteObj.updated_at}</li>
        <li>Notebook Id: {this.props.currentNoteObj.notebook_id}</li>
        <li>Author Id: {this.props.currentNoteObj.author_id}</li>
        <li>Favorited: {String(this.props.currentNoteObj.favorited)}</li>
      </ul>
    );

    const options = [
      { value: "", label: "" },
      { value: "delete", label: "Delete note" },
      {
        value: "favorites",
        label: this.props.currentNoteObj.favorited
          ? "Remove shortcut"
          : "Add shortcut"
      },
      { value: "noteInfo", label: "Note info..." }
    ];

    if (
      this.props.savedSearchResults.title &&
      this.props.savedSearchResults.body
    ) {
      
      return (
        <div className="SingleNoteDisplayDiv">
          <div className="everythingAboveEditor">
            <input
              className="singleNoteInputTitleDiv"
              type="text"
              name="title"
              placeholder="Title"
              value={this.props.savedSearchResults.title}
              onChange={this.props.handleQueryResultsChangeTitle}
              required
            />
            {/*<div className="menuAboveEditor">
              <Select
                onChange={e => {
                  this.props.handleSelectDropdownChange(e, "deselect-option");
                }}
                options={options}
                placeholder={""}
                closeMenuOnSelect={true}
                isOptionSelected={options => false}
                isFocused={false}
              />

              <Modal
                isOpen={this.props.showModal}
                contentLabel="Minimal Modal Example"
              >
                <button onClick={this.props.handleCloseModal}>
                  Close Modal
                </button>
                <div>{this.props.toggleViewNoteInfo ? noteInfo : null} </div>
              </Modal>
            </div>*/}
          </div>
          {/*Title and Editor Below*/}
          <ReactQuill
            value={this.props.savedSearchResults.body}
            onChange={this.props.handleQueryResultsChange}
            placeholder="Start writing/editing"
            modules={{ toolbar: this.props.toolbarOptions }}
            theme="snow"
          />
          {this.props.discrepancyBtwnCurrentAndEdited ? (
            <div className="submitEditDiv">
              <button onClick={this.props.handleEditCancel}>Cancel</button>
              <button onClick={this.props.handleEditSubmit}>Submit Edit</button>
              <br />
              <br />
            </div>
          ) : null}
        </div>
      );
    } else if (!!this.props.currentNoteObj) {
      return (
        <div className="SingleNoteDisplayDiv">
          <div className="everythingAboveEditor">
            <input
              className="singleNoteInputTitleDiv"
              type="text"
              name="title"
              placeholder="Title"
              value={this.props.currentNoteObj.title}
              onChange={this.props.handleChangeTitle}
              required
            />
            <div className="menuAboveEditor">
              <Select
                onChange={e => {
                  this.props.handleSelectDropdownChange(e, "deselect-option");
                }}
                options={options}
                placeholder={""}
                closeMenuOnSelect={true}
                isOptionSelected={options => false}
                isFocused={false}
              />

              <Modal
                isOpen={this.props.showModal}
                contentLabel="Minimal Modal Example"
              >
                <button onClick={this.props.handleCloseModal}>
                  Close Modal
                </button>
                <div>{this.props.toggleViewNoteInfo ? noteInfo : null} </div>
              </Modal>
            </div>
          </div>
          {/*Title and Editor Below*/}
          <ReactQuill
            value={this.props.currentNoteObj.body}
            onChange={this.props.handleChange}
            placeholder="Start writing/editing"
            modules={{ toolbar: this.props.toolbarOptions }}
            theme="snow"
          />
          {this.props.discrepancyBtwnCurrentAndEdited ? (
            <div className="submitEditDiv">
              <button onClick={this.props.handleEditCancel}>Cancel</button>
              <button onClick={this.props.handleEditSubmit}>Submit Edit</button>
              <br />
              <br />
            </div>
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  null
)(SingleNoteDisplay);
