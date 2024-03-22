// import { useRecoilState, useRecoilValue } from "recoil"
// import { reciverUserDataAtom } from "../store/atom";

// export function TransferModal() {
//     const userData = useRecoilValue(reciverUserDataAtom);
//     return (
//         <>
//             {/* className="absolute top-0 left-0 flex justify-center items-center backdrop-blur-md w-screen h-screen" */}
//             <dialog open={false} className="w-screen h-screen top-0 absolute">
//                 <div className="flex justify-center items-center h-screen bg-gray-200">
//                     <div className="flex flex-col gap-10 w-96 shadow-lg p-5 relative rounded-md bg-white">
//                         <div className="text-2xl font-bold text-center">Send Money</div>
//                         <div className="flex flex-col space-y-2">
//                             <div className="flex gap-5 items-center">
//                                 <div className="bg-gray-300 rounded-full flex justify-center items-center text-md size-10">{userData.fullname == undefined ? '' : userData.fullname[0].toUpperCase()}</div>
//                                 <div className="text-lg font-bold">{userData.username}</div>
//                             </div>
//                             <div className="pb-2">
//                                 <div className="font-bold">Amount (in Rs)</div>
//                                 <div className=""><input className="p-1 px-2 w-full rounded border-2" type="number" name="" id="" min={1} placeholder="Enter amount" /></div>
//                             </div>
//                             <div className="w-full text-center rounded text-lg p-1 text-white bg-green-500">Initiate Transfer</div>
//                         </div>
//                         <div className="p-1 absolute font-bold text-lg top-0 right-1 cursor-pointer">X</div>
//                     </div>
//                 </div>
//             </dialog>

//         </>
//     )
// }