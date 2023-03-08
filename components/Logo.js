import Image from "next/image"
import React from "react";
import Link from "next/link";

export default function Logo({w, h, href}){
    return(
        <>
        <Link href={href}>
            <div className="MainLogo">
                <Image
                src='/w_logo_svg.svg'
                alt="Logo"
                layout='intrinsic'
                width={w}
                height={h}
                />
            </div>
        </Link>
        </>
    )
}

