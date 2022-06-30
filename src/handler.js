const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt
  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }
  notes.push(newNote)
  const isSuccess = notes.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal'
  })
  response.code(500)
  return response
}

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
})

const editNotes = (req, h) => {
  const { id } = req.params
  const { title, tags, body } = req.payload
  const updatedAt = new Date().toISOString()

  const index = notes.findIndex(note => note.id === id)
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'data diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'data gagal diperbarui'
  })
  response.code(404)
  return response
}

const getNoteId = (req, h) => {
  const { id } = req.params
  const note = notes.filter((n) => n.id === id)[0]
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'not found'
  })
  response.code(404)
  return response
}

const deleteNoteId = (req, h) => {
  const { id } = req.params
  const idx = notes.findIndex((note) => note.id === id)
  if (idx !== -1) {
    notes.splice(idx, 1)

    const response = h.response({
      status: 'success',
      message: 'data dihapus'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail'
  })
  response.code(404)
  return response
}

module.exports = { addNoteHandler, getAllNotesHandler, editNotes, getNoteId, deleteNoteId }
