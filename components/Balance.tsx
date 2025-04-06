import BalanceDisplay from './BalanceDisplay';
import { getUserBalance } from "@/app/actions/getUserBalance";

const Balance = async () => {
    const balance = await getUserBalance();
    
    return <BalanceDisplay initialBalance={balance} />;
}
 
export default Balance;