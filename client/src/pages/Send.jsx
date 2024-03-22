import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { currentUserAtom, reciverUserDataAtom } from "../store/atom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TransferButton } from '../components/TransferButton';

export function Send() {
    const userData = useRecoilValue(reciverUserDataAtom);
    const navigate = useNavigate();
    const currentUserLoadable = useRecoilValueLoadable(currentUserAtom);
    const amountRef = useRef(0);

    async function HandleTransfer() {
        await new Promise(r => setTimeout(r, 500));
        const amount = amountRef.current.value;
        const responce = await axios.post('http://localhost:3000/api/v1/account/transfer', {
            amount: amount,
            to: userData.userid
        }, {
            headers: {
                Authorization: `Bearer ${currentUserLoadable.contents.token}`
            }
        });
        navigate('/');
    }

    function HandleClose() {
        navigate('/');
    }
    return (<>
        <div className="flex justify-center items-center h-[calc(100vh-56px)] bg-gray-200">
            <div className="flex flex-col gap-10 w-96 shadow-lg p-5 relative rounded-md bg-white">
                <div className="text-2xl font-bold text-center">Send Money</div>
                <div className="flex flex-col space-y-2">
                    <div className="flex gap-5 items-center">
                        <div className="bg-gray-300 rounded-full flex justify-center items-center text-md size-10">{userData.fullname == undefined ? '' : userData.fullname[0].toUpperCase()}</div>
                        <div className="text-lg font-bold">{userData.username}</div>
                    </div>
                    <div className="pb-2">
                        <div className="font-bold">Amount (in Rs)</div>
                        <div className=""><input ref={amountRef} className="p-1 px-2 w-full rounded border-2" type="text" name="amount" id="amount" placeholder="Enter amount" /></div>
                    </div>
                    <TransferButton HandleTransfer={HandleTransfer} />
                </div>
                <div className="p-1 absolute font-bold text-lg top-0 right-1 cursor-pointer" onClick={HandleClose}>X</div>
            </div>
        </div>
    </>)
}
