import { Suspense, useEffect, useState } from 'react';
import { currentUserAtom } from '../store/atom';
import axios from 'axios';
import { useRecoilValueLoadable } from 'recoil';

export function User() {
    const currentUserLoadable = useRecoilValueLoadable(currentUserAtom);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (currentUserLoadable.state === 'hasValue') {
            (async () => {
                try {
                    const response = await axios.get("http://localhost:3000/api/v1/user/profile", {
                        headers: {
                            Authorization: `Bearer ${currentUserLoadable.contents.token}`
                        }
                    });
                    const userInfo = response.data.user;
                    setUser(userInfo);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            })();
        }
    }, [currentUserLoadable]);

    return (
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                {user && (
                    <div className="">
                        <div className="">User</div>
                        <div className="">Fullname: <input type="text" name="fullname" id="fullname" defaultValue={user.fullname} /></div>
                        <div className="">Username: <input type="text" name="username" id="username" defaultValue={user.username} /></div>
                        <div className="">Password: <input type="password" name="password" id="password" defaultValue={user.password} /> </div>
                    </div>
                )}
            </Suspense>
        </div>
    );
}
