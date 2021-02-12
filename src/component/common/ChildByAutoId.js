import firebase from "firebase";

const ChildByAutoId = (ref, id) => {
    let db = firebase.database();
    const childByAutoId = db.ref(ref).child(id).push();
    return childByAutoId.key;
}

export default ChildByAutoId;