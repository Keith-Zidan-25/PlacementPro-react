export default function Course() {
    const linkList = []
    return (
        <>
            <header className="bg-black py-5 fixed w-full top-0 z-50 shadow-md">
                <Navbar linkList={linkList} />
            </header>
            
        </>
    );
}