import { Suspense, useEffect, useState } from 'react';
import { currentUserAtom } from '../store/atom';
import axios from 'axios';
import { useRecoilValueLoadable } from 'recoil';

export function User() {
    const currentUserLoadable = useRecoilValueLoadable(currentUserAtom);
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile'); // Add state for active tab

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

    // Function to handle tab click
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                {user && (
                    <div className="px-20 py-5">
                        <div className="mb-4 border-b ">
                            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                                <li className="me-2" role="presentation">
                                    <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'profile' ? 'border-black' : ''}`} onClick={() => handleTabClick('profile')} type="button" role="tab" aria-controls="profile" aria-selected={activeTab === 'profile'}>General</button>
                                </li>
                                <li className="me-2" role="presentation">
                                    <button className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'dashboard' ? 'border-black' : ''}`} onClick={() => handleTabClick('dashboard')} type="button" role="tab" aria-controls="dashboard" aria-selected={activeTab === 'dashboard'}>Security</button>
                                </li>
                            </ul>
                        </div>
                        <div id="default-tab-content">
                            <div className={`space-y-3 p-4 rounded-lg ${activeTab === 'profile' ? '' : 'hidden'}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="flex flex-col gap-2">
                                    <div className="text-sm font-semibold">Fullname</div>
                                    <input className='rounded-lg bg-gray-100 w-52 py-1 px-3 ' type="text" name="fullname" id="fullname" defaultValue={user.fullname} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-sm font-semibold">Username</div>
                                    <input className='rounded-lg bg-gray-100 w-52 py-1 px-3 ' type="text" name="username" id="username" defaultValue={user.username} />
                                </div>
                                <button type='button' className="bg-black text-white py-1 px-3 rounded-lg text-sm">Save Profile</button>
                            </div>
                            <div className={`space-y-3 p-4 rounded-lg ${activeTab === 'dashboard' ? '' : 'hidden'}`} id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                <div className="flex flex-col gap-2">
                                    <div className="text-sm font-semibold">Current Password</div>
                                    <input className='rounded-lg bg-gray-100 w-52 py-1 px-3 ' type="password" name="password" id="password" defaultValue={user.fullname} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-sm font-semibold">New Password</div>
                                    <input className='rounded-lg bg-gray-100 w-52 py-1 px-3 ' type="password" name="newpassword" id="newpassword" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="text-sm font-semibold">Confirm new Password</div>
                                    <input className='rounded-lg bg-gray-100 w-52 py-1 px-3 ' type="password" name="Confirmnewpassword" id="Confirmnewpassword" />
                                </div>
                                <button type='button' className="bg-black text-white py-1 px-3 rounded-lg text-sm">Save Password</button>

                            </div>
                        </div>
                    </div>
                )}
            </Suspense>
        </div>
    );
}
