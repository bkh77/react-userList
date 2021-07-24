import React, { useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { myContext } from "../App";

const ModalExample = () => {
  const context = useContext(myContext);
  const { firstName, lastName, userName } = context.currentUser;
  return (
    <div>
      <Modal isOpen={context.modal} toggle={context.toggle}>
        <ModalHeader toggle={context.toggle}>Add user</ModalHeader>
        <ModalBody>
          <form id="form" onSubmit={context.hendleSubmit}>
            <input
              defaultValue={firstName}
              className="form-control my-3"
              type="text"
              placeholder="First name..."
            />
            <input
              defaultValue={lastName}
              className="form-control my-3 "
              type="text"
              placeholder="Last name..."
            />
            <input
              defaultValue={userName}
              className="form-control my-3"
              type="text"
              placeholder="User name..."
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            form="form"
            type="submit"
            color="primary"
            onClick={context.toggle}
          >
            Save
          </Button>{" "}
          <Button color="secondary" onClick={context.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
