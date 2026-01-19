import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Badge } from 'lucide-react'
import React from 'react'

function ApplicationMoadal({ openView, setOpenView, selectedApplication,handleCloseView }) {
    return (
        <div className='w-full'>
            <Dialog open={openView} onOpenChange={setOpenView}>
                <DialogContent className="w-5xl h-100" >
                    <DialogHeader>
                        <DialogTitle>View Application</DialogTitle>
                    </DialogHeader>

                    {selectedApplication && (
                        <div className="space-y-3 overflow-auto p-2">

                            {/* Candidate Details */}
                            <section>
                                <p className="text-lg font-bold mb-3">Candidate Details</p>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><b>Name:</b> {selectedApplication.fullName}</p>
                                    <p><b>Email:</b> {selectedApplication.email}</p>
                                    <p><b>Mobile:</b> {selectedApplication.mobile}</p>
                                    <p><b>City:</b> {selectedApplication.city}</p>
                                    <p><b>Qualification:</b> {selectedApplication.qualification}</p>
                                    <p><b>Experience:</b> {selectedApplication.experience} years</p>
                                </div>
                            </section>

                            <Separator />

                            {/* Job Details */}
                            <section>
                                <p className="text-lg font-bold mb-3">Job Details</p>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><b>Job Title:</b> {selectedApplication.jobDetails?.jobTitle}</p>
                                    <p><b>Department:</b> {selectedApplication.jobDetails?.department}</p>
                                    <p><b>Work Mode:</b> {selectedApplication.jobDetails?.workMode}</p>
                                    <p><b>Salary:</b> {selectedApplication.jobDetails?.salaryRange}</p>
                                    
                                </div>
                            </section>

                            <Separator />

                            {/* Resume */}
                            <section>
                                <p className="text-lg font-bold mb-3">Resume</p>

                                {selectedApplication.resume ? (
                                    <a
                                        href={selectedApplication.resume}
                                        target="_blank"
                                        className="text-primary underline"
                                    >
                                        View Resume
                                    </a>
                                ) : (
                                    <p className="text-muted-foreground">No resume uploaded</p>
                                )}
                            </section>

                            {/* Footer */}
                            <div className="flex justify-end gap-2 pt-4 m-4">
                                <Button variant="outline" className='rounded-r-full' onClick={() => handleCloseView()}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ApplicationMoadal