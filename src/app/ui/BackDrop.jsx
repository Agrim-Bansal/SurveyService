export default function BackDrop({ children, expanded }) {
  return (
    <div className={"backdrop" + (expanded ? " expanded" : "")}>
      {children}
    </div>
  );
}