import Image from "next/image"
import React from "react";
import Link from "next/link";

export default function LogoMobile({href}){
    return(
        <>
        <Link href={href}>
            <div>
                <Image
                src='/Mob_logo.svg'
                alt="Logo"
                layout='fill'
                />
            </div>
        </Link>
        </>
    )
}