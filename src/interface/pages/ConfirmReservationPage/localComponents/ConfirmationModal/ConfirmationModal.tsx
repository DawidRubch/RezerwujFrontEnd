import React from "react";
import { ConfirmationSuccess } from "./ConfirmationSuccess";
import { ConfirmationError } from "./ConfirmationError";
import "./ConfirmationModal.css";

interface ConfirmationModal {
  open: boolean;
  success: boolean;
  onClose: () => void;
}

export const ConfirmationModal = ({
  open,
  success,
  onClose,
}: ConfirmationModal) => {
  return (
    <div className={open ? "modalBackgroundOverlay" : "modalHidden"}>
      <div className="modalContainer">
        {success ? (
          <ConfirmationSuccess />
        ) : (
          <ConfirmationError onClose={onClose} />
        )}
      </div>
    </div>
  );
};
