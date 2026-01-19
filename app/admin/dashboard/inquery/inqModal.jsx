import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React from "react";

function InqueryModal({
  openView,
  setOpenView,
  selectedApplication,
  handleCloseView,
}) {
  return (
    <div className="w-full">
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>View Enquiry</DialogTitle>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-4 overflow-auto p-2 text-sm">

              {/* User Details */}
              <section>
                <p className="text-lg font-bold mb-3">User Details</p>

                <div className="grid grid-cols-2 gap-3">
                  <p><b>Name:</b> {selectedApplication.name}</p>
                  <p><b>Email:</b> {selectedApplication.email}</p>
                  <p><b>Phone:</b> {selectedApplication.phone}</p>
                  <p><b>Subject:</b> {selectedApplication.subject}</p>
                </div>
              </section>

              <Separator />

              {/* Message */}
              <section>
                <p className="text-lg font-bold mb-3">Message</p>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {selectedApplication.message}
                </p>
              </section>

              {/* Footer */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={handleCloseView}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InqueryModal;
