import { BiLoaderCircle } from "react-icons/bi";


function Loading() {
    return (
        <div className='fixed inset-0 bg-slate-200/20 backdrop-blur-sm flex items-center justify-center z-20'>
            <BiLoaderCircle className='animate-spin text-6xl text-blue-500 font-black' />
        </div>
    )
}

export default Loading
