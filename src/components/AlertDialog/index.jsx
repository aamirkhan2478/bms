"use client";
import {
  AlertDialog as Dialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from "@chakra-ui/react";
function AlertDialog({
  isOpen,
  onClose,
  cancelRef,
  dialogHeader,
  dialogBody,
  confirmButtonText,
  onConfirm,
}) {
  return (
    <>
      <Dialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {dialogHeader}
            </AlertDialogHeader>

            <AlertDialogBody>{dialogBody}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onConfirm} ml={3}>
                {confirmButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </Dialog>
    </>
  );
}

export default AlertDialog;
