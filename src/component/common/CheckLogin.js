import { useHistory } from "react-router-dom";

const CheckLogin = (account) => {
    let history = useHistory();

    if (account == null || account.auth !== true) {
        history.push("/");
    }
}

export default CheckLogin;