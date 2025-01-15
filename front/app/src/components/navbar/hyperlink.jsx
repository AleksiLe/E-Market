'use client'
import Link from 'next/link'
export default function hyperlink(props) {
    if (props.path == props.address) {
        return (
            <Link href={props.address} className="bg-transparent text-blue-700 p-0 dark:text-blue-500" aria-current="page">{props.text}</Link>
        );
    } else {
        return (
            <Link href={props.address} className="hover:bg-transparent hover:text-blue-700 p-0 dark:text-white dark:hover:bg-transparent">{props.text}</Link>
        );
    }  
}