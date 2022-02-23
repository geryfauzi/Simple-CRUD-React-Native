import Realm from 'realm';

class User extends Realm.Object {}
class Notes extends Realm.Object {}

User.schema = {
  name: 'User',
  properties: {
    email: 'string',
    name: 'string',
    password: 'string',
  },
  primaryKey: 'email',
};

Notes.schema = {
  name: 'Notes',
  properties: {
    id: 'string',
    title: 'string',
    content: 'string',
    date: 'string',
    userEmail: 'string',
  },
};

export default new Realm({schema: [User, Notes]});
