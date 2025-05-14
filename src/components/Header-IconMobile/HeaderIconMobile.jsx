import "./hearderIconMobile.scss"

export default function HeaderIconMobile({ open, setOpen, iconOpen, iconClosed }) {

  return (
    <i
      className={`changeNav fa-solid ${open ? iconOpen : iconClosed}`}
      onClick={() => setOpen(!open)}
    ></i>
  );
}
