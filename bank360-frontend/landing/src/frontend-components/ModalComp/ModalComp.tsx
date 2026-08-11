import Modal from "@mui/material/Modal";
import { FC, useState } from "react";
import { IModalProps } from "./ModalComp.interface";
import { ModalContainer } from "./style";

export const ModalComp: FC<IModalProps> = ({
  open,
  setOpen,
  children,
  width,
}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalContainer width={width}>{children}</ModalContainer>
    </Modal>
  );
};
