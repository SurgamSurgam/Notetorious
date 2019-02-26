import React from "react";

export const AddNotebookDisplay = props => {
  let { newNotebook, handleChange, handleSubmit } = props;

  return (
    <div className="newNotebookFormDiv">
      <form onSubmit={handleSubmit}>
        <h3>Create new notebook</h3>
        <p>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</p>
        <p><b>Name</b></p>
        <br/>
        <input
          type="text"
          name="title"
          placeholder="Notebook name"
          value={newNotebook.title}
          onChange={handleChange}
          required
        />
        <br />
        <button className='CancelAddNotebookButton' type='reset'>Cancel</button>
        <button className='addNotebookButton' type='submit'>Continue</button>
      </form>
    </div>
  );
};
