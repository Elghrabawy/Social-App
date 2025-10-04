import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Trash } from "lucide-react";

export default function DeleteModal({ isOpen, onOpen, onOpenChange, processing, onProcess, done, title, body }) {

  return (
    <Modal isOpen={isOpen} scrollBehavior="inside" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>
                {body}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose}>
                Cancel
              </Button>
              <Button isDisabled={done} isLoading={processing} color="danger" onPress={() => {
                onProcess();
                console.log("Processing action...");

              }}>
                {!processing && !done && <Trash size={17} />}
                {done ? "Deleted" : processing ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

