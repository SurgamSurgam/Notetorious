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
        return (!!note.favorited)
      })

      this.setState({
        favoritedNotes: notes
      })
    }
  }

  render() {
    let { favoritedNotes } = this.state;

    let notes;
    if (favoritedNotes.length) {
      notes = favoritedNotes.map(note => {
        return (
          <div className="allFavoritesDiv" key={note.id}>
            <p>
              <b>Title</b> {note.title}
            </p>
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
