import React from "react";

const CustomerForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div>
      <button onClick={closeModal}>close</button>
      Hello
    </div>
  );
};

export default CustomerForm;
