import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { checkUser } from '@/lib/checkUser';


const Header = async () => {
    const user = await checkUser();
    return ( 
        <nav className="navbar">
            <div className="navbar-container">
                <h2 className='text-2xl font-bold text-blue-600'>Expense Tracker</h2>
                <div>
                    <SignedOut>
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