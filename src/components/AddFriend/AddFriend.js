import { useState } from 'react';
import './AddFriend.css';

const randomNumber = () => {
    return Math.floor(Math.random() * 1001);
};

function AddFriendForm({ onAddFriend, onClose }) {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState(
        `https://i.pravatar.cc/48?u=${randomNumber()}`
    );

    function handelAddFriend(e) {
        e.preventDefault();

        if (!name) return;

        const newFriend = {
            name,
            avatar,
            balance: 0,
            id: crypto.randomUUID(),
        };

        onAddFriend((previousFriend) => [...previousFriend, newFriend]);
        setName('');
        setAvatar(`https://i.pravatar.cc/48?u=${randomNumber()}`);
    }

    return (
        <>
            <form className="friend-form">
                <input
                    type="text"
                    placeholder="Your friend's name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    disabled={true}
                />
                <button type="submit" onClick={handelAddFriend}>
                    Add
                </button>
            </form>
            <button onClick={onClose}>Close</button>
        </>
    );
}

export default AddFriendForm;
