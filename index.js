const { Command } = require('commander');
const program = new Command();  
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

const contactsApp = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
        const contacts = await contactsApp.listContacts();
        console.table(contacts);
      break;

    case 'get':
        const getContactById = await contactsApp.getContactById(Number(id));
        console.log(getContactById);
      break;

    case 'add':
        const newContact = await contactsApp.addContact(name, email, phone);
        console.log(newContact);
      break;

    case 'remove':
       const removedContact = await contactsApp.removeContact(Number(id));
        console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);