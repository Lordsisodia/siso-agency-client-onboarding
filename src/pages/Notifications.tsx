import { MainLayout } from '@/components/assistants/layout/MainLayout';
import { Waves } from '@/components/ui/waves-background';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Clock, FileText, Settings, RefreshCw, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { format } from 'date-fns';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from the project team',
      description: 'Your app development project has a new update from the development team.',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      icon: MessageSquare
    },
    {
      id: 2,
      type: 'update',
      title: 'Project status updated',
      description: 'Your project "Marketing Dashboard" has moved to the development phase.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: false,
      icon: RefreshCw
    },
    {
      id: 3,
      type: 'success',
      title: 'Feature implementation complete',
      description: 'The user authentication feature has been successfully implemented.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'document',
      title: 'New document available',
      description: 'A new specification document has been added to your project.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
      read: true,
      icon: FileText
    },
    {
      id: 5,
      type: 'alert',
      title: 'Action required',
      description: 'Please review and approve the latest design mockups for your application.',
      time: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      read: true,
      icon: AlertCircle
    }
  ];

  const getIconColor = (type: string, read: boolean) => {
    if (read) return 'text-siso-text/50';
    
    switch (type) {
      case 'message':
        return 'text-blue-400';
      case 'update':
        return 'text-amber-400';
      case 'success':
        return 'text-green-400';
      case 'document':
        return 'text-purple-400';
      case 'alert':
        return 'text-siso-red';
      default:
        return 'text-siso-orange';
    }
  };

  const getBackgroundColor = (type: string, read: boolean) => {
    if (read) return 'bg-black/20';
    
    switch (type) {
      case 'message':
        return 'bg-blue-500/10';
      case 'update':
        return 'bg-amber-500/10';
      case 'success':
        return 'bg-green-500/10';
      case 'document':
        return 'bg-purple-500/10';
      case 'alert':
        return 'bg-siso-red/10';
      default:
        return 'bg-siso-orange/10';
    }
  };

  const getBorderColor = (type: string, read: boolean) => {
    if (read) return 'border-siso-text/10';
    
    switch (type) {
      case 'message':
        return 'border-blue-500/30';
      case 'update':
        return 'border-amber-500/30';
      case 'success':
        return 'border-green-500/30';
      case 'document':
        return 'border-purple-500/30';
      case 'alert':
        return 'border-siso-red/30';
      default:
        return 'border-siso-orange/30';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffHours = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return format(date, 'h:mm a');
    } else {
      return format(date, 'MMM d');
    }
  };

  return (
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
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
              Notifications
            </h1>
            <p className="mt-2 text-lg text-siso-text/80">
              Stay updated with your project activity and communications
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-3"
          >
            <button className="p-2 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text/70 hover:bg-black/30 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-black/20 border border-siso-orange/20 text-siso-text/70 hover:bg-black/30 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-siso-text-bold flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-siso-orange" />
                    Recent Notifications
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-siso-orange hover:text-siso-red transition-colors">
                      Mark all as read
                    </button>
                    <span className="h-4 w-px bg-siso-text/20"></span>
                    <button className="text-sm text-siso-orange hover:text-siso-red transition-colors">
                      Clear all
                    </button>
                  </div>
                </div>
                
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-4 rounded-lg ${getBackgroundColor(notification.type, notification.read)} border ${getBorderColor(notification.type, notification.read)} flex`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getBackgroundColor(notification.type, notification.read)} mr-4 flex-shrink-0`}>
                          <notification.icon className={`w-5 h-5 ${getIconColor(notification.type, notification.read)}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className={`font-medium ${notification.read ? 'text-siso-text/70' : 'text-siso-text-bold'}`}>
                              {notification.title}
                            </h4>
                            <span className="text-xs text-siso-text/50 whitespace-nowrap ml-4">
                              {formatTime(notification.time)}
                            </span>
                          </div>
                          <p className={`text-sm mt-1 ${notification.read ? 'text-siso-text/50' : 'text-siso-text/70'}`}>
                            {notification.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <Bell className="w-12 h-12 text-siso-text/30 mx-auto mb-4" />
                    <p className="text-siso-text/50">No notifications to display</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm mb-8">
                <h3 className="text-xl font-semibold mb-4 text-siso-text-bold flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-siso-orange" />
                  Notification History
                </h3>
                <div className="space-y-2">
                  <button className="w-full p-3 rounded-lg bg-siso-orange/10 text-siso-orange text-sm text-left">Today</button>
                  <button className="w-full p-3 rounded-lg hover:bg-black/20 text-siso-text/70 text-sm text-left transition-colors">Yesterday</button>
                  <button className="w-full p-3 rounded-lg hover:bg-black/20 text-siso-text/70 text-sm text-left transition-colors">This Week</button>
                  <button className="w-full p-3 rounded-lg hover:bg-black/20 text-siso-text/70 text-sm text-left transition-colors">This Month</button>
                </div>
              </div>
              
              <div className="p-6 rounded-xl border border-siso-orange/20 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-4 text-siso-text-bold flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-siso-orange" />
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 text-siso-text/70 mr-2" />
                      <span className="text-sm text-siso-text/80">Project Messages</span>
                    </div>
                    <div className="relative inline-block w-10 h-5">
                      <input type="checkbox" defaultChecked id="message-toggle" className="opacity-0 w-0 h-0" />
                      <label 
                        htmlFor="message-toggle" 
                        className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-siso-orange/30 rounded-full transition-all before:absolute before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-siso-orange before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-siso-orange/50"
                      ></label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <RefreshCw className="w-4 h-4 text-siso-text/70 mr-2" />
                      <span className="text-sm text-siso-text/80">Status Updates</span>
                    </div>
                    <div className="relative inline-block w-10 h-5">
                      <input type="checkbox" defaultChecked id="status-toggle" className="opacity-0 w-0 h-0" />
                      <label 
                        htmlFor="status-toggle" 
                        className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-siso-orange/30 rounded-full transition-all before:absolute before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-siso-orange before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-siso-orange/50"
                      ></label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-siso-text/70 mr-2" />
                      <span className="text-sm text-siso-text/80">Document Updates</span>
                    </div>
                    <div className="relative inline-block w-10 h-5">
                      <input type="checkbox" defaultChecked id="document-toggle" className="opacity-0 w-0 h-0" />
                      <label 
                        htmlFor="document-toggle" 
                        className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-siso-orange/30 rounded-full transition-all before:absolute before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-siso-orange before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-siso-orange/50"
                      ></label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-siso-text/70 mr-2" />
                      <span className="text-sm text-siso-text/80">Alerts & Reminders</span>
                    </div>
                    <div className="relative inline-block w-10 h-5">
                      <input type="checkbox" defaultChecked id="alert-toggle" className="opacity-0 w-0 h-0" />
                      <label 
                        htmlFor="alert-toggle" 
                        className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-siso-orange/30 rounded-full transition-all before:absolute before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-siso-orange before:rounded-full before:transition-all checked:before:translate-x-5 checked:bg-siso-orange/50"
                      ></label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-black/20 border border-siso-orange/10">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-siso-orange mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-siso-text/70">
                      You can also receive notifications via email or through our mobile app. Configure your preferences in the account settings.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
