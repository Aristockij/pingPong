const StatusIcon = ({ connected }) => {
  return <i className={connected ? "icon connected" : "icon"}></i>;
};
export default StatusIcon;
