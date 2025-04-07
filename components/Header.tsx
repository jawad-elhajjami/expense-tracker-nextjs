import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { checkUser } from '@/lib/checkUser';
import CurrencySelector from './CurrencySelector';

const Header = async () => {
    const user = await checkUser();
    return ( 
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className='text-2xl font-bold text-blue-600'>Expense Tracker</h2>
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