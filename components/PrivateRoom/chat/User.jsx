import StatusIcon from "./StatusIcon";

const User = ({ user, isSelected, onSelect }) => {
  return (
    <div className='user' onClick={onSelect}>
      <div className='user__description'>
        <div className='user__name'>
          {user.username} {user.self ? " (yourself)" : ""}
        </div>
        <div className='user__status'>
          <StatusIcon connected={user.connected} />
        </div>
        {user.hasNewMessages && <div className='new-messages'>!</div>}
      </div>
    </div>
  );
};
export default User;
