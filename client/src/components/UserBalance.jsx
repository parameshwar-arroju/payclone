import { useState, useEffect } from "react";
import axios from "axios";
import { currentUserAtom } from "../store/atom";
import { useRecoilValueLoadable } from "recoil";

export function UserBalance() {
    const [balance, setBalance] = useState(0);
    const currentUserLoadable = useRecoilValueLoadable(currentUserAtom);
    useEffect(() => {
        (async () => {
            const balanceRes = await axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    Authorization: `Bearer ${currentUserLoadable.contents.token}`
                }
            });
            setBalance(balanceRes.data.balance);
        })()
    }, [])
    return (<>
        <div className="text-xl font-semibold mb-3">Your Balance : &#8377;{balance.toFixed(2)}</div>
    </>)
}