import React from "react";

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritedNotes: []
    };
  }

  async componentDidMount() {
    await this.props.fetchNotes();

    if (this.props.notes) {
      let notes = Object.values(this.props.notes.notes).filter(note => {
        return !!note.favorited;
      });

      this.setState({
        favoritedNotes: notes
      });
    }
  }

  handleOnClick = async (e,note_id) => {
    debugger;
    await this.props.receiveIdForSelectedNoteFromFavorites(note_id);
    this.props.history.push("/newNote");
  };

  render() {
    let { favoritedNotes } = this.state;

    let notes;
    if (favoritedNotes.length) {
      notes = favoritedNotes.map(note => {
        return (
          <div
            className="allFavoritesDiv"
            key={note.id}

          >
            <ul>
              <li onClick={(e)=>this.handleOnClick(e,note.id)}>
                Title <b>{note.title}</b>
              </li>
            </ul>
          </div>
        );
      });
    }

    return (
      <>
        <h1>All Favorites</h1>
        {notes}
      </>
    );
  }
}
