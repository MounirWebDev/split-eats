import './FriendList.css';

function FriendList({ friendList, onSelectedFriendID, selectedFriendID }) {
    return (
        <div className="friend-list">
            {friendList.map((friend) => (
                <FriendItem
                    friend={friend}
                    key={friend.id}
                    onSelectedFriendID={onSelectedFriendID}
                    selectedFriendID={selectedFriendID}
                />
            ))}
        </div>
    );
}

export default FriendList;

function FriendItem({ friend, onSelectedFriendID, selectedFriendID }) {
    let message = '';
    let type = '';

    if (friend.balance < 0) {
        message = `You owe ${friend.name} $${Math.abs(friend.balance)}`;
        type = 'type1';
    } else if (friend.balance > 0) {
        message = `${friend.name} owes you $${friend.balance}`;
        type = 'type2';
    } else {
        message = `You and ${friend.name} are even`;
        type = 'type3';
    }

    return (
        <div
            className={`friend-item ${
                friend.id === selectedFriendID ? 'selected' : ''
            }`}
        >
            <img
                src={friend.avatar}
                alt={friend.name}
                className="friend-avatar"
            />
            <div className="friend-details">
                <div className="friend-name">{friend.name}</div>
                <div className={`friend-balance-${type}`}>{message}</div>
            </div>
            <button
                className="select-button"
                onClick={() =>
                    onSelectedFriendID((preID) =>
                        preID === friend.id ? null : friend.id
                    )
                }
            >
                Select
            </button>
        </div>
    );
}
