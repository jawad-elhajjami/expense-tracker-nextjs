import Link from "next/link";

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return ( 
        <footer className="py-4 border-t border-gray-300 text-center text-md text-gray-700">
            <p>Copyright {year} &copy; All rights reserved | <Link href="https://github.com/jawad-elhajjami" target="_blank" className="font-bold text-gray-800 border-b-2 border-gray-800">EL HAJJAMI JAWAD</Link></p>
        </footer>
    );
}
 
export default Footer;