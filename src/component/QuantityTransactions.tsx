import {Transaction} from "../interface";

type Props = {
    transactions: Transaction[]
};

export default function QuantityTransactions({ transactions }: Props) {
    if (transactions.length > 0) {
        return (
            <table className="table table-sm">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Quantity change</th>
                    <th>Date & time</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map(value => (
                    <tr key={value.id}>
                        <td>{value.id}</td>
                        <td>{value.quantity_change}</td>
                        <td>{(new Date(value.date_time)).toUTCString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
    return <></>;
}
