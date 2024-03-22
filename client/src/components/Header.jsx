import { Link } from "react-router-dom";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../store/atom";

export function Header() {
    const userInfo = useRecoilValueLoadable(currentUserAtom);
    return (<div className="flex justify-between shadow-md py-3 px-5">
        <Link to='/' className="text-2xl font-semibold">PayClone</Link>
        <div className="text-xl space-x-5">
            {userInfo.contents.username
                ? <>
                    <Link key="user" to="/user">{userInfo.contents.username}</Link>
                    <Link key="signin" to="/signin" onClick={HandleSignOut}>SignOut</Link>
                </>
                : <>
                    <Link key="signup" to="/signup">SignUp</Link>
                    <Link key="signin" to="/signin">SignIn</Link>
                </>}
        </div>
    </div>
    );
}

function HandleSignOut() {
    localStorage.clear('token', 'username');
    const setuserAtom = useSetRecoilState(currentUserAtom);
    setuserAtom({});
}