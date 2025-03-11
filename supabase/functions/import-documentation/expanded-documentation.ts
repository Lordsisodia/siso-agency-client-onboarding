
// This file contains the expanded documentation data set

// Define the structure of our documentation content
export interface StaticDocQuestion {
  question: string;
  answer: string;
}

interface StaticDocSection {
  title: string;
  questions: StaticDocQuestion[];
}

interface StaticDocArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated?: string;
  sections: StaticDocSection[];
}

interface StaticDocCategory {
  title: string;
  description: string;
  icon: { name: string };
  articles: StaticDocArticle[];
}

// Export the expanded documentation data
export const expandedDocumentationData: StaticDocCategory[] = [
  {
    title: "Getting Started",
    description: "Learn the basics of our platform and how to set up your account",
    icon: { name: "SparklesIcon" },
    articles: [
      {
        title: "Platform Overview",
        slug: "platform-overview",
        excerpt: "Learn about our platform capabilities and how it can help you build applications faster",
        content: "This article provides a comprehensive overview of our platform features and capabilities.",
        difficulty: "beginner",
        sections: [
          {
            title: "General Platform Overview",
            questions: [
              {
                question: "What is this platform and what can it do for me?",
                answer: "Our platform is an AI-powered app development environment that helps you build web and mobile applications faster than traditional methods. It provides tools for planning, designing, and implementing your apps with intelligent assistance at every step."
              },
              {
                question: "How does this platform help me build apps quickly and efficiently?",
                answer: "The platform accelerates development through AI-assisted planning, pre-built components, automated code generation, and intelligent suggestions. Instead of starting from scratch, you can describe what you want to build and our AI will help create a structured plan and implementation path."
              },
              {
                question: "Who is this platform designed for?",
                answer: "Our platform is designed for developers, entrepreneurs, product managers, and businesses of all sizes. Whether you're a solo developer wanting to build faster, a startup with limited resources, or an enterprise looking to innovate quickly, our tools scale to your needs."
              },
              {
                question: "Can I build both web and mobile apps using this platform?",
                answer: "Yes, you can build responsive web applications that work on all devices, as well as native mobile apps for iOS and Android. Our platform supports multiple deployment targets from a single project."
              },
              {
                question: "What makes this platform different from traditional app development tools?",
                answer: "Unlike traditional development environments, our platform combines AI planning, component-based development, and intelligent assistance. This means you spend less time writing boilerplate code and more time creating unique features for your app. The AI learns from your preferences and improves over time."
              }
            ]
          },
          {
            title: "Account Creation & Onboarding",
            questions: [
              {
                question: "How do I sign up for an account?",
                answer: "To sign up, click the 'Get Started' button on our homepage. You can create an account using your email address or by signing in with Google, GitHub, or other supported authentication providers."
              },
              {
                question: "Is there a free trial available, and if so, what does it include?",
                answer: "Yes, we offer a 14-day free trial that includes access to all core features. During the trial, you can create up to 3 projects, use all AI planning tools, and export your work. Usage limits apply to certain advanced features."
              },
              {
                question: "What information do I need to provide during sign-up?",
                answer: "Basic sign-up requires only your name, email address, and a password. For a business account, you'll also need to provide company information. We recommend completing your profile with additional details to enhance the AI's personalization."
              },
              {
                question: "How long does the onboarding process take?",
                answer: "The initial onboarding takes about 5-10 minutes, where you'll answer questions about your experience level and project needs. This helps customize the platform experience for you. You can skip detailed onboarding and complete it later if you prefer."
              },
              {
                question: "Are there any prerequisites before creating an account?",
                answer: "There are no technical prerequisites to create an account. Basic familiarity with application concepts is helpful but not required. Our platform is designed to be accessible to users with varying levels of technical expertise."
              }
            ]
          },
          {
            title: "Quick Start Guide",
            questions: [
              {
                question: "What are the first steps I should take after logging in?",
                answer: "After logging in for the first time, we recommend: 1) Take the guided tour to understand the interface, 2) Create your first project using the 'New Project' button, 3) Explore the AI Plan Builder to define your app's structure, and 4) Check out sample projects for inspiration."
              },
              {
                question: "How do I set up my account quickly?",
                answer: "For the fastest setup, click 'Complete Profile' after logging in, fill in the basic information about yourself and your goals, then select a template project that's closest to what you want to build. This will pre-populate many settings and give you a head start."
              },
              {
                question: "Where can I find a tutorial or walkthrough to get started?",
                answer: "Tutorials are available under the 'Learn' section in the main navigation. We also provide interactive walkthroughs that appear when you use key features for the first time. For comprehensive learning, visit our Academy where step-by-step courses are available."
              },
              {
                question: "What should I do if I get stuck during the initial setup?",
                answer: "If you get stuck, click the help icon (question mark) in the top right corner for contextual help. You can also chat with our AI assistant by clicking 'Get Help' or visit the community forum through the Support menu. For urgent issues, use the live chat in the bottom right."
              },
              {
                question: "Can I preview a demo of the platform before I dive in?",
                answer: "Yes, we offer an interactive demo that doesn't require account creation. Visit the 'Try Demo' section on our homepage to explore a limited version of the platform with pre-loaded sample projects. This gives you a feel for the interface and key features."
              }
            ]
          },
          {
            title: "Understanding the Dashboard",
            questions: [
              {
                question: "What are the main sections of the dashboard?",
                answer: "The dashboard consists of: 1) The Projects section showing your recent and pinned projects, 2) Quick Stats displaying your usage and activity metrics, 3) Resources section with learning materials and templates, 4) News & Updates about new features, and 5) The Activity Feed showing recent actions and collaborator activities."
              },
              {
                question: "How do I navigate between features on the dashboard?",
                answer: "Use the main navigation menu on the left sidebar to switch between major sections like Projects, Plan Builder, Resources, and Settings. The top bar provides quick access to search, notifications, and your profile. Each section has its own sub-navigation that appears when you select it."
              },
              {
                question: "Can I customize the dashboard layout?",
                answer: "Yes, you can customize the dashboard by clicking the 'Customize' button in the top right corner. This allows you to rearrange widgets, hide sections you don't use frequently, and choose which metrics and projects to highlight. Your customizations are saved automatically."
              },
              {
                question: "How do I access quick actions like starting a new project or checking tasks?",
                answer: "Quick actions are available through the '+ New' button in the top navigation bar. This dropdown menu lets you create projects, add tasks, or access other creation tools. You can also use keyboard shortcuts (press '?' to see all shortcuts) for common actions."
              },
              {
                question: "Where do I find my latest notifications and project updates?",
                answer: "Notifications appear in the bell icon menu in the top navigation bar. This shows system notifications, project updates, and mentions. The Activity Feed on the dashboard also displays recent changes across all your projects, and each project has its own activity timeline."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Account & Profile",
    description: "Manage your account settings, profile, and security preferences",
    icon: { name: "UserCircleIcon" },
    articles: [
      {
        title: "Managing Your Account",
        slug: "managing-account",
        excerpt: "Learn how to manage your account settings, profile information, and security options",
        content: "This article explains how to effectively manage all aspects of your account.",
        difficulty: "beginner",
        sections: [
          {
            title: "Setting Up Your Account",
            questions: [
              {
                question: "How do I create my account and log in for the first time?",
                answer: "To create an account, visit our homepage and click 'Sign Up'. You can register with your email address or use social login options like Google or GitHub. After submitting the registration form, you'll receive a verification email. Click the link in that email to verify your account, and then you can log in."
              },
              {
                question: "What information do I need to provide during setup?",
                answer: "During initial account setup, you'll need to provide your name, email address, and create a password. Optionally, you can add your job title, company name, and profile picture. The more information you provide, the more personalized your experience will be."
              },
              {
                question: "Can I sign up using my social media accounts?",
                answer: "Yes, we support social login with Google, GitHub, and Microsoft accounts. This allows for faster registration and login without needing to create and remember another password. Your account will be linked to the social provider you choose."
              },
              {
                question: "How do I verify my email address or phone number?",
                answer: "After registration, we automatically send a verification email to your provided email address. Click the link in the email to verify your account. For phone verification (optional), go to Account Settings → Security, add your phone number, and we'll send a verification code via SMS."
              },
              {
                question: "What should I do if I encounter issues during sign-up?",
                answer: "If you encounter any issues during sign-up, first check that you're using a supported browser (Chrome, Firefox, Safari, or Edge). Clear your browser cache and try again. If problems persist, check our status page for any system issues, or contact support with details about the problem you're experiencing."
              }
            ]
          },
          {
            title: "Managing Your Profile",
            questions: [
              {
                question: "How do I update my name, email, or contact information?",
                answer: "To update your profile information, go to Account Settings → Profile. Here you can edit your name, professional title, contact details, and other personal information. After making changes, click 'Save Changes' to update your profile."
              },
              {
                question: "Where do I upload a profile picture?",
                answer: "You can upload or change your profile picture in Account Settings → Profile. Click on the profile image placeholder or your current image, then select 'Upload Image'. You can crop and adjust the image before saving. We support JPG, PNG, and GIF formats up to 5MB in size."
              },
              {
                question: "How can I customize my personal or company profile?",
                answer: "For personal profiles, go to Account Settings → Profile to add your bio, skills, and professional information. For company profiles, navigate to Account Settings → Organization and complete the company details including logo, description, industry, and team size. Both profiles can be enhanced with social media links and portfolio items."
              },
              {
                question: "Can I merge multiple profiles or accounts?",
                answer: "Currently, we don't support automatic merging of accounts. If you have multiple accounts that you'd like to consolidate, please contact our support team. They'll verify your ownership of all accounts and assist with transferring projects and data to your preferred account."
              },
              {
                question: "How do I view my account activity or login history?",
                answer: "To view your account activity, go to Account Settings → Security → Login Activity. This page shows your recent logins, including date, time, location, and device information. If you notice any suspicious activity, you can click 'Sign out of all other sessions' and change your password immediately."
              }
            ]
          },
          {
            title: "Security Best Practices",
            questions: [
              {
                question: "How do I enable two-factor authentication (2FA)?",
                answer: "To enable 2FA, go to Account Settings → Security → Two-Factor Authentication and click 'Enable'. You can choose between using an authenticator app (like Google Authenticator or Authy) or receiving SMS codes. Follow the on-screen instructions to complete the setup and make sure to save your recovery codes in a secure location."
              },
              {
                question: "What should I do if I suspect my account has been compromised?",
                answer: "If you suspect your account has been compromised: 1) Change your password immediately, 2) Enable 2FA if not already active, 3) Check for any unauthorized changes in your account, 4) Review recent login activity, and 5) Contact our support team with details about the suspected breach. We'll help investigate and secure your account."
              },
              {
                question: "How often should I update my password?",
                answer: "We recommend updating your password at least every 90 days. Use a strong, unique password that's at least 12 characters long and combines uppercase letters, lowercase letters, numbers, and special characters. Avoid using the same password across multiple services, and consider using a password manager to help maintain different secure passwords."
              },
              {
                question: "What are the recommended security settings to protect my account?",
                answer: "For maximum security, we recommend: 1) Enable two-factor authentication, 2) Use a strong, unique password, 3) Set up login notifications to receive alerts of new device logins, 4) Regularly review connected applications and revoke access for unused ones, and 5) Keep your contact information updated for account recovery purposes."
              },
              {
                question: "How do I manage or review recent login sessions?",
                answer: "Go to Account Settings → Security → Login Activity to see all active sessions. Each entry shows the device, browser, location, and time of access. If you don't recognize a session, click 'Sign Out' next to that specific session, or use 'Sign out of all other sessions' to end all sessions except your current one. Then change your password immediately."
              }
            ]
          },
          {
            title: "Privacy & Data Management",
            questions: [
              {
                question: "What data does the platform collect about me?",
                answer: "We collect data necessary to provide and improve our services, including: account information (name, email, etc.), profile data you provide, usage information (features used, time spent), project content, and technical data (device info, IP address). For a complete breakdown of collected data, please refer to our Privacy Policy."
              },
              {
                question: "How can I export or delete my personal data?",
                answer: "To export your data, go to Account Settings → Privacy → Data Export and select which data you want to download. The export will be prepared and you'll receive an email when it's ready. To delete your account and data, go to Account Settings → Privacy → Delete Account. Note that account deletion is permanent and will remove all your projects and content."
              },
              {
                question: "How do I update my data sharing preferences?",
                answer: "Manage your data sharing preferences in Account Settings → Privacy → Preferences. Here you can control how your data is used for improving services, personalization, and communications. You can also manage email notification preferences, opt in or out of product updates, and control which analytics are collected during your usage."
              },
              {
                question: "Is my data stored securely, and how is it protected?",
                answer: "Yes, we implement robust security measures to protect your data, including encryption in transit and at rest, regular security audits, access controls, and monitoring systems. We use industry-standard TLS/SSL encryption for data transmission, and our infrastructure is hosted in secure, SOC 2 compliant data centers with multiple redundancies."
              },
              {
                question: "How do I ensure my account complies with GDPR or other data regulations?",
                answer: "We've designed our platform with privacy regulations in mind. To ensure compliance: 1) Only collect necessary data for your projects, 2) Use our data processing agreement if needed (available in Account Settings → Privacy → Compliance), 3) Set appropriate retention periods for your data, 4) Be aware of where your data is stored (refer to our Data Residency options), and 5) Address any data subject requests promptly."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Plan Builder",
    description: "Learn how to use our AI-powered plan builder to design your app quickly",
    icon: { name: "FileTextIcon" },
    articles: [
      {
        title: "Getting Started with Plan Builder",
        slug: "plan-builder-intro",
        excerpt: "Learn the basics of the Plan Builder and how to use it effectively",
        content: "This article introduces the Plan Builder tool and guides you through getting started.",
        difficulty: "beginner",
        sections: [
          {
            title: "Introduction to Plan Builder",
            questions: [
              {
                question: "What is the Plan Builder and how does it help me build my app?",
                answer: "The Plan Builder is our AI-powered project planning tool that helps you define your app requirements, features, and specifications systematically. It breaks down the complex process of app planning into manageable steps, provides intelligent suggestions, and creates a structured blueprint that can be used for development. The Plan Builder saves time by automating the planning process while ensuring you don't miss critical elements."
              },
              {
                question: "How do I access the Plan Builder feature from the dashboard?",
                answer: "You can access the Plan Builder from several places: 1) Click on the 'Plan Builder' option in the main navigation sidebar, 2) From your dashboard, click the '+ New' button and select 'New Project Plan', or 3) Within any project page, navigate to the 'Planning' tab and select 'Create/Edit Plan'."
              },
              {
                question: "What are the main components of a project plan?",
                answer: "A comprehensive project plan in our platform consists of: 1) Project Overview (goals, target audience, success metrics), 2) Features & Functionality (core and optional features), 3) Technical Specifications (platforms, tech stack, integrations), 4) Design Requirements (UI/UX preferences, branding), 5) Timeline & Milestones, and 6) Budget & Resources. The Plan Builder guides you through defining each of these components."
              },
              {
                question: "Can I start a project plan using pre-built templates?",
                answer: "Yes, we provide several pre-built templates for different types of apps (e-commerce, social media, productivity tools, etc.). When starting a new plan, you'll see the option to 'Start from Template' where you can browse and select a template that closely matches your project idea. Templates come pre-populated with common features and specifications that you can customize to your needs."
              },
              {
                question: "How do I navigate between different sections within the Plan Builder?",
                answer: "The Plan Builder interface has a navigation sidebar on the left showing all plan sections. You can click on any section to jump directly to it. Alternatively, use the 'Next' and 'Previous' buttons at the bottom of each section to move sequentially. Your progress is automatically saved, so you can navigate freely without losing work. There's also a progress indicator at the top showing which sections are complete."
              }
            ]
          },
          {
            title: "Creating Your First Project Plan",
            questions: [
              {
                question: "How do I start a new project plan in the Plan Builder?",
                answer: "To start a new project plan, click the '+ New' button on your dashboard and select 'New Project Plan', or navigate to the Plan Builder section and click 'Create New Plan'. You'll be prompted to enter a project name and optional description. Then you can either start from scratch, use a template, or import specifications from an existing project."
              },
              {
                question: "What information is required to begin a project plan?",
                answer: "At minimum, you need to provide a project name to start. However, for a more effective plan, the initial setup works best with: 1) A clear project description outlining the app's purpose, 2) Target audience information, 3) Basic business objectives, and 4) Any technical constraints you're aware of. The more information you provide upfront, the more tailored the AI suggestions will be."
              },
              {
                question: "Can I save my progress and return to it later?",
                answer: "Yes, the Plan Builder automatically saves your progress as you work. You can exit at any time and return later to continue where you left off. On your dashboard, you'll see all your in-progress plans with a 'Continue' button. We also save version history, so you can revert to previous versions if needed."
              },
              {
                question: "How do I name and organize my project plans?",
                answer: "When creating a plan, give it a clear, descriptive name that identifies the project purpose. You can organize plans by using tags (add them in the plan settings) or by creating project folders (available in the dashboard 'Organize' menu). For multiple versions of the same project, we recommend using a naming convention like 'ProjectName v1.0', 'ProjectName v2.0', etc."
              },
              {
                question: "How do I use the AI chat assistant to guide my plan creation?",
                answer: "The AI chat assistant is available throughout the Plan Builder process via the chat panel on the right side. Click on the chat icon to expand it. You can ask specific questions like 'What features should a food delivery app have?' or 'What's a reasonable timeline for this project?' The AI will provide contextual guidance based on your project details and can directly add suggestions to your plan with your approval."
              }
            ]
          },
          {
            title: "Advanced Planning Features",
            questions: [
              {
                question: "How can I add milestones and dependencies to my project plan?",
                answer: "In the Timeline section of the Plan Builder, click 'Add Milestone' to create key project checkpoints. For each milestone, you can set a name, description, target date, and assigned team members. To create dependencies, use the 'Dependencies' tab where you can connect features or tasks in a sequence (e.g., 'Task B cannot start until Task A is complete'). The system will visualize these relationships in a Gantt chart view."
              },
              {
                question: "Can I import data from external sources like spreadsheets?",
                answer: "Yes, you can import data from external sources. In the Plan Builder menu, select 'Import' and choose your format (CSV, Excel, JSON, or Jira). Follow the mapping wizard to match your external data columns to our plan fields. For spreadsheets, ensure your data has clear headers that can be mapped to our system. For more complex imports, you can use our API or request assistance from support."
              },
              {
                question: "How do I create and manage multiple iterations (versions) of my project plan?",
                answer: "To create a new version of an existing plan, open the plan and select 'Save As New Version' from the menu. This creates a duplicate that you can modify without affecting the original. All versions are accessible from the 'Versions' tab in the plan details. You can compare versions side by side using the 'Compare' feature, and designate any version as the 'Current Working Version' which teams will see by default."
              },
              {
                question: "What tools are available to analyze the feasibility and cost of my plan?",
                answer: "The Plan Builder includes several analysis tools: 1) Budget Calculator - estimates costs based on selected features and timeline, 2) Resource Allocator - helps determine team size and roles needed, 3) Risk Assessment - identifies potential risks and suggests mitigation strategies, and 4) Feasibility Checker - analyzes technical complexity against your constraints. Access these from the 'Analysis' tab in the plan overview."
              },
              {
                question: "How does the AI integrate competitor analysis into my plan?",
                answer: "When you identify your competitors in the initial setup, our AI research assistant can perform competitor analysis. Navigate to the 'Market Analysis' section and click 'Run Competitor Analysis'. The AI will research similar apps, identify their key features, pricing models, and user experiences. This information is presented in a comparative analysis with actionable insights for differentiation that you can incorporate into your feature planning."
              }
            ]
          },
          {
            title: "Feature & Functionality Selection",
            questions: [
              {
                question: "How do I choose and prioritize features for my app?",
                answer: "In the Features section of the Plan Builder, you'll see AI-suggested features based on your project description. You can add these to your plan, add custom features, or browse the feature library. For each feature, set a priority level (Must-have, Should-have, Could-have, Won't-have) using the dropdown. You can also drag and drop features to reorder them. The platform automatically organizes features by priority to help focus on essential elements first."
              },
              {
                question: "What criteria should I use to determine essential vs. optional features?",
                answer: "Consider these factors when prioritizing features: 1) Core Value - Does this feature directly support your main app purpose? 2) User Impact - How many users will benefit from this feature? 3) Technical Complexity - How difficult and time-consuming is it to implement? 4) Market Differentiation - Does this feature set you apart from competitors? 5) ROI - What's the benefit relative to development cost? Essential features score high on most of these criteria, while optional features may be valuable but less critical."
              },
              {
                question: "How can I see the estimated cost for selected features?",
                answer: "Each feature in the catalog includes an estimated cost range based on typical implementation complexity. As you add features to your plan, the Budget Calculator (accessible from the 'Budget' tab) automatically sums these estimates to provide a projected cost range. For more precise estimates, fill out the technical specifications section, as technology choices can significantly impact costs. You can also click 'Detailed Breakdown' to see cost factors for each feature."
              },
              {
                question: "Can I preview examples of similar features from the Portfolio?",
                answer: "Yes, most features in our catalog include example implementations. When viewing a feature, click the 'See Examples' button to open a gallery of similar features from our portfolio of completed projects. Each example includes screenshots, brief descriptions, and sometimes short demo videos. You can filter examples by industry, platform, or design style to find references most relevant to your project."
              },
              {
                question: "How do I add custom features that aren't in the default list?",
                answer: "To add a custom feature, go to the Features section and click the '+ Add Custom Feature' button. You'll need to provide a name, description, and priority level. You can also specify additional details like subtasks, acceptance criteria, and reference links. For complex custom features, use the 'Feature Specification' template to define all aspects. The AI assistant can help refine your custom feature definitions if you provide basic descriptions."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Projects & Tasks",
    description: "Learn how to manage your projects, tasks, and collaborate with team members",
    icon: { name: "FolderKanbanIcon" },
    articles: [
      {
        title: "Project Management Fundamentals",
        slug: "project-management-basics",
        excerpt: "Learn the basics of managing projects and tasks on our platform",
        content: "This article covers the fundamentals of project management using our platform's tools.",
        difficulty: "beginner",
        sections: [
          {
            title: "Project Management Basics",
            questions: [
              {
                question: "How do I create a new project from my project plan?",
                answer: "To create a new project from an existing plan, open the plan and click 'Convert to Project' in the top-right action menu. You'll be prompted to confirm project details and can adjust settings like start date, team members, and initial milestones. Alternatively, from the dashboard, click '+ New' and select 'New Project', then choose the option to 'Use Existing Plan' when prompted. The system will automatically convert your plan specifications into project tasks and milestones."
              },
              {
                question: "What is the difference between a project and a task in this platform?",
                answer: "A project is a container that represents the overall app or initiative you're building, containing multiple tasks, milestones, and resources. It has its own dashboard, team members, and settings. A task is a single unit of work within a project, with specific assignees, due dates, and completion criteria. Projects can have many tasks organized into sprints, epics, or phases, while tasks represent the actionable items team members work on day-to-day."
              },
              {
                question: "How do I view all my active projects?",
                answer: "To view all your active projects, go to the dashboard and look at the 'My Projects' section which shows recently accessed projects. For a complete view, click on the 'Projects' tab in the main navigation. This opens the Projects dashboard where you can see all projects categorized as 'Active', 'On Hold', or 'Completed'. Use the filters to narrow down by date, team members, or custom tags. Each project card shows key stats like progress percentage, upcoming deadlines, and recent activity."
              },
              {
                question: "How do I access detailed project information?",
                answer: "Click on any project name or card to open the detailed project view. The project detail page has several tabs: 1) Overview - summary stats, recent activity, and key metrics, 2) Tasks - all project tasks organized by status or assignee, 3) Timeline - Gantt chart showing deadlines and dependencies, 4) Resources - team members and assets, 5) Documents - project files and specifications, and 6) Settings - project configuration options. Use the quick-access sidebar to jump between these sections."
              },
              {
                question: "Can I see a history of all my completed projects?",
                answer: "Yes, to view completed projects, go to the Projects dashboard and select the 'Completed' filter from the status dropdown. Alternatively, go to Account → Project History for a chronological list of all your past projects with completion dates and summary statistics. Completed projects are archived but remain accessible with all their tasks, documents, and activity history. You can also generate project retrospective reports from the 'Export' option in each completed project."
              }
            ]
          },
          {
            title: "Task Organization Tips",
            questions: [
              {
                question: "How can I categorize or prioritize tasks within a project?",
                answer: "Our platform offers multiple ways to organize tasks: 1) Status categories (To Do, In Progress, Done, etc.) which you can customize, 2) Priority levels (Urgent, High, Medium, Low) indicated by colors, 3) Tags for custom categorization (like 'frontend', 'bug', 'design'), 4) Epic grouping for feature-related tasks, and 5) Sprint assignments for time-boxed work. Use the 'Group by' option in task views to organize visually by any of these attributes. You can also create custom views with specific filters and grouping."
              },
              {
                question: "How do I set deadlines for individual tasks?",
                answer: "To set a deadline, open the task and click the date field under 'Due Date'. Select a date from the calendar picker and optionally set a specific time. Tasks with approaching deadlines will be highlighted in the task board and appear in team members' 'Upcoming' lists. You can also set up automatic reminders by clicking 'Add Reminder' and specifying when notifications should be sent before the deadline."
              },
              {
                question: "Can I assign tasks to team members or collaborators?",
                answer: "Yes, to assign a task, open the task card and click the assignee field (shows 'Unassigned' by default). Select a team member from the dropdown or type a name to search. You can assign tasks to multiple people when needed by clicking 'Add another assignee'. Assignees will receive a notification and the task will appear in their personal task list. You can also reassign tasks at any time as priorities or availabilities change."
              },
              {
                question: "How do I mark a task as complete?",
                answer: "There are several ways to mark a task complete: 1) Click the checkbox next to the task in list view, 2) Drag the task card to the 'Done' column in board view, 3) Open the task and change its status to 'Complete', or 4) Use the checkmark button on the task detail page. When marking a task complete, you can optionally add completion notes and track time spent. Completed tasks contribute to project progress metrics and team velocity calculations."
              },
              {
                question: "What are some best practices for task management on this platform?",
                answer: "For effective task management: 1) Create clear, specific task titles that describe the action needed, 2) Add detailed descriptions with acceptance criteria for clarity, 3) Break large tasks into smaller subtasks (use the checklist feature), 4) Set realistic deadlines and adjust when scope changes, 5) Use consistent labels and tags across your project, 6) Schedule regular task review sessions with your team, 7) Capture task dependencies using the 'Related to' field, and 8) Attach relevant resources or references directly to tasks."
              }
            ]
          },
          {
            title: "Collaborating on Projects",
            questions: [
              {
                question: "How do I invite team members or collaborators to a project?",
                answer: "To invite collaborators, open your project and go to the 'Team' tab. Click 'Invite Members' and enter email addresses of people you want to invite. You can invite existing platform users or new users who will receive registration instructions. For each invite, select an appropriate role (Admin, Editor, Viewer) that determines their permissions. Add a personalized message if desired, then click 'Send Invites'. Team members will receive email notifications with project access instructions."
              },
              {
                question: "Can I assign specific roles or permissions to different users?",
                answer: "Yes, our platform offers role-based permissions. When inviting users or editing existing team members (from the Team tab), you can assign these roles: 1) Admin - full control including adding/removing members and changing project settings, 2) Editor - can create/edit tasks and content but cannot change project structure or team, 3) Viewer - read-only access to project data, 4) Custom roles with granular permissions. You can also set object-level permissions for sensitive documents or specific project areas."
              },
              {
                question: "How do I track team activity and task progress?",
                answer: "The project dashboard includes several tools for tracking activity: 1) Activity Feed shows chronological team actions, 2) Progress charts display completion metrics over time, 3) Team Workload view shows task distribution across members, 4) Sprint Burndown charts track velocity for time-boxed work. For detailed analysis, use the Reports section to generate custom reports on team productivity, task completion times, and individual contributions. Enable daily or weekly email digests for regular progress updates."
              },
              {
                question: "How do I manage comments and feedback within a project?",
                answer: "Comments can be added at multiple levels: 1) Task comments for specific work items, 2) Document comments for feedback on files, 3) Project-level discussions for broader topics. Use @mentions to notify specific team members. All comments support rich formatting, file attachments, and emoji reactions. Comment threads can be marked as resolved when addressed. Enable email notifications for comments to ensure timely responses. For structured feedback collection, use the dedicated Review features in the Feedback tab."
              },
              {
                question: "What tools are available for real-time collaboration?",
                answer: "Our platform includes several real-time collaboration features: 1) Live Editing - multiple users can edit documents simultaneously with cursor presence, 2) Chat - project-specific chat rooms for quick communication, 3) Video Meetings - integrated conference calls with screen sharing (via our integration with popular meeting tools), 4) Whiteboard - collaborative canvas for brainstorming and diagramming, 5) Status Indicators - see which team members are currently active in the project. These tools are accessible from the 'Collaborate' menu in the project navigation."
              }
            ]
          },
          {
            title: "Project Versioning & Updates",
            questions: [
              {
                question: "How do I manage different versions (iterations) of my project plan?",
                answer: "Project versions are managed through the Versions feature. To create a new version, go to the project settings and select 'Create New Version'. This creates a snapshot of the current project state that you can name (e.g., 'v2.0' or 'Client Review Version'). Access all versions through the 'Versions' tab in project settings. Each version maintains its own tasks, documents, and settings while sharing the project history. You can designate any version as the 'working version' that team members see by default."
              },
              {
                question: "Can I revert to a previous version if needed?",
                answer: "Yes, you can revert to a previous version in two ways: 1) For complete rollback, go to Versions, select the version you want to restore, and click 'Make Active'. This replaces the current working version with the selected one. 2) For selective restoration, use 'Cherry-pick' to import specific elements (tasks, documents, settings) from an older version without replacing everything. Before major changes, use 'Create Backup' to ensure you can easily revert if needed."
              },
              {
                question: "How do I compare different versions of my project plan?",
                answer: "Use the comparison tool to evaluate versions side by side. In the Versions tab, select two versions and click 'Compare'. This generates a detailed comparison highlighting differences in task counts, timeline changes, resource allocations, and completion metrics. The visual diff tool shows added, removed, and modified elements with color coding. You can export this comparison as a report for stakeholder review or documentation purposes. For specific tasks, the 'History' feature shows version-to-version changes."
              },
              {
                question: "What happens when I update a project plan—does it automatically sync with the active project?",
                answer: "When you update the project plan that an active project is based on, you'll be prompted with sync options: 1) 'Auto-merge' - automatically incorporates non-conflicting changes while preserving existing project progress, 2) 'Manual review' - shows all changes and lets you choose which to apply, 3) 'Create new version' - keeps the original project unchanged and creates a parallel version with the updates. Changes to in-progress tasks require special attention to preserve work already done."
              },
              {
                question: "How do I archive or export a completed project plan?",
                answer: "To archive a project, go to Project Settings → Advanced and select 'Archive Project'. Archived projects don't appear in standard views but remain accessible through the Archive section. For exporting, go to Project Settings → Export and choose your format (PDF, Excel, MS Project, HTML, or JSON). You can customize the export to include all project data or specific sections. Enable 'Include attachments' to bundle all project files. For regulatory compliance, use 'Certified Export' which includes digital signatures and timestamp verification."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: "AI Features",
    description: "Discover how to leverage the AI-powered features to enhance your productivity",
    icon: { name: "SparklesIcon" },
    articles: [
      {
        title: "Working with AI Assistant",
        slug: "ai-assistant-guide",
        excerpt: "Learn how to get the most out of our AI assistant to improve your workflow",
        content: "This article guides you through effectively using the AI assistant throughout the platform.",
        difficulty: "intermediate",
        sections: [
          {
            title: "Getting Started with AI Assistant",
            questions: [
              {
                question: "What is the AI Assistant and how do I activate it?",
                answer: "The AI Assistant is our intelligent helper that offers guidance, answers questions, and automates tasks across the platform. It's always accessible through the assistant icon (lightbulb symbol) in the bottom right corner of any page. Click this icon to open the assistant chat panel. The assistant is activated by default for all accounts and doesn't require separate setup. For voice interaction, click the microphone icon in the chat panel and grant browser permission to use your microphone."
              },
              {
                question: "How can the AI Assistant help me gather project details?",
                answer: "The AI Assistant can help gather project details through: 1) Guided interviews - answer questions about your project to build a comprehensive brief, 2) Document analysis - upload existing documents about your project and have the AI extract key information, 3) Website analysis - enter your existing website URL to analyze content and structure, 4) Competitor research - provide competitor names for the AI to gather insights, and 5) Requirement generation - describe your core needs in conversation, and the AI will structure them into formal requirements."
              },
              {
                question: "Do I need a separate subscription for AI features?",
                answer: "No, the core AI Assistant features are included in all subscription plans. Basic functionality like answering questions, generating suggestions, and guiding you through the platform are available to everyone. However, some advanced AI features like code generation, comprehensive market analysis, and large-scale document processing have usage limits that vary by subscription tier. Check your current plan details under Account → Subscription to see your specific AI feature allowances."
              },
              {
                question: "How does the AI Assistant guide me through the Plan Builder process?",
                answer: "During Plan Builder sessions, the AI Assistant provides contextual guidance by: 1) Suggesting relevant features based on your project type, 2) Explaining each step with examples, 3) Identifying potential gaps in your requirements, 4) Offering industry-specific suggestions and best practices, 5) Providing real-time feedback on your entries, and 6) Answering specific questions about app development concepts. The assistant adapts its guidance based on your experience level and project complexity, offering more detailed explanations for beginners."
              },
              {
                question: "What happens if the AI Assistant can't answer my question?",
                answer: "If the AI can't answer your question, it will: 1) Clearly state its limitations rather than providing incorrect information, 2) Suggest rephrasing your question if it seems unclear, 3) Offer to connect you with human support for complex inquiries, 4) Provide links to relevant documentation that might address your needs, or 5) Recommend community forums where similar questions may have been answered. You can report unhelpful responses using the thumbs-down button, which helps improve the system."
              }
            ]
          }
        ]
      }
    ]
  }
];
