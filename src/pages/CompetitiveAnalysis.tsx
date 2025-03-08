
import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { Search, BookOpen, HelpCircle, Phone, MessageSquare, FileText, GraduationCap, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function SupportHelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
    priority: 'medium',
  });
  const [feedbackForm, setFeedbackForm] = useState({
    type: 'suggestion',
    message: '',
  });
  const { toast } = useToast();

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support ticket submitted",
      description: "We'll get back to you as soon as possible.",
      variant: "success",
    });
    setTicketForm({
      name: '',
      email: '',
      subject: '',
      description: '',
      priority: 'medium',
    });
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback received",
      description: "Thank you for helping us improve our platform!",
      variant: "success",
    });
    setFeedbackForm({
      type: 'suggestion',
      message: '',
    });
  };

  const FAQs = [
    {
      question: "How do I create my first project plan?",
      answer: "Navigate to the 'Plan Builder' section from the sidebar. Click on 'Create New Plan' and follow the guided process. You can either use our AI assistant to help you through the planning stages or manually input your project details using the form."
    },
    {
      question: "How can I access the AI tools library?",
      answer: "The AI tools library is accessible from the sidebar under 'Tools'. There you'll find a categorized collection of AI tools that can be used for various parts of your project."
    },
    {
      question: "How do I invite team members to my project?",
      answer: "In your project dashboard, look for the 'Team' section and click on 'Invite Members'. Enter the email addresses of your team members, and they'll receive an invitation to join your project."
    },
    {
      question: "Can I export my project plan to other formats?",
      answer: "Yes! From any project plan, click on the 'Export' button in the top-right corner. You can export your plan as PDF, CSV, or in compatible formats for project management tools like Jira or Asana."
    },
    {
      question: "How does billing work on this platform?",
      answer: "We offer several subscription tiers based on your needs. You can view and manage your subscription from your account settings. We offer monthly and annual billing options, with the ability to upgrade or downgrade as your needs change."
    },
  ];

  const resourceCategories = [
    { 
      title: "Getting Started", 
      icon: <BookOpen className="w-5 h-5" />,
      articles: ["Platform Overview", "Creating Your First Plan", "Understanding AI Assistants", "Working with Team Members"]
    },
    { 
      title: "Account & Billing", 
      icon: <FileText className="w-5 h-5" />,
      articles: ["Subscription Options", "Payment Methods", "Invoices & Receipts", "Changing Plans"]
    },
    { 
      title: "Using AI Tools", 
      icon: <GraduationCap className="w-5 h-5" />,
      articles: ["AI Tools Overview", "Custom Prompt Creation", "Integrating AI in Your Workflow", "AI Limitations"]
    },
    { 
      title: "Troubleshooting", 
      icon: <HelpCircle className="w-5 h-5" />,
      articles: ["Common Issues", "Error Messages Explained", "Browser Compatibility", "Performance Optimization"]
    },
  ];

  return (
    <MainLayout>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Waves 
            lineColor="rgba(255, 87, 34, 0.2)"
            waveSpeedX={0.02}
            waveSpeedY={0.01}
            waveAmpX={40}
            waveAmpY={20}
            friction={0.9}
            tension={0.01}
            maxCursorMove={120}
            xGap={12}
            yGap={36}
          />
        </div>
        
        <div className="relative z-10 container px-4 py-16 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Support & Help Center
            </h1>
            <p className="mt-4 text-lg text-siso-text/80 max-w-2xl mx-auto">
              Find answers, tutorials, and assistance for all aspects of our platform.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <div className="relative max-w-3xl mx-auto">
              <Input
                type="text"
                placeholder="Search for help articles, tutorials, FAQs..."
                className="w-full px-5 py-6 text-lg bg-black/20 border-siso-orange/20 focus:border-siso-orange/50 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 rounded-full aspect-square p-3"
              >
                <Search className="h-5 w-5 text-white" />
              </Button>
            </div>
          </motion.div>
          
          <Tabs defaultValue="faqs" className="w-full">
            <TabsList className="grid grid-cols-4 mb-10 bg-black/20 p-1 max-w-3xl mx-auto">
              <TabsTrigger value="faqs" className="data-[state=active]:bg-gradient-to-r from-siso-red/80 to-siso-orange/80 data-[state=active]:text-white">FAQs</TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-gradient-to-r from-siso-red/80 to-siso-orange/80 data-[state=active]:text-white">Knowledge Base</TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-gradient-to-r from-siso-red/80 to-siso-orange/80 data-[state=active]:text-white">Support</TabsTrigger>
              <TabsTrigger value="feedback" className="data-[state=active]:bg-gradient-to-r from-siso-red/80 to-siso-orange/80 data-[state=active]:text-white">Feedback</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faqs" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-siso-text-bold mb-6 flex items-center">
                  <HelpCircle className="mr-2 text-siso-orange" />
                  Frequently Asked Questions
                </h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {FAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border-b border-siso-border">
                      <AccordionTrigger className="text-lg text-siso-text-bold hover:text-siso-orange transition-colors py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-siso-text/90 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-siso-text-bold mb-6 flex items-center">
                  <BookOpen className="mr-2 text-siso-orange" />
                  Knowledge Base
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resourceCategories.map((category, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="p-6 border border-siso-orange/20 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-siso-orange/20 flex items-center justify-center mr-3">
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-siso-text-bold">{category.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {category.articles.map((article, idx) => (
                          <li key={idx} className="flex items-center">
                            <Button variant="link" className="text-siso-text hover:text-siso-orange transition-colors p-0 justify-start font-normal">
                              {article}
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="support" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-siso-text-bold mb-6 flex items-center">
                      <MessageSquare className="mr-2 text-siso-orange" />
                      Live Chat Support
                    </h2>
                    
                    <div className="h-[600px] border border-siso-orange/20 rounded-xl overflow-hidden">
                      <ChatInterface 
                        title="Support Assistant"
                        welcomeMessage="Hello! I'm your AI support assistant. How can I help you today? Feel free to ask me about how to use any features, or troubleshoot common issues."
                        inputPlaceholder="Type your support question..." 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-semibold text-siso-text-bold mb-6 flex items-center">
                      <Phone className="mr-2 text-siso-orange" />
                      Submit a Support Ticket
                    </h2>
                    
                    <form onSubmit={handleTicketSubmit} className="border border-siso-orange/20 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-siso-text/70 mb-1 block">Your Name</label>
                            <Input 
                              value={ticketForm.name}
                              onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                              className="bg-black/20 border-siso-orange/20"
                              placeholder="Enter your name"
                              required
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-siso-text/70 mb-1 block">Email Address</label>
                            <Input 
                              type="email"
                              value={ticketForm.email}
                              onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                              className="bg-black/20 border-siso-orange/20"
                              placeholder="Enter your email"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-siso-text/70 mb-1 block">Subject</label>
                          <Input 
                            value={ticketForm.subject}
                            onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                            className="bg-black/20 border-siso-orange/20"
                            placeholder="Brief description of your issue"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-siso-text/70 mb-1 block">Priority</label>
                          <select 
                            value={ticketForm.priority}
                            onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                            className="w-full p-2 rounded-md bg-black/20 border border-siso-orange/20 focus:outline-none focus:ring-2 focus:ring-siso-orange/50"
                            required
                          >
                            <option value="low">Low - General question</option>
                            <option value="medium">Medium - Issue affecting workflow</option>
                            <option value="high">High - Critical problem</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-siso-text/70 mb-1 block">Describe Your Issue</label>
                          <Textarea 
                            value={ticketForm.description}
                            onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                            className="min-h-[150px] bg-black/20 border-siso-orange/20"
                            placeholder="Please provide as much detail as possible..."
                            required
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90"
                        >
                          Submit Ticket
                        </Button>
                      </div>
                    </form>
                    
                    <div className="mt-8 p-6 border border-siso-orange/20 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
                      <h3 className="text-xl font-semibold text-siso-text-bold mb-4">Alternative Contact Methods</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-siso-orange/20 flex items-center justify-center mr-3 flex-shrink-0">
                            <Phone className="w-5 h-5 text-siso-orange" />
                          </div>
                          <div>
                            <h4 className="font-medium text-siso-text-bold">Phone Support</h4>
                            <p className="text-sm text-siso-text/70">Available Monday-Friday, 9am-5pm ET</p>
                            <p className="text-siso-text">(555) 123-4567</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-siso-orange/20 flex items-center justify-center mr-3 flex-shrink-0">
                            <Send className="w-5 h-5 text-siso-orange" />
                          </div>
                          <div>
                            <h4 className="font-medium text-siso-text-bold">Email Support</h4>
                            <p className="text-sm text-siso-text/70">Response within 24 hours</p>
                            <p className="text-siso-text">support@example.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="feedback" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-semibold text-siso-text-bold mb-6 flex items-center">
                  <MessageSquare className="mr-2 text-siso-orange" />
                  Send Us Feedback
                </h2>
                
                <form onSubmit={handleFeedbackSubmit} className="border border-siso-orange/20 p-6 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-siso-text/70 mb-1 block">Feedback Type</label>
                      <select 
                        value={feedbackForm.type}
                        onChange={(e) => setFeedbackForm({...feedbackForm, type: e.target.value})}
                        className="w-full p-2 rounded-md bg-black/20 border border-siso-orange/20 focus:outline-none focus:ring-2 focus:ring-siso-orange/50"
                      >
                        <option value="suggestion">Feature Suggestion</option>
                        <option value="improvement">Improvement Idea</option>
                        <option value="praise">Positive Feedback</option>
                        <option value="complaint">Issue Report</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-siso-text/70 mb-1 block">Your Feedback</label>
                      <Textarea 
                        value={feedbackForm.message}
                        onChange={(e) => setFeedbackForm({...feedbackForm, message: e.target.value})}
                        className="min-h-[200px] bg-black/20 border-siso-orange/20"
                        placeholder="Share your thoughts, ideas or concerns with us..."
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90"
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </form>
              </motion.div>
            </TabsContent>
          </Tabs>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 p-6 border border-siso-orange/20 rounded-xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-siso-text-bold mb-4">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Getting Started Guide", "Advanced Plan Builder Tips", "Collaboration Features"].map((title, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-siso-orange/10">
                  <div className="aspect-video bg-black/30 flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-siso-orange/50" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-siso-text-bold">{title}</h3>
                    <p className="text-sm text-siso-text/70">3:45 min</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
