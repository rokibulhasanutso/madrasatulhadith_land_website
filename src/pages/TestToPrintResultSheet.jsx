import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ResultSheetLayout from "../layouts/ResultSheetLayout";

const PrintableContent = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h1>Hello World</h1>
    <p>This is the content to print.</p>
  </div>
));

const ResultPrint = () => {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <button onClick={reactToPrintFn}>Print</button>
      <div ref={contentRef}>
        {Array.from({ length: 35 }).map((_, index) => (
          <ResultSheetLayout key={index} />
        ))}
      </div>
    </div>
  );
};

export default ResultPrint;
