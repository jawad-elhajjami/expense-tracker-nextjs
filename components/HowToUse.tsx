import mockup from '../public/mockup.png';
import Image from 'next/image';
const HowToUse = () => {
    return ( 
        <section className='flex flex-col items-center py-12 border-t border-gray-200 mt-8'>
            <h2 className="text-4xl font-bold text-center mb-4">How to use</h2>
            <p className='text-gray-500 text-center max-w-lg mb-4'>First, sign in to your dashboard, using your Google account, then you have access to an extensive pack of features, you could vizualise your data using graphs, set budgets and more...</p>
            <Image src={mockup} alt="screenshot" width={1000} height={1000} className="rounded-xl border border-gray-300" />
        </section>
    );
}
 
export default HowToUse;