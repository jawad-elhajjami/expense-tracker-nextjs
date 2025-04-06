import getIncomeExpense from "@/app/actions/getIncomeExpense";
import IncomeExpenseDisplay from "./IncomeExpenseDisplay";

const IncomeExpense = async () => {
    const {income = 0, expense = 0} = await getIncomeExpense();
    
    return <IncomeExpenseDisplay initialIncome={income} initialExpense={expense} />;
}
 
export default IncomeExpense;