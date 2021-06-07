import React from "react";
import { ConfirmationSuccess } from "./ConfirmationSuccess";
import { ConfirmationError } from "./ConfirmationError";
import "./ConfirmationModal.scss";

interface ConfirmationModalProps {
  open: boolean;
  success: boolean;
  onClose: () => void;
}

export const ConfirmationModal = ({
  open,
  success,
  onClose,
}: ConfirmationModalProps) => {
  return (
    <aside className={open ? "modalBackgroundOverlay" : "modalHidden"}>
      <div className="modalContainer">
        {!success ? (
          <ConfirmationSuccess />
        ) : (
          <ConfirmationError onClose={onClose} />
        )}
      </div>
    </aside>
  );
};
