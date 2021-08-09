const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;

  } catch (error) {
    throw error;
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error(`Contact with id=${contactId} is not found`);
      
    }
    return contact;
  } catch (error) {
    throw error;
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);

    if (index === -1) {
      throw new Error(`Contact with id=${contactId} is not found`);
    }

    const newContacts = contacts.filter(contact => contact.id !== contactId);

    const contactsToString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactsToString);

    return contacts[index];
  } catch (error) {
    throw error;
  }
}

const addContact = async (name, email, phone) => {
  const newContact = { id: v4(), name, email, phone };
    try {
      const contacts = await listContacts();
      const newContacts = JSON.stringify([...contacts, newContact]);
     
      await fs.writeFile(contactsPath, newContacts);
      
      return newContacts;
    }
    catch(error){
        throw error;
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
