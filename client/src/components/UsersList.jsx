import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { currentUserAtom, reciverUserDataAtom, usersAtom } from "../store/atom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function UsersList() {
    const setUserData = useSetRecoilState(reciverUserDataAtom);
    const [usersList, setUsersList] = useRecoilState(usersAtom);
    const currentUserLoadable = useRecoilValueLoadable(currentUserAtom);
    const navigate = useNavigate();
    const filterRef = useRef('');
    const [filter, setFilter] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const responce = await axios.get('http://localhost:3000/api/v1/user/bulk?filter=' + filter, {
                headers: {
                    Authorization: `Bearer ${currentUserLoadable.contents.token}`
                }
            });
            setUsersList(responce.data.users);
        };
        fetchData();
    }, [filter]);

    function HandleFilterChange(e) {
        if (filterRef.current) clearTimeout(filterRef.current);
        filterRef.current = setTimeout(() => {
            setFilter(e.target.value);
        }, 500);
    }
    return (<>
        <div className="space-y-3">
            <div className="text-lg font-semibold">Users</div>
            <div className=""><input onChange={HandleFilterChange} className="border-2 w-full px-3 h-10" type="text" name="filter" id="filter" placeholder="Search users..." /></div>
            <div className="space-y-3 pt-5">
                {usersList.map((user) => {
                    return (
                        <div className="flex justify-between items-center" key={user.userid}>
                            <div className="flex gap-5 items-center">
                                <div className="bg-gray-300 rounded-full flex justify-center items-center text-md h-8 w-8">{user.fullname[0].toUpperCase()}</div>
                                <div className="flex flex-col">
                                    <div className="text-md font-bold">{user.fullname}</div>
                                    <div className="text-xs font-extralight">@{user.username}</div>
                                </div>
                            </div>
                            <div className="bg-slate-800 hover:bg-slate-950 text-white rounded-md py-2 px-3 cursor-pointer" onClick={() => {
                                setUserData(user);
                                navigate('/send');
                            }}> Send Money</div>
                        </div>
                    )
                })}
            </div>
        </div>
    </>)
}