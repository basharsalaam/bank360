import { jsPDF } from "jspdf";
import React from "react";
import "./Inter-normal";
import ReactToPdf from "react-to-pdf";

export const generatePdf = (head, table) => {
  let htmlString = `<section>`;
  const doc = new jsPDF();
  doc.setFont("font");

  doc.html(`<p>sjsj</p>`, {
    callback: function (doc) {
      doc.save();
    },
    x: 10,
    y: 10,
  });
};

export const GeneratePdf = () => {
  const ref = React.createRef();

  return (
    <div>
      <ReactToPdf targetRef={ref} filename="div-blue.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
      </ReactToPdf>
      <div
        style={{ width: "100%", height: "100vh", background: "blue" }}
        ref={ref}
      />
    </div>
  );
};
