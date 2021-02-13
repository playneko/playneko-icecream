import React from 'react';
import { useEffect } from 'react';

const MileCounter = (account, setAccount, setUpdate) => {
    const [count, setCount] = React.useState(600);

    useEffect(() => {
        let id = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        return () => clearInterval(id);
    });

    if (account != null && account.auth === true && count != null && count < 1) {
        setUpdate(true);
        setAccount({
            ...account,
            mile: account.mile != null && account.mile ? account.mile + 1 : 1
        });
    }

    count < 1 && setCount(600);
}

export default MileCounter;