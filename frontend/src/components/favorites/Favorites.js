import React from "react";
import "./Favorites.css";

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
      let notes = Object.values(this.props.notes.notes)
        .reverse()
        .filter(note => {
          return !!note.favorited;
        });

      this.setState({
        favoritedNotes: notes
      });
    }
  }

  handleOnClick = async (e, note_id) => {
    await this.props.receiveIdForSelectedNoteFromFavorites(note_id);
    this.props.history.push("/newNote");
  };

  render() {
    let { favoritedNotes } = this.state;

    let notes;
    if (favoritedNotes.length) {
      notes = favoritedNotes.map(note => {
        return (
          <tbody className="allFavoritesDiv" key={note.id}>
            <tr className="favRow">
              <td onClick={e => this.handleOnClick(e, note.id)}>
                {note.title}
              </td>
            </tr>
          </tbody>
        );
      });
    }

    return (
      <div className="favoritesMainWrapper">
        <h1 className="favTitleH1">Shorcuts</h1>
        <div className="allFavoritesDiv">
          <h3>My shortcuts list</h3>
          <table className="favsTable">
            <thead>
              <tr className="theadRow">
                <th>TITLE</th>
              </tr>
            </thead>
            {notes}
          </table>
        </div>
      </div>
    );
  }
}
