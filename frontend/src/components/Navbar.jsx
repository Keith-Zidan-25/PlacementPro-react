import React from "react";

export default function Navbar({ className, linkList = [] }) {
    return (
        <div className={`w-full flex items-center justify-between p-4 ${className}`}>
            <div className="text-xl font-bold">
                PlacementPro
            </div>
            <nav className="flex gap-4">
                {
                    linkList.map((item, index) => (
                        <a key={index} className="font-medium transition-colors duration-300 hover:text-gray-300" href={item.url}>
                            {item.name}
                        </a>
                    ))
                }
            </nav>
        </div>
    );
}
