import { useEffect, useRef, useState } from 'react';
import './SplitBillForm.css';

function SplitBillForm({
    selectedFriendInfo: { name, id },
    setFriendList,
    setSelectedFriendID,
}) {
    const [billValue, setBillValue] = useState(0);
    const [myExpense, setMyExpense] = useState(0);
    // const [theirExpense, setTheirExpense] = useState(0);
    const [payer, setPayer] = useState('1');
    const closeBtn = useRef(null);
    // const btnEl = closeBtn.current;
    const formEl = useRef(null);

    const theirExpense = billValue - myExpense;
    // console.log(btnEl)
    useEffect(() => {
        closeBtn.current.addEventListener('click', handleCloseForm);
        // return () =>
        //     btnEl.removeEventListener('click', handleCloseForm);
    }, []);

    function handleCloseForm() {
        formEl.current.style.display = 'none';
        setSelectedFriendID(null);
    }

    function handleSplitBill(e) {
        e.preventDefault();

        if (!billValue) {
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
        setSelectedFriendID(null);
    }

    console.log(billValue < myExpense);
    return (
        <form onSubmit={handleSplitBill} ref={formEl}>
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
                        min={0}
                        max={billValue}
                        className={`${billValue < myExpense && 'wrong'}`}
                    />
                    {billValue < myExpense && (
                        <p className="warningText">
                            Your expense value is grater than the bill value!
                        </p>
                    )}
                </label>
                <label>
                    {name}'s expense
                    <input type="number" value={theirExpense} disabled={true} />
                </label>
                <label>Who is paying the bill?</label>
                <select
                    value={payer}
                    onChange={(e) => setPayer(e.target.value)}
                >
                    <option value="1">You</option>
                    <option value="2">{name}</option>
                </select>
                <button disabled={billValue < myExpense}>Split bill</button>
            </div>
            <button className="close" ref={closeBtn}>
                &times;
            </button>
        </form>
    );
}

export default SplitBillForm;
