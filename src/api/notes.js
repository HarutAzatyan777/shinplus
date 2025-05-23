import axios from 'axios';

// Notes API-ի բազային հասցեն ըստ միջավայրի
const NOTES_BASE =
  process.env.NODE_ENV === 'production'
    ? 'https://shinplusserv-production.up.railway.app/api/notes'
    : 'http://localhost:5000/api/notes';

// Axios instance
const notesAPI = axios.create({
  baseURL: NOTES_BASE,
});

// Token interceptor
notesAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Բոլոր նոտերը ստանալը
export const fetchNotesAPI = () => notesAPI.get('/');

// Նոր նոտա ստեղծելը (note: սովորական օբյեկտ չէ, կարող է լինել FormData)
export const createNoteAPI = (note) => {
  // եթե note-ում կա ֆայլ, ապա note պետք է լինի FormData
  if (note instanceof FormData) {
    return notesAPI.post('/', note, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  return notesAPI.post('/', note);
};

// Նոտա թարմացնելը (id և FormData կամ սովորական օբյեկտ)
export const updateNoteAPI = (id, updatedNote) => {
  if (updatedNote instanceof FormData) {
    return notesAPI.put(`/${id}`, updatedNote, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  return notesAPI.put(`/${id}`, updatedNote);
};

// Նոտա ջնջելը
export const deleteNoteAPI = (id) => notesAPI.delete(`/${id}`);
