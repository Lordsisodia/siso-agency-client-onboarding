
import { DocArticle } from '@/types/documentation';
import { v4 as uuidv4 } from 'uuid';

export const collaborationArticles: DocArticle[] = [
  {
    id: 'team-management',
    slug: 'team-management',
    title: 'Team Management',
    excerpt: 'Learn how to create and manage teams, add members, and set permissions',
    content: 'This article covers all aspects of team collaboration on our platform.',
    lastUpdated: '2024-05-12',
    difficulty: 'intermediate',
    sections: [
      {
        id: 'team-creation',
        title: 'Creating & Organizing Teams',
        questions: [
          {
            id: 'create-team',
            slug: 'create-team',
            question: 'How do I create a new team?',
            answer: 'To create a new team, go to Teams in the main navigation, click "Create Team", and enter a team name and optional description. You can then set the team visibility (public or private) and add members by entering their email addresses. Assign appropriate roles to each member (Admin, Editor, or Viewer) based on their responsibilities.'
          },
          {
            id: 'add-members',
            slug: 'add-members',
            question: 'How do I add members to my team?',
            answer: 'To add members to an existing team, navigate to Teams, select the team you want to modify, and click "Members" in the team dashboard. Click "Add Members", enter the email addresses of the people you want to invite (separated by commas for multiple), assign their roles, and click "Send Invites". They\'ll receive an email invitation to join the team.'
          }
        ]
      }
    ]
  }
];
