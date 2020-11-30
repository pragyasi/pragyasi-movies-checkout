import React, { useState } from 'react';
import Modal from 'react-modal';

import './confirm.css';

const customStyles = {
  content: {
    height: '10%',
    width: '30%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Confirm({ confirmprops }) {
  const modalProps = {'open' : false , 'modalText' :'Are you sure you want to proceed ?' };
  const [modal, updateModal] = useState(modalProps);

  return (
    <div className="modal">
      <ul>
        {confirmprops.map((curr) => {
          return <li key={curr}>{curr}</li>;
        })}
      </ul>
      <button
        className="checkout"
        onClick={() => {
          const update =Object.assign({} , modalProps , {'open':true})
          updateModal(update);
        }}
      >
        checkout
      </button>

      <Modal
        isOpen={modal.open}
        style={customStyles}
        contentLabel="Confirmation Modal"
        ariaHideApp={false}
      >
       
      <div className="confirm-text">{modal.modalText}</div>
        <button className="confirm-button confirm" onClick={() => {
          const update =Object.assign({} , modalProps , {'open' : true , 'modalText' :'Congratulations !!'})
          updateModal(update)
        }}>
          yes
        </button>
        <button
          className="confirm-button cancel"
          onClick={() => {
            const update =Object.assign({} , modalProps , {'open':false})
            updateModal({update});
          }}
        >
          close
        </button>
  
      </Modal>
    </div>
  );
}
