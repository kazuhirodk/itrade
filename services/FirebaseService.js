import {firebaseDatabase} from '../firebase'
import firebase from 'react-native-firebase';
export default class FirebaseService {
  //nodepath: caminho do banco do de dados
  static getDataList = (nodePath, callback, size = 10) => {

  let query = firebaseDatabase.ref(nodePath)
                              .limitToLast(size);
  query.on('value', dataSnapshot => {
    let items = [];
    dataSnapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item['key'] = childSnapshot.key;
      items.push(item);
    });
    callback(items);
  });

  return query;
  };
  /**
   * Returns a `Reference` representing the location in the Database
   * corresponding to the provided path. If no path is provided, the `Reference`
   * will point to the root of the Database.
   *
   * @example
   * ```javascript
   * // Get a reference to the root of the Database
   * var rootRef = firebase.database().ref();
   * ```
   *
   * @example
   * ```javascript
   * // Get a reference to the /users/ada node
   * var adaRef = firebase.database().ref("users/ada");
   * // The above is shorthand for the following operations:
   * //var rootRef = firebase.database().ref();
   * //var adaRef = rootRef.child("users/ada");
   * ```
   *
   * @param path Optional path representing the location the returned
   *   `Reference` will point. If not provided, the returned `Reference` will
   *   point to the root of the Database.
   * @return If a path is provided, a `Reference`
   *   pointing to the provided path. Otherwise, a `Reference` pointing to the
   *   root of the Database.
   */
  static pushData = (node, objToSubmit) => {
    const ref = firebaseDatabase.ref(node).push();
    const id = firebaseDatabase.ref(node).push().key;
    ref.set(objToSubmit);
    return id;
  };

  static updateData = (node, objToSubmit) => {
    const ref = firebaseDatabase.ref(node).update(
      objToSubmit
    )
    .catch(function (err) {
      console.log("one of these updates failed", err);
    });
  };

  static createProduct = (value) => {
    return this.db.collection('produtos').add({
      name: value.name,
      description: value.description,
      price: value.price,
      owner_email: value.owner_email
    })
  }

  static getCurrentUser = async() =>  {
    let user = await firebase.auth().onAuthStateChanged(userLogged => {
      const list = this.getDataList('usuarios', function(){});
      list.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        // alert(snapshot.val().nome_usuario)
        return snapshot.val()
      });
    })
    // alert(user.email)
    //return user
  };
}
