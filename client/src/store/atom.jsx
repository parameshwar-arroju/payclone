import { atom } from 'recoil'

const tokenFromLocalStorage = localStorage.getItem('token');
const usernameFromLocalStorage = localStorage.getItem('username');

const defaultCurrentUsertoken = tokenFromLocalStorage ? tokenFromLocalStorage : '';
const defaultCurrentUsername = usernameFromLocalStorage ? usernameFromLocalStorage : '';

export const currentUserAtom = atom({
    key: 'currentUserAtom',
    default: {
        token: defaultCurrentUsertoken,
        username: defaultCurrentUsername
    }
});//done 

export const reciverUserDataAtom = atom({
    key: 'reciverUserDataAtom',
    default: {}
});

export const usersAtom = atom({
    key: 'usesrsAtom',
    default: []
});