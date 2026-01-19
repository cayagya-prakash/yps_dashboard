"use client"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Spinner } from '@/components/ui/spinner'
import { createData, readData, updateData } from '@/helper/axios'
import { useFormik } from 'formik'
import { ChevronDownIcon, DeleteIcon, Eye, EyeClosed, EyeClosedIcon, Trash2Icon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import * as Yup from "yup";
import QuillEditor from '@/components/QuillEditor'

function BlogPage() {

  const thumbRef = useRef(null);
  const imgRef = useRef(null);
  const router = useRouter()
  const params = useParams();
  const blogId = params?.id?.[0] || null;
  const [loader, setLoader] = useState(false)
  const [showpsd, setpsd] = useState(false)
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(new Date())

  const [initialValues, setInitialValues] = useState({
    posttype: "blog",
    title: "",
    summry: "",
    publishdate: new Date(),
    status: "",
    category: "",
    featuredImage: null,
    featuredImageUrl: "",
    content: "",
    videoLink: "",
    thumbnail: null,

  })
  const vailidation = Yup.object().shape({
    posttype: Yup.string().required("Post type is required"),
    title: Yup.string()
      .trim()
      .required("Title is required"),
    summry: Yup.string()
      .trim()
      .required("Summary is required"),
    publishdate: Yup.date().required("Publish date is required"),
    status: Yup.string().required("Status is required"),
    category: Yup.string().required("Category is required"),
    content: Yup.string().when("posttype", {
      is: "blog",
      then: (s) => s.required("Content is required for blog"),
      otherwise: (s) => s.notRequired(),
    }),
    videoLink: Yup.string()
      .nullable()
      .when("posttype", {
        is: "video",
        then: (s) =>
          s.url("Enter a valid video URL"),
        otherwise: (s) => s.notRequired(),
      }),

    featuredImage: Yup.mixed()
      .nullable()
      .when("posttype", {
        is: "blog",
        then: (s) =>
          s.required("Featured image is required for blog"),
        otherwise: (s) => s.notRequired(),
      }),

    // THUMBNAIL — required for video only (optional for blog)
    thumbnail: Yup.mixed()
      .nullable()
      .when("posttype", {
        is: "video",
        then: (s) =>
          s.required("Thumbnail is required for video"),
        otherwise: (s) => s.notRequired(),
      }),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: vailidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
  const formData = new FormData();

  formData.append("posttype", values.posttype);
  formData.append("title", values.title);
  formData.append("summry", values.summry);
  formData.append("publishdate", values.publishdate);
  formData.append("status", values.status);
  formData.append("category", values.category);
  formData.append("content", values.content);
  formData.append("videoLink", values.videoLink);

  // ✅ ONLY append if real File
  if (values.featuredImage instanceof File) {
    formData.append("featuredImage", values.featuredImage);
  }

  if (values.thumbnail instanceof File) {
    formData.append("thumbnail", values.thumbnail);
  }

  let token = localStorage.getItem("token");

  if (!blogId) {
    setLoader(true)
    const res = await createData("", "/blog/addBlog", formData, {
      withCredentials: true,
      headers: { authorization: `Bearer ${token}` },
    });

    if (res.status === 200) {
      toast.success(res.data.message);
      router.push("/admin/dashboard/blogs/bloglist");
      setLoader(false)
    }

  } else {
    setLoader(true)
    const res = await updateData(`/blog/UpdateBlog/${blogId}`, formData, {
      withCredentials: true,
      headers: { authorization: `Bearer ${token}` },
    });

    if (res?.message === "Blog updated successfully") {
      toast.success(res.message);
      router.push("/admin/dashboard/blogs/bloglist");
      setLoader(false)
    }
  }
  setLoader(false);
}
  })

  const GetBlogbyid = async (token) => {
    try {
      const res = await readData(`/blog/getBlogbyId/${blogId}`, {
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${token}`
        },
      });

      if (res.message === 'Get Blog details successfully!') {
        const data = res.result
        formik.setValues({
          ...data,
          publishdate: data.publishdate ? new Date(data.publishdate) : null,
        });
        setLoader(false)
      }
    } catch (error) {
      console.log("errorr", error)
      setLoader(false)
    }
  }

  useEffect(() => {
    if (blogId) {
      const fetchData = async () => {
        const token = localStorage.getItem("token");
        await GetBlogbyid(token);  // ✔️ now state update happens asynchronously
      };

      fetchData();
    }
  }, [])

  return (
    <>
      <Card className='w-4xl m-auto mt-5' >
        <CardHeader>
          <CardTitle className={`text-center text-lg`}>
            Add Blog
          </CardTitle>
        </CardHeader>
        <CardContent>

          <div className='container'>
            <div className=''>
              <div className='row'>
                <div className='col-6 mb-4'>
                  <Label className='m-2 text-muted'>Title</Label>
                  <Input placeholder="Enter Title" id="title" name="title" value={formik.values.title} type='text' onChange={formik.handleChange} />
                  <span className='text-red-500 ms-3 text-sm font-bold'>{formik.touched.title ? formik.errors.title : ""}</span>
                </div>
                <div className='col-6'>
                  <Label className='m-2 text-muted'>Short Summary</Label>
                  <Input placeholder="Short Summary" id="summry" name="summry" value={formik.values.summry} type='text' onChange={formik.handleChange} />
                  <span className='text-red-500 ms-3 text-sm font-bold'>{formik.touched.summry ? formik.errors.summry : ""}</span>
                </div>
                <div className='col-6'>
                  <Label className='m-2 text-muted'>Category</Label>
                  <Input placeholder="Enter Category" id="category" name="category" value={formik.values.category} type='text' onChange={formik.handleChange} />
                  <span className='text-red-500 ms-3 text-sm font-bold'>{formik.touched.category ? formik.errors.category : ""}</span>
                </div>

                <div className='col-6'>
                  <Label className='m-2 text-muted w-full'>Publish Date</Label>
                  <Popover open={open} onOpenChange={setOpen} className="w-full">
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="publishdate"
                        name="publishdate"
                        className="w-full justify-between font-normal"
                      >
                        {formik.values.publishdate
                          ? formik.values.publishdate.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        className="w-full"
                        selected={formik.values.publishdate}
                        onSelect={(value) => {
                          formik.setFieldValue("publishdate", value);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <span className='text-red-500 ms-3 text-sm font-bold'>{formik.touched.phone ? formik.errors.phone : ""}</span>
                </div>
                <div className='col-6'>
                  <Label className='m-2 text-muted'>Status</Label>
                  <div>
                    <RadioGroup value={formik.values.status}
                      onValueChange={(value) => formik.setFieldValue("status", value)} onChange={formik.handleChange} className='d-flex'>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="draft" id="s1" className='radiusbtn' />
                        <Label htmlFor="s1">Draft</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="publish" id="s2" className='radiusbtn' />
                        <Label htmlFor="s2">Publish</Label>
                      </div>

                    </RadioGroup>
                  </div>
                  <span className='text-red-500 ms-3 text-sm font-bold'>{formik.touched.status ? formik.errors.status : ""}</span>
                </div>

                <div className='col-6 mt-2'>
                  <Label className='m-2 text-muted'>Post Type</Label>
                  <div>
                    <RadioGroup value={formik.values.posttype}
                      onValueChange={(value) => formik.setFieldValue("posttype", value)} onChange={formik.handleChange} className='d-flex'>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="blog" id="s1" className='radiusbtn' />
                        <Label htmlFor="s1">Blog</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="video" id="s2" className='radiusbtn' />
                        <Label htmlFor="s2">Video</Label>
                      </div>

                    </RadioGroup>
                  </div>
                  <span className='text-red-500 ms-3 text-sm font-bold'>{formik.touched.posttype ? formik.errors.posttype : ""}</span>

                </div>
                {formik.values.posttype === "blog" ?
                  <>

                    <div className='col-6'>
                      <Label className='m-2 text-muted'>Featured Image</Label>

                      <Input
                        id="featuredImage"
                        name="featuredImage"
                        className="cursor-pointer"
                        ref={imgRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          formik.setFieldValue("featuredImage", file);
                        }}
                      />
                      {
                        formik.values.featuredImage && (
                          <div className="mt-2 flex">
                            {blogId ? <a target='_blank' href={formik.values.thumbnail.name} className='cursor-pointer  ms-3'>{formik.values.featuredImage.name}</a> : <>
                              <span className='cursor-pointer'>{formik.values.featuredImage.name}</span><Trash2Icon className="text-red-600 ms-2 cursor-pointer"
                                onClick={() => {
                                  formik.setFieldValue("featuredImage", null);   // clear Formik
                                  if (imgRef.current) imgRef.current.value = ""; // clear input
                                }} />
                            </>}
                          </div>
                        )}
                      <span className="text-red-500 ms-3 text-sm font-bold">
                        {formik.touched.featuredImage ? formik.errors.featuredImage : ""}
                      </span>
                    </div>
                    {/* bind Quill to Formik */}
                    <div className='col-12 mt-3'>
                      <Label className='m-2 text-muted'>Blog Content</Label>
                      <QuillEditor
                        value={formik.values.content}
                        onChange={(val) => formik.setFieldValue("content", val)}
                      />
                      <span className="text-red-500 ms-3 text-sm font-bold">
                        {formik.touched.content ? formik.errors.content : ""}
                      </span>
                    </div>

                  </>
                  : formik.values.posttype === "video" ? <>
                    <div className='col-6'>
                      <Label className='m-2 text-muted'>Add Url</Label>
                      <Input
                        type="url"
                        name="videoLink"

                        placeholder="Paste YouTube / video link"
                        value={formik.values.videoLink}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {formik.touched.videoLink && formik.errors.videoLink && (
                        <span className="text-red-500 ms-3 text-sm font-bold">{formik.errors.videoLink}</span>
                      )}
                    </div>
                    <div className='col-6'>
                      <Label className='m-2 text-muted'>Upload thumbnail</Label>
                      <Input
                        type="file"
                        name="thumbnail"
                        className="cursor-pointer"
                        ref={thumbRef}
                        accept="image/*"
                        onChange={(e) =>
                          formik.setFieldValue("thumbnail", e.currentTarget.files[0])
                        }
                      />
                      {formik.values.thumbnail && (
                       
                         <div className="mt-2 flex">
                            {blogId ? <a target='_blank' href={formik.values.thumbnail.url} className='cursor-pointer  ms-3'>{formik.values.thumbnail.name}</a> : <>
                              <span className='cursor-pointer'>{formik.values.thumbnail.name}</span><Trash2Icon className="text-red-600 ms-2 cursor-pointer"
                                onClick={() => {
                                  formik.setFieldValue("thumbnail", null);   // clear Formik
                              if (thumbRef.current) thumbRef.current.value = ""; // clear input
                                }} />
                            </>}
                          </div>
                      )}

                      {formik.touched.thumbnail && formik.errors.thumbnail && (
                        <span className="text-red-500 ms-3 text-sm font-bold">{formik.errors.thumbnail}</span>
                      )}
                    </div>
                  </> : ""}
              </div>
              <div className='w-50 m-auto'>
                <Button className='commonbtn' onClick={formik.handleSubmit}>{loader ? <Spinner /> : blogId != undefined ? 'Update Blog' : 'Add Blog'}</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BlogPage