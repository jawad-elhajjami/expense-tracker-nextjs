import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { checkUser } from '@/lib/checkUser';
import CurrencySelector from './CurrencySelector';
import Link from 'next/link';   

const Header = async () => {
    const user = await checkUser();
    return ( 
        <nav className="navbar p-4 border-b border-zinc-500/50 bg-white">
            <div className="max-w-7xl w-full m-auto flex items-center justify-between">
                <Link href={"/"} className='text-2xl font-bold text-gray-900'>Expense Tracker</Link>
                <div className="flex items-center gap-4">
                    <SignedIn>
                        <CurrencySelector />
                    </SignedIn>
                    <SignedOut>
                        <CurrencySelector />
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
 
export default Header;