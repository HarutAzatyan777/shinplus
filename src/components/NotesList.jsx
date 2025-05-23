import React from 'react';

const NotesList = ({ notes, onDelete, onEdit }) => {
  return (
    <div>
      {notes.map(note => (
        <div
          key={note._id}
          style={{
            border: '1px solid #ccc',
            margin: '10px 0',
            padding: '10px',
            backgroundColor: note.backgroundColor || '#ffffff',
            color: note.textColor || '#000000',
            fontFamily: note.font || 'Arial',
            borderRadius: '8px',
          }}
        >
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          {note.drawing && (
            <img
              src={note.drawing}
              alt="Note Drawing"
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'contain',
                marginTop: '10px',
                borderRadius: '4px',
              }}
            />
          )}

          <div style={{ marginTop: '10px' }}>
            <button
              onClick={() => onEdit(note)}
              style={{
                marginRight: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note._id)}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
