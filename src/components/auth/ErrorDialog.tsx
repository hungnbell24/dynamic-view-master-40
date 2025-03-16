
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isOpen,
  onClose,
  errorMessage,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login Failed</DialogTitle>
          <DialogDescription>{errorMessage}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
