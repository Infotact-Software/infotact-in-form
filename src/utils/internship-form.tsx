"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Rocket, Linkedin, Instagram, Twitter, Facebook } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Toaster, toast } from 'sonner'
import { useNavigate } from "react-router-dom"
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  fullName: z.string().min(2, { message: "Please enter your full name." }),
  gender: z.string({ required_error: "Please select your gender." }),
  qualification: z.string({ required_error: "Please select your qualification." }),
  currentYear: z.string({ required_error: "Please select your current year." }),
  college: z.string().min(2, { message: "Please enter your college/university name." }),
  internshipProgram: z.string({ required_error: "Please select an internship program." }),
  duration: z.string({ required_error: "Please select a duration." }),
  country: z.string({ required_error: "Please select your country." }),
  skillLevel: z.string({ required_error: "Please select your skill level." }),
  contactNumber: z.string().min(10, { message: "Please enter a valid contact number." }),
  whatsappNumber: z.string().optional(),
  portfolioLink: z.string().optional(),
  source: z.string({ required_error: "Please select where you learned about us." }),
  jobInterest: z.boolean().default(false),
  linkedinConnected: z.boolean().default(false),
  instagramConnected: z.boolean().default(false),
  twitterConnected: z.boolean().default(false),
  facebookConnected: z.boolean().default(false),
  additionalInfo: z.string().optional(),
})

export default function InternshipForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState("")
const router = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      college: "",
      contactNumber: "",
      whatsappNumber: "",
      portfolioLink: "",
      additionalInfo: "",
      jobInterest: false,
      linkedinConnected: false,
      instagramConnected: false,
      twitterConnected: false,
      facebookConnected: false,
    },
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      setFileError("No file selected");
      return;
    }
    const file = files[0];
    setFileError("")
    
    if (!file) {
      setUploadedFile(null)
      return
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      setFileError("File must be PDF or Word document")
      setUploadedFile(null)
      return
    }
    
    // Check file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size must be less than 2MB")
      setUploadedFile(null)
      return
    }
    
    setUploadedFile(file)
    // form.setValue("resume", file)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const res= await fetch(`${import.meta.env.VITE_BACKEND_URL}/add/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
        })
    const data = await res.json();
    setIsSubmitting(false)
     if(data.success){
        router('/success')
        toast.success("Application submitted successfully!");
     }
     else{
        toast.error(data.message);
     }

    // Simulate form submission
    // setTimeout(() => {
    //   console.log(values)
    //   console.log("Uploaded file:", uploadedFile)
    //   toast.success("Application submitted successfully!")
      
    //   form.reset()
    //   setUploadedFile(null)
    // }, 2000)
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-4xl mx-auto">
    <Card className="border-0 shadow-lg p-2">
        <img src="/bg.jpg" alt="" className="w-full"/>
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        
        <div className="flex items-center gap-2 mb-2 p-2 justify-center">
          <Rocket className="h-6 w-6" />
          <CardTitle className="text-2xl font-bold">Infotact Solutions</CardTitle>
        </div>
        <CardDescription className="text-primary-foreground/90 text-base mb-4 justify-center">
          Thank you for your interest in our exciting internship opportunities! Please fill out the application form
          below.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
          <p className="font-medium">
            Note: Please refrain from applying multiple times for the same domain, as it will be considered an invalid
            application.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please make sure your email ID is correct: Common mistakes - GMAIL.COM, GMAIL.CON, GNAIL.COM. All
                      communications will be sent to the above email ID.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your full name which should appear on the certificates. Please make sure there is no SPELLING
                      mistake. It will not be corrected later.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="qualification"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Highest Academic Qualification</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Qualification" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="currentYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Year of your Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Current Year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">First Year</SelectItem>
                          <SelectItem value="2">Second Year</SelectItem>
                          <SelectItem value="3">Third Year</SelectItem>
                          <SelectItem value="4">Fourth Year</SelectItem>
                          <SelectItem value="5">Graduated</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="college"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College/University</FormLabel>
                      <FormControl>
                        <Input placeholder="Your college or university name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Name of the college/university last attended or currently enrolled in pursuing the degree
                        mentioned above.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Internship Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="internshipProgram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Internship Program</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Internship Program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Web Development">Software Development</SelectItem>
                          {/* <SelectItem value="Generative AI">Generative AI</SelectItem> */}
                          <SelectItem value="Python Development">Python Development</SelectItem>
                          <SelectItem value="Data Science & Machine Learning">Data Science & Machine Learning</SelectItem>
                          <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                          {/* <SelectItem value="IOT (Internet of Things)">IOT (Internet of Things)</SelectItem> */}
                          <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                          <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Internship Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1 Month">1 Month</SelectItem>
                          <SelectItem value="2 Months">2 Months</SelectItem>
                          <SelectItem value="3 Months">3 Months</SelectItem>
                          {/* <SelectItem value="4 Months">4 Months</SelectItem> */}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="australia">Australia</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skillLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Level of Preferred Program</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Skill Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your 10-digit contact number" {...field} />
                      </FormControl>
                      <FormDescription>Enter a valid 10-digit contact number.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="whatsappNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your WhatsApp number (if different)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your WhatsApp number, if different from the contact number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="portfolioLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume / LinkedIn / Portfolio / GitHub Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormDescription>Any one link, if don't have write NA</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where did you learn about us?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="friend">Friend/Colleague</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="college">College/University</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Help us improve our online presence.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Additional Information</h3>

              <FormField
                control={form.control}
                name="jobInterest"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Are you interested for a fulltime Job Opportunity?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h4 className="font-medium">Social Media Connections</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="linkedinConnected"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4" />
                            Connected on LinkedIn?
                          </FormLabel>
                          <FormDescription>
                            <a href="https://www.linkedin.com/company/infotact-solutions/" className="text-primary hover:underline" target="_blank">
                              Follow us on LinkedIn for updates!
                            </a>
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagramConnected"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2">
                            <Instagram className="h-4 w-4" />
                            Connected on Instagram?
                          </FormLabel>
                          <FormDescription>
                            <a href="https://www.instagram.com/infotact_solutions/" className="text-primary hover:underline" target="_blank">
                              Follow us on Instagram for updates!
                            </a>
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterConnected"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2">
                            <Twitter className="h-4 w-4" />
                            Connected on Twitter?
                          </FormLabel>
                          <FormDescription>
                            <a href="#" className="text-primary hover:underline">
                              Follow us on Twitter for updates!
                            </a>
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="facebookConnected"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="flex items-center gap-2">
                            <Facebook className="h-4 w-4" />
                            Connected on Facebook?
                          </FormLabel>
                          <FormDescription>
                            <a href="https://www.facebook.com/people/Infotact-Solutions/61568978349528/" className="text-primary hover:underline" target="_blank">
                              Follow us on Facebook for updates!
                            </a>
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormLabel htmlFor="resume-upload">Resume (PDF or Word)</FormLabel>
                <div className="flex flex-col items-center w-full">
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF or DOC (MAX. 2MB)</p>
                    </div>
                    <input 
                      id="resume-upload" 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileUpload}
                    />
                  </label>
                  
                  {uploadedFile && (
                    <div className="mt-3 text-green-600 font-medium flex items-center">
                      <svg 
                        className="w-5 h-5 mr-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {uploadedFile.name}
                    </div>
                  )}
                  
                  {fileError && (
                    <div className="mt-3 text-red-500 text-sm">
                      {fileError}
                    </div>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Any other relevant information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share any additional information that might be relevant to your application"
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <Toaster position="top-center" richColors/>
    </Card>
    </div>
  )
}