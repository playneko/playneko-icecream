import firebase from "firebase";

const UpdateUserInfoFire = (account, setUpdate) => {
    let db = firebase.database();
    let ref = db.ref("/users").child(account.uid);
    ref.set(account);
    setUpdate(false);
}

export default UpdateUserInfoFire;