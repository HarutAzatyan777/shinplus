import React, { useEffect, useState } from 'react';
import NotesList from '../components/NotesList';
import '../styles/Notes.css';

import {
  fetchNotesAPI,
  createNoteAPI,
  updateNoteAPI,
  deleteNoteAPI,
} from '../api/notes';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    _id: null,
    font: 'Arial',
    textColor: '#000000',
    backgroundColor: '#ffffff',
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await fetchNotesAPI();
      setNotes(data);
    } catch (err) {
      console.error(err.response?.data?.message || 'Սխալ նոտաների բեռնման ժամանակ');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await updateNoteAPI(form._id, form);
      } else {
        await createNoteAPI(form);
      }
      setForm({
        title: '',
        content: '',
        _id: null,
        font: 'Arial',
        textColor: '#000000',
        backgroundColor: '#ffffff',
      });
      fetchNotes();
    } catch (err) {
      console.error(err.response?.data?.message || 'Սխալ նոտայի պահպանման ժամանակ');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNoteAPI(id);
      fetchNotes();
    } catch (err) {
      console.error(err.response?.data?.message || 'Սխալ նոտայի ջնջման ժամանակ');
    }
  };

  const handleEdit = (note) => {
    setForm(note);
  };

  return (
    <div className="notes-container">
      <h2>My Notes</h2>
      <form onSubmit={handleSubmit} className="notes-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <label>
          Font:
          <select
            value={form.font}
            onChange={(e) => setForm({ ...form, font: e.target.value })}
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </label>

        <label>
          Text Color:
          <input
            type="color"
            value={form.textColor}
            onChange={(e) => setForm({ ...form, textColor: e.target.value })}
          />
        </label>

        <label>
          Background Color:
          <input
            type="color"
            value={form.backgroundColor}
            onChange={(e) => setForm({ ...form, backgroundColor: e.target.value })}
          />
        </label>

        <button type="submit">
          {form._id ? 'Update Note' : 'Create Note'}
        </button>
      </form>

      <NotesList notes={notes} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default Notes;
