import SideNav from "./_components/SideNav";
import Provider from "./Provider";


export default function AdminLayout({children}) {
    return (
        <div>
            <div className="w-24 fixed">
                <SideNav />
            </div>
            <div className="ml-24">
                <Provider>
                    {children}
                </Provider>
            </div>
        </div>
    )
}