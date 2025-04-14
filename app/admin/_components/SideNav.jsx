import { UserButton } from "@clerk/nextjs"
import { House, Brush, Layers3, Settings, PanelLeftDashed } from "lucide-react"
import Link from "next/link"

export default function SideNav() {

    const menuList = [
        {
            id:1,
            name: "Pages",
            icon: Layers3,
            path: "/admin"
        },
        {
            id:2,
            name: "Style",
            icon: Brush,
            path: "/admin/styles"
        },
        {
            id:3,
            name: "Showcase",
            icon: PanelLeftDashed,
            path: "/showcase"
        },
        {
            id:4,
            name: "Home",
            icon: House,
            path: "/"
        },
    ]

    return (
        <div className="p-4 bg-[#00000052] h-screen">
            {menuList.map((menu, index) => (
                <Link key={menu.id} href = {menu.path} className="p-2 py-4 rounded-lg bg-primary cursor-pointer flex items-center justify-center mb-5 tooltip-secondary tooltip tooltip-right"
                 data-tip={menu.name} 
                >
                    <menu.icon className="text-white text-center" />

                </Link>
            ))}
            <div className="fixed bottom-5 px-4">
                <UserButton />
            </div>
        </div>
    )
}