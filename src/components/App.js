import FriendList from './FriendList/FriendList';
import AddFriend from './AddFriend/AddFriend';
import { useState } from 'react';

const initialFriends = [
    {
        id: 118836,
        name: 'Clark',
        avatar: 'https://i.pravatar.cc/48?u=118836',
        balance: -7,
    },
    {
        id: 933372,
        name: 'Sarah',
        avatar: 'https://i.pravatar.cc/48?u=933372',
        balance: 20,
    },
    {
        id: 499476,
        name: 'Anthony',
        avatar: 'https://i.pravatar.cc/48?u=499476',
        balance: 0,
    },
];

function App() {
    const [friendList, setFriendList] = useState(initialFriends);
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className="main-container">
            <div className="left-side">
                <FriendList friendList={friendList} />
                {isClicked ? (
                    <AddFriend
                        onAddFriend={setFriendList}
                        onClose={() => setIsClicked((pre) => !pre)}
                    />
                ) : (
                    <button onClick={() => setIsClicked((pre) => !pre)}>
                        Add Friend
                    </button>
                )}
            </div>
            <div className="right-side">
                a;ljkf;alkjf
            </div>
        </div>
    );
}

export default App;
