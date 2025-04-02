import { SignInButton } from "@clerk/nextjs";
import HeroImage from '@/public/hero_img.png';
import Image from "next/image";
import FeaturesCards from "./FeaturesCards";
import HowToUse from "./HowToUse";
import { Suspense } from 'react'

const Guest = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <section>
                <div className="guest grid lg:grid-cols-2 grid-cols-1 w-full gap-10 lg:min-w-7xl content-center items-center">
                    <div className="col-span-1 w-full">
                        <Image src={HeroImage} alt="hero" width={1000} height={1000} className="hidden md:block rounded-lg rotate-x-1 border border-green-200" />
                    </div>
                    <div className="col-span-1 w-full">
                        <h1 className="lg:text-5xl text-3xl font-bold mb-4">Track every penny, and get your <span className="text-green-500">fincances</span> under control.</h1>
                        <p className="text-gray-500 mb-4">Please sign-in to manage your transactions, get access to an intiuitive user-interface that makes it a breeze to track your finances.</p>
                        <SignInButton />
                    </div>  
                </div>
                <FeaturesCards />
                <HowToUse />
            </section>
        </Suspense>
     );
}
 
export default Guest;