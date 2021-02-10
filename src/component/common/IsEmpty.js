const IsEmpty = (str) => {
    if (str === null || str === false || str === "" || typeof str === "undefined" || Object(str).length === 0) {
        return true;
    }
    return false;
}

export default IsEmpty;