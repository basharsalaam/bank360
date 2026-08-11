import { ModalComp } from "../ModalComp/ModalComp";
import { PdfProcessorContainer } from "./style";
import ReactToPdf from "react-to-pdf";
import React from "react";
import { Pdf } from "../DownloadPdf/DownloadPdf";

export const PdfProcessor = ({
  openModal,
  setOpenModal,
  head,
  table,
  multi,
}) => {
  return (
    <ModalComp open={openModal} setOpen={setOpenModal} width="670px">
      <PdfProcessorContainer>
        <h2>Bank Statement</h2>

        <div className="scroll">
          <section className="pdf__view top">
            <Pdf.FileRendered head={head} table={table} />
          </section>
        </div>

        <section className="bottom">
          <button
            className="outline-btn"
            onClick={() => {
              setOpenModal(false);
            }}
            type="button"
          >
            Cancel
          </button>
          <Pdf.DownloadButton head={head} table={table} />
        </section>
      </PdfProcessorContainer>
    </ModalComp>
  );
};
// <button onClick={toPdf}>Generate pdf</button>
