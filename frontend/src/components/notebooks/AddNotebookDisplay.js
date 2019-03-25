import React from "react";

export const AddNotebookDisplay = props => {
  let { newNotebook, handleChange, handleSubmit, handleCancel } = props;

  return (
    <div className="newNotebookFormDivWrapper">
      <div className="newNotebookFormDiv">
        <form className='newNotebookForm' >
          <h3>Create new notebook</h3>
          <p className='newNotebookParagraph'>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</p>
          <p><b>Name</b></p>
          <br/>
          <input
          className='newNotebookInput'
            type="text"
            name="title"
            placeholder="Notebook name"
            value={newNotebook.title}
            onChange={handleChange}
            required
          />
        </form>
        <div className='buttonsForFormsDiv'>
          <button className='CancelAddNotebookButton modalButton' onClick={handleCancel}>Cancel</button>
          {newNotebook.title ? (<button className='addNotebookButton modalButton' onClick={handleSubmit}>Create Notebook</button>) : null}
        </div>
      </div>
    </div>
  );
};
