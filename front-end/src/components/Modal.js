import { useEffect, useState } from "react";


import "bootstrap/dist/css/bootstrap.min.css";

function Modal(props) {
    

  return (
        <div
          className="modal fade show"
          style={{ display: "block", background: "#000000dd" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {props.modalTitle}
                </h5>
                <button type="button" onClick={props.closeModal} className="close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {props.modalBody}
              </div>
              <div className="modal-footer">
              {props.modalFooter}
              </div>
            </div>
          </div>
        </div>
      
  );
}

export default Modal;
