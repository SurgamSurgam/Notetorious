import React from "react";

export const AddNotebookDisplay = props => {
  let { newNotebook, handleChange, handleSubmit, handleCancel } = props;

  return (
    <div className="newNotebookFormDiv">
      <form  >
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
      </form>
      <button className='CancelAddNotebookButton' onClick={handleCancel}>Cancel</button>
      {newNotebook.title ? (<button className='addNotebookButton' onClick={handleSubmit}>Create Notebook</button>) : null}
    </div>
  );
};
