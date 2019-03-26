import React from "react";
// import Modal from "react-modal";
// import Select from "react-select";

// Modal.setAppElement("#root");

export class TagsDisplay extends React.Component
// = ({
//   allTagsForEveryone,
//   handleDelete,
//   toggleEditing,
//   handleEditChange,
//   handleEditSubmit,
//   editing,
//   editUserInput,
//   showModal,
//   handleOpenModal,
//   handleCloseModal,
//   handleTagDropdown
// }) =>

{
  state = { showModal: false };

  handleOpenModal = async () => {
    await this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleTagDropdown = value => {
    if (+value) {
      this.handleOpenModal();
    }
  };

  render() {
    // const options = [
    //   { value: "0", label: "" },
    //   { value: "1", label: "Edit/Delete tag " }
    // ];

    let tagsFromEveryone;
    if (!!this.props.allTagsForEveryone) {
      tagsFromEveryone = Object.values(this.props.allTagsForEveryone)
        .reverse()
        .map(tag => {
          if (tag.id === this.props.editing) {
            return (
              <div className="allTagsDivWrapper" key={tag.id}>
                {/*<Modal
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                >
                  <button
                    className="modalButton"
                    onClick={this.handleCloseModal}
                  >
                    X
                  </button>*/}
                <div className="allTagsDiv">
                  <form
                    onSubmit={e => {
                      this.props.handleEditSubmit(e, tag.id);
                    }}
                  >
                    <input
                      className="editTagInput"
                      type="text"
                      onChange={this.props.handleEditChange}
                      value={this.props.editUserInput}
                      placeholder={tag.name}
                    />{" "}
                    <button
                      className="tagCancelButton"
                      onClick={() => {
                        this.props.toggleEditing(tag.id);
                      }}
                    >
                      Cancel
                    </button>{" "}
                    <button type="submit">Submit Edit</button>
                  </form>
                </div>
                {/*</Modal>*/}
              </div>
            );
          } else {
            return (
              <div className="allTagsDivWrapper" key={tag.id}>
                <h3 className="tagsTextOpensModal">{tag.name}</h3>
                {/*<Select
                  onChange={e => {
                    this.handleTagDropdown(e.value);
                  }}
                  options={options}
                  placeholder={""}
                  closeMenuOnSelect={true}
                  isOptionSelected={options => false}
                  isFocused={false}
                />*/}
                {/*<Modal
                  isOpen={this.state.showModal}
                  contentLabel="Minimal Modal Example"
                >
                  <button
                    className="modalButton"
                    onClick={this.handleCloseModal}
                  >
                    X
                  </button>*/}
                {/*<h3>{tag.name}</h3>*/}
                <div className="deleteEditButtons" key={tag.id}>
                  <button
                    className="tagDeleteButtonDiv"
                    onClick={e => {
                      this.props.handleDelete(e, tag.id);
                    }}
                  >
                    Delete tag
                  </button>
                  <button
                    onClick={() => {
                      this.props.toggleEditing(tag.id);
                    }}
                  >
                    Edit tag name
                  </button>
                </div>
                {/*</Modal>*/}
              </div>
            );
          }
        });
    }

    return (
      <div className="tagsWrapper">
        <ul>{tagsFromEveryone}</ul>
      </div>
    );
  }
}
