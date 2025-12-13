function Modal({ children, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // dim background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          minWidth: 320,
          maxWidth: 500,
        }}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
