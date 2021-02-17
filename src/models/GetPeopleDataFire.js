import firebase from "firebase";

const GetPeopleDataFire = (account, peopleData, setPeopleData, setPeopleAddFlg) => {
    let db = firebase.database();
    let ref = db.ref("/icecream_friends").child(account.uid);

    ref
    .orderByKey()
    .on("value", (snapshot) => {
        setPeopleAddFlg(false);
        snapshot.forEach((snaphot) => {
            db.ref('/users').child(snaphot.val().uuid).once('value', (userSnap) => {
                setPeopleData(peopleData => [...peopleData, userSnap.val()]);
            });
        });
    });
}

export default GetPeopleDataFire;