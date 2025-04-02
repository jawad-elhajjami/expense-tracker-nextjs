import {getUserBalance} from "@/app/actions/getUserBalance";
import { addCommas } from "@/lib/utils";

const Balance = async () => {
    const balance = await getUserBalance();
    return ( <>
        <h4 className="text-gray-500">Your balance</h4>
        <h1 className="font-bold text-2xl">${addCommas(Number(balance?.toFixed(2) ?? 0))}</h1>
    </> );
}
 
export default Balance;