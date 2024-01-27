import IconLinkItems from "../utils/IconLinkItems";

export default function FooterNavbar(){
    return <div className="fixed bottom-0 w-full   border-t-2 border-slate-300 bg-slate-50 z-50 sm:hidden h-[8vh]">
        <ul className="list-none flex justify-around items-center h-full">
            <IconLinkItems type="footer"/>

        </ul>
    </div>
}