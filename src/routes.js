const { addNoteHandler, getAllNotesHandler, editNotes, getNoteId, deleteNoteId } = require('./handler')

const routes = [{
  method: 'POST',
  path: '/notes',
  handler: addNoteHandler
},
{
  method: 'GET',
  path: '/notes',
  handler: getAllNotesHandler
},
{
  method: 'PUT',
  path: '/notes/{id}',
  handler: editNotes
},
{
  method: 'GET',
  path: '/notes/{id}',
  handler: getNoteId
},
{
  method: 'DELETE',
  path: '/notes/{id}',
  handler: deleteNoteId
}
]

module.exports = routes
