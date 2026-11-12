import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export function Dialog({
  children,
  onClose,
  labelledBy,
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialogRef}
      className={`garden-dialog ${className}`}
      aria-labelledby={labelledBy}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="garden-dialog-content">{children}</div>
    </dialog>
  );
}
