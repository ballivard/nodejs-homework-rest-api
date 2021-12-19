import fs from 'fs/promises'
import path, { dirname } from 'path'
import {randomUUID} from 'crypto'
import contacts from './contacts.json'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const listContacts = async () => {
  return contacts
}
  
const getContactById = async (contactId) => {
  const [result] = contacts.filter((contact) => contact.id === contactId)
  return result
}
  
const removeContact = async (contactId) => {
  const contactIndex = await contacts.findIndex(
    (contact) => contact.id === contactId);
  if (contactIndex > -1) {
    const removedContact = await contacts.splice(contactIndex, 1);
    await fs.writeFile(path.join( __dirname, 'contacts.json'), JSON.stringify(contacts));
    return removedContact;
  }
}

  
const addContact = async ({name, email, phone}) => {
  const newContact = { name, email, phone, id: randomUUID() }
  contacts.push(newContact)
  await fs.writeFile(path.join( __dirname, 'contacts.json'), JSON.stringify(contacts, null, 2),
  )
  return newContact
}

const updateContact = async (contactId, body) => {
  const contactIndex = await contacts.findIndex(
    (contact) => contact.id === contactId);
  if (contactIndex > -1) {
    const updatedContact = { id: contactId, ...contacts[contactIndex], ...body };
    contacts[contactIndex] = updatedContact
    await fs.writeFile(path.join( __dirname, 'contacts.json'), JSON.stringify(contacts));
    return updatedContact;
  }
  return null
}

  export default { listContacts, getContactById, removeContact, addContact, updateContact }