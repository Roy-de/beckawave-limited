import React from "react";

const StockForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default StockForm;
