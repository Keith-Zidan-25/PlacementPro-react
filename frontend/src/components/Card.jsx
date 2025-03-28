import React from "react";

export default function Card({ className, title, desc, imagePath, buttonMsg, linkPath }) {
    return (
        <div className={` ${className} rounded-lg overflow-hidden shadow-lg`}>
            {imagePath && (
                <div className="w-full h-48">
                    <img src={imagePath} alt={title} className="w-full h-full object-cover bg-center" />
                </div>
            )}
            {(title || desc) && (
                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-black">{title}</h3>
                    <p className="text-gray-500 text-sm">{desc}</p>
                    {(buttonMsg || linkPath) && (
                        <a href={linkPath} className="px-6 py-3 bg-purple-700 text-white rounded-full text-lg transition hover:bg-purple-900 animate-zoom-in w-fit">
                            {buttonMsg}
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}