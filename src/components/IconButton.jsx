function IconButton({icon, onClick}) {
    return (
        <button className="rounded px-2 py-1 shadow-md hover:scale-105">
            {icon}
        </button>
    )
}

export default IconButton
