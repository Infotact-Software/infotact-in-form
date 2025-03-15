import { Check, Calendar, MapPin, Mail, Phone, Users, Award, BookOpen, Globe, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { Toaster,toast } from "sonner";

export default function SuccessPage() {
    interface DataType {
        lastdate: string;
        startdate: string;
        examdate: string;
        stipend: string;
        grplink: string;
        // Add other properties as needed
    }
    const [data, setData] = useState<DataType | null>(null);
    const [loading,setLoading] = useState(true);
    //handleawait
    const fetchintdata = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/submitflow`)
        const data = await res.json();
        if(data.success){
            setData(data.data[0]);
        }
        else{
         toast.error(data.message); 
        }
        
        setLoading(false);
    }
    useEffect(() => {
    fetchintdata();
    },[])

    function addDaysToDate(dateStr: string, days = 5) {
        try {
            // Parse the input date (DD/MM/YYYY)
            const parts = dateStr.split('/');
            if (parts.length !== 3) {
                throw new Error("Invalid date format");
            }
            
            // JavaScript months are 0-indexed, so we subtract 1 from the month
            const date = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
            
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date");
            }
            
            // Add the first set of days
            const firstNewDate = new Date(date);
            firstNewDate.setDate(date.getDate() + days);
            
            // Add additional days for the second date
            const secondNewDate = new Date(firstNewDate);
            secondNewDate.setDate(firstNewDate.getDate() + days);
            
            // Format the dates as "Month DD, YYYY"
            const firstFormatted = formatDate(firstNewDate);
            const secondFormatted = formatDate(secondNewDate);
            
            return [firstFormatted, secondFormatted];
        } catch (error) {
            console.error(error);
            return ["Error: Please provide date in DD/MM/YYYY format", ""];
        }
    }
    
  
    function formatDate(date: Date) {
        const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        
        return `${month} ${day}, ${year}`;
    }
    const [firstDate, secondDate] = data && data.startdate ? addDaysToDate(data.startdate) : ["", ""];
  return (
    <>
    <Toaster position="top-right" richColors/>
    {loading?<div className="flex justify-center items-center min-h-screen text-xl font-bold">Loading.....</div>:<div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        
      <div className="container max-w-5xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
              <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <div className="absolute -top-2 -right-2">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Application Successfully Submitted!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thank you for your interest! Your internship journey begins now. Our team will get back to you soon with the
            next steps.
          </p>
        </div>

        {/* Important Details Card */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Important Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Type</h3>
                  <p className="text-gray-600 dark:text-gray-400">Remote 🏠</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Duration</h3>
                  <p className="text-gray-600 dark:text-gray-400">1, 2, or 3 Months 📆</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Work</h3>
                  <p className="text-gray-600 dark:text-gray-400">Flexible 🤸‍♂️</p>
                </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Last Date to Apply</h3>
                    <p className="text-gray-600 dark:text-gray-400">{data && data.lastdate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Assessment Date</h3>
                    <p className="text-gray-600 dark:text-gray-400">{data && data.examdate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Internship Start Date</h3>
                    <p className="text-gray-600 dark:text-gray-400">{data && data.startdate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Award className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Stipend</h3>
                    <p className="text-gray-600 dark:text-gray-400">Up to ₹{data && data.stipend} based on performance 💰</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        {/* What We Offer Tabs */}
        <Tabs defaultValue="benefits" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="benefits">What We Offer</TabsTrigger>
            <TabsTrigger value="selection">Upon Selection</TabsTrigger>
          </TabsList>
          <TabsContent value="benefits" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Live Training with real-time sessions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Remote Flexibility from anywhere</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Networking with professionals globally</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Mentorship and expert guidance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Free access to Infotact Learning</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Free access to Infotact Job Portal</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Collaboration with international students</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Verified completion certificates</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Recommendation letter for top performers</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>100% Job assistance on completion 🏆</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="selection" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Badge variant="outline" className="h-6 px-2 py-1 bg-primary/10 text-primary border-0">
                      Note
                    </Badge>
                    <p>
                      A small, nominal fee is required for live training and Infotact Learning + Job Portal access upon
                      selection.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>The fee is reinvested to provide the best resources, tools, and learning opportunities.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>Part of our commitment to creating a professional, structured internship experience.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p>
                      Includes free access to our interactive learning + job platform and certification on individual
                      courses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I get started? 🤔</AccordionTrigger>
              <AccordionContent>
                Submit your application. Your Internship Offer Letter will be sent between {firstDate}, and {secondDate} 📩.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What kind of projects will I work on? 💻</AccordionTrigger>
              <AccordionContent>
                Cutting-edge projects in AI, web development, and real-world applications tailored to build your skills
                🚀.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Will I work on the project individually? 🤝</AccordionTrigger>
              <AccordionContent>
                No, you'll collaborate with a group of 5 to 6 members for a team-learning experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>When will I get access to the LMS? 📚</AccordionTrigger>
              <AccordionContent>
                Once you accept the Internship Offer Letter, LMS access details will be shared with you.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Connect With Us */}
        <Card className="mb-8 shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6">Connect with Us 🌐</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">Electronic City, Bengaluru, Karnataka</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">support@infotact.in</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Contact</h3>
                  <p className="text-gray-600 dark:text-gray-400">+91 9124936538</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button className="bg-primary hover:bg-primary/90" onClick={()=>{
                  if (data?.grplink) {
                      window.open(data.grplink);
                  } else {
                      toast.error("Group link is not available");
                  }
              }}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Join the Group
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Keep an eye on your email for further instructions. We're excited to have you join our community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="gap-2" onClick={()=>{
                window.open("https://infotact.in");
            }}>
              <Globe className="h-4 w-4" />
              Visit Website
            </Button>
            <Button className="gap-2" onClick={()=>{
                window.open("https://infotact.in");
            }}>
              <BookOpen className="h-4 w-4" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}

