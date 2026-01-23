"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import QuillEditor from "@/components/QuillEditor";
import { toast } from "sonner";
import { createData, readData, updateData } from "@/helper/axios";
import { Textarea } from "@/components/ui/textarea";

function JobPage() {
    const router = useRouter();
    const [loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const params = useParams();
    const JobId = params?.id?.[0] || null;
    /* -------------------- Initial Values -------------------- */
    const initialValues = {
        jobTitle: "",
        jobType: "",
        department: "",
        location: "",
        workMode: "",
        experience: "",
        qualification: "",
        jobDescription: "",
        keyResponsibilities: "",
        requiredSkills: "",
        preferredSkills: "",
        salaryRange: "",
        openings: "",
        deadline: null,
        status: "draft",
    };

    /* -------------------- Validation -------------------- */
    const validationSchema = Yup.object({
        jobTitle: Yup.string().required("Job title is required"),
        jobType: Yup.string().required("Job type is required"),
        department: Yup.string().required("Department is required"),
        location: Yup.string().required("Location is required"),
        workMode: Yup.string().required("Work mode is required"),
        experience: Yup.string().required("Experience is required"),
        qualification: Yup.string().required("Qualification is required"),
        jobDescription: Yup.string().required("Job description is required"),
        openings: Yup.number()
            .typeError("Enter valid number")
            .required("Openings required"),
        deadline: Yup.date().required("Deadline required"),
        status: Yup.string().required("Status required"),
    });

    /* -------------------- Formik -------------------- */
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                
                const token = localStorage.getItem("token");
                const data = { ...values }
                if (!JobId) {
                    setLoader(true);
                    const res = await createData("", "/career/addJob", data, {
                        withCredentials: true,
                        headers: { authorization: `Bearer ${token}` },
                    });

                    if (res.data.message === "Job is added scussfully!!!") {
                        toast.success("Job posted successfully");
                        setLoader(false);
                        router.push("/admin/dashboard/career/joblist");
                    }
                } else {
                    setLoader(true);
                    const res = await updateData(`/career/updateJob/${JobId}`, data, {
                        withCredentials: true,
                        headers: { authorization: `Bearer ${token}` },
                    });

                    if (res?.status === true) {
                        toast.success(res.message);
                        setLoader(false);
                        router.push("/admin/dashboard/career/joblist");
                    }
                }
            } catch (err) {
                toast.error("Something went wrong");
            } finally {
                setLoader(false);
            }
        },
    });


    const GetJobbyid = async (token) => {
        try {
            const res = await readData(`/career/getjobById/${JobId}`, {
                headers: {
                    "Content-Type": "application/json",
                    'authorization': `Bearer ${token}`
                },
            });

            if (res.status === true) {
                const data = res.job
                formik.setValues({
                    ...data,
                    deadline: data?.deadline ? new Date(data?.deadline) : null,
                });
                setLoader(false)
            }
        } catch (error) {
            console.log("errorr", error)
            setLoader(false)
        }
    }

    useEffect(() => {
        if (JobId) {
            const fetchData = async () => {
                const token = localStorage.getItem("token");
                await GetJobbyid(token);  // ✔️ now state update happens asynchronously
            };
            fetchData();
        }
    }, [])

    return (
        <Card className="w-4xl m-auto mt-5">
            <CardHeader>
                <CardTitle className="text-center text-lg">
                    Add Job Opening
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="row">

                    {/* Job Title */}
                    <div className="col-6 mb-3">
                        <Label>Job Title</Label>
                        <Input
                            name="jobTitle"
                            placeholder="Article Assistant"
                            value={formik.values.jobTitle}
                            onChange={formik.handleChange}
                        />
                        <span className="text-red-500 text-sm">
                            {formik.touched.jobTitle && formik.errors.jobTitle}
                        </span>
                    </div>

                    {/* Job Type */}
                    <div className="col-6 mb-3">
                        <Label>Job Type</Label>
                        <select
                            className="form-select"
                            name="jobType"
                            value={formik.values.jobType}
                            onChange={formik.handleChange}
                        >
                            <option value="">Select</option>
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Internship</option>
                            <option>Articleship</option>
                            <option>Contract</option>
                        </select>
                        <span className="text-red-500 text-sm">
                            {formik.touched.jobType && formik.errors.jobType}
                        </span>
                    </div>

                    {/* Department */}
                    <div className="col-6 mb-3">
                        <Label>Department</Label>
                        <select
                            className="form-select"
                            name="department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                        >
                            <option value="">Select</option>
                            <option>Audit</option>
                            <option>Taxation</option>
                            <option>Accounts</option>
                            <option>Compliance</option>
                            <option>Finance</option>
                            <option>Other</option>
                        </select>
                        <span className="text-red-500 text-sm">
                            {formik.touched.department && formik.errors.department}
                        </span>
                    </div>

                    {/* Location */}
                    <div className="col-6 mb-3">
                        <Label>Location</Label>
                        <Input
                            name="location"
                            placeholder="Ahmedabad"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                        />
                        <span className="text-red-500 text-sm">
                            {formik.touched.location && formik.errors.location}
                        </span>
                    </div>

                    {/* Work Mode */}
                    <div className="col-6 mb-3">
                        <Label>Work Mode</Label>
                        <RadioGroup
                            value={formik.values.workMode}
                            onValueChange={(v) =>
                                formik.setFieldValue("workMode", v)
                            }
                            className="flex gap-4"
                        >
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="On-site" className='radiusbtn' /> On-site
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="Hybrid" className='radiusbtn' /> Hybrid
                            </div>
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="Remote" className='radiusbtn' /> Remote
                            </div>
                        </RadioGroup>
                        <span className="text-red-500 text-sm">
                            {formik.touched.workMode && formik.errors.workMode}
                        </span>
                    </div>

                    {/* Experience */}
                    <div className="col-6 mb-3">
                        <Label>Experience</Label>
                         <Input
                            name="experience"
                            placeholder="Enter Experience"
                           value={formik.values.experience}
                            onChange={formik.handleChange}
                        />
                        <span className="text-red-500 text-sm">
                            {formik.touched.experience && formik.errors.experience}
                        </span>
                    </div>

                    {/* Qualification */}
                    <div className="col-6 mb-3">
                        <Label>Qualification</Label>
                        <select
                            className="form-select"
                            name="qualification"
                            value={formik.values.qualification}
                            onChange={formik.handleChange}
                        >
                            <option value="">Select</option>
                            <option>CA</option>
                            <option>CA Inter</option>
                            <option>CA Articleship</option>
                            <option>B.Com</option>
                            <option>M.Com</option>
                            <option>MBA</option>
                            <option>Other</option>
                        </select>
                        <span className="text-red-500 text-sm">
                            {formik.touched.qualification && formik.errors.qualification}
                        </span>
                    </div>

                    {/* Job Description */}
                    <div className="col-6 mb-3">
                        <Label>Job Description</Label>
                        <Textarea
                            name="jobDescription"
                            value={formik.values.jobDescription}
                            onChange={formik.handleChange} />

                        <span className="text-red-500 text-sm">
                            {formik.touched.jobDescription && formik.errors.jobDescription}
                        </span>
                    </div>

                    {/* Skills */}
                    <div className="col-6 mb-3">
                        <Label>Required Skills</Label>
                        <Input
                            name="requiredSkills"
                            placeholder="GST, Tally, Excel"
                            value={formik.values.requiredSkills}
                            onChange={formik.handleChange}
                        />

                    </div>

                    <div className="col-6 mb-3">
                        <Label>Preferred Skills (Optional)</Label>
                        <Input
                            name="preferredSkills"
                            value={formik.values.preferredSkills}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/* Salary */}
                    <div className="col-6 mb-3">
                        <Label>Salary Range</Label>
                        <Input
                            name="salaryRange"
                            placeholder="₹10,000 – ₹25,000"
                            value={formik.values.salaryRange}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/* Openings */}
                    <div className="col-6 mb-3">
                        <Label>Number of Openings</Label>
                        <Input
                            type="number"
                            name="openings"
                            value={formik.values.openings}
                            onChange={formik.handleChange}
                        />
                        <span className="text-red-500 text-sm">
                            {formik.touched.openings && formik.errors.openings}
                        </span>
                    </div>

                    {/* Deadline */}
                    <div className="col-6 mb-3">
                        <Label>Application Deadline</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                    {formik.values.deadline
                                        ? formik.values.deadline.toLocaleDateString()
                                        : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <Calendar
                                    mode="single"
                                    selected={formik.values.deadline}
                                    onSelect={(d) => {
                                        formik.setFieldValue("deadline", d);
                                        setOpen(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                        <span className="text-red-500 text-sm">
                            {formik.touched.deadline && formik.errors.deadline}
                        </span>
                    </div>

                    {/* Status */}
                    <div className="col-6 mb-3">
                        <Label>Status</Label>
                        <RadioGroup
                            value={formik.values.status}
                            onValueChange={(v) =>
                                formik.setFieldValue("status", v)
                            }
                            className="flex gap-4 align-center"
                        >
                            <div className="flex items-center gap-3">

                                <RadioGroupItem value="active" className='radiusbtn' /> Active
                            </div>
                            <div className="flex items-center gap-3">

                                <RadioGroupItem value="closed" className='radiusbtn' /> Closed
                            </div>
                            <div className="flex items-center gap-3">

                                <RadioGroupItem value="draft" className='radiusbtn' /> Draft
                            </div>
                        </RadioGroup>

                        <span className="text-red-500 text-sm">
                            {formik.touched.status && formik.errors.status}
                        </span>
                    </div>
                </div>

                {/* CTA */}
                <div className="w-50 m-auto mt-4">
                    <Button onClick={formik.handleSubmit} className="w-full commonbtn">
                        {loader ? <Spinner /> : "Publish Job"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default JobPage;
