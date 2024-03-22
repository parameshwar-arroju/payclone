
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { UserBalance } from '../components/UserBalance';
import { UsersList } from '../components/UsersList';
import { currentUserAtom } from '../store/atom';
export function Dashboard() {
    const userInfo = useRecoilValue(currentUserAtom);
    return (
        <div className="">
            {userInfo.token ?
                <div className='p-10'>
                    <UserBalance />
                    <UsersList />
                </div>
                :
                <div className="h-[calc(100vh-5rem)] flex flex-col gap-10 justify-center items-center ">
                    <h1 className="text-5xl font-bold">You are not Signed in</h1>
                    <div className="space-x-12">
                        <Link to='/signin' className="text-3xl text-blue-700 hover:underline hover:underline-offset-3 font-semibold">Signin</Link>
                        <Link to='/signup' className="text-3xl text-blue-700 hover:underline hover:underline-offset-3 font-semibold">Signup</Link>
                    </div>

                </div>

            }
        </div>
    )
}
