import Image from "next/image"
import React, {useEffect, useState} from "react";
import Link from "next/link";

export default function LogoMobile({href}){

    return(
        <>
        <Link href={href}>
            <div>
                <Image
                src='/Mob_logo.svg'
                alt="Logo"
                fill={true}
                />
            </div>
        </Link>
        </>
    )
}