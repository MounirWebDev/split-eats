import { useState } from 'react';
import './SplitBillForm.css';

function SplitBillForm({ selectedFriendInfo: { name, id }, setFriendList }) {
    const [billValue, setBillValue] = useState(0);
    const [myExpense, setMyExpense] = useState(0);
    // const [theirExpense, setTheirExpense] = useState(0);
    const [payer, setPayer] = useState('1');

    const theirExpense = billValue - myExpense;

    function handleSplitBill(e) {
        e.preventDefault();

        if (billValue === 0) {
            return;
        }

        switch (payer) {
            case '1':
                setFriendList((pre) =>
                    pre.map((friend) =>
                        friend.id === id
                            ? {
                                  ...friend,
                                  balance: friend.balance - theirExpense,
                              }
                            : { ...friend }
                    )
                );
                console.log(`${name} owes you ${theirExpense}`);
                break;
            case '2':
                setFriendList((pre) =>
                    pre.map((friend) =>
                        friend.id === id
                            ? { ...friend, balance: friend.balance + myExpense }
                            : { ...friend }
                    )
                );
                console.log(`You owe ${name} ${myExpense}`);
                break;
            default:
                console.log('something went wrong!');
        }

        setBillValue(0);
        setMyExpense(0);
        setPayer('1');
    }
    return (
        <form onSubmit={handleSplitBill}>
            <h2>Split a bill with {name}</h2>
            <div>
                <label>
                    Bill value
                    <input
                        type="number"
                        value={billValue}
                        onChange={(e) => setBillValue(+e.target.value)}
                    />
                </label>
                <label>
                    Your expense
                    <input
                        type="number"
                        value={myExpense}
                        onChange={(e) => setMyExpense(+e.target.value)}
                    />
                </label>
                <label>
                    {name}'s expense
                    <input
                        type="number"
                        value={theirExpense}
                        // onChange={(e) => setTheirExpense(e.target.value)}
                        disabled={true}
                    />
                </label>
                <label>Who is paying the bill?</label>
                <select
                    value={payer}
                    onChange={(e) => setPayer(e.target.value)}
                >
                    <option value="1">You</option>
                    <option value="2">{name}</option>
                </select>
                <button>Split bill</button>
            </div>
        </form>
    );
}

export default SplitBillForm;
