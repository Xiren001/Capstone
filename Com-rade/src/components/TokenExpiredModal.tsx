import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface TokenExpiredModalProps {
  isOpen: boolean;
  onLogin: () => void;
  onClose: () => void;
}

export const TokenExpiredModal: React.FC<TokenExpiredModalProps> = ({
  isOpen,
  onLogin,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Session Expired
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Your session has expired for security reasons
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">What happened?</p>
                <p className="text-xs text-muted-foreground">
                  For security, your session automatically expires after a
                  period of inactivity. This helps protect your account from
                  unauthorized access.
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onLogin} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Login Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
