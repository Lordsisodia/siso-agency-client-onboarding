
import React from 'react';
import { AssistantSetup } from '@/components/plan-builder/AssistantSetup';

export default function AssistantSetupPage() {
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-siso-text">AI Assistant Setup</h1>
        <p className="text-siso-text-muted mt-1">
          Create and configure your OpenAI assistants for the application
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AssistantSetup />
      </div>

      <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Click the "Create Assistant" button above to create a new OpenAI assistant.</li>
          <li>Copy the generated Assistant ID.</li>
          <li>Go to your Supabase dashboard and navigate to Settings &gt; Edge Functions.</li>
          <li>Add or update the <code className="bg-slate-100 p-1 rounded">PLAN_BUILDER_ASSISTANT_ID</code> secret with the copied ID.</li>
          <li>Return to the AI Plan Builder page and try creating a new plan.</li>
        </ol>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <h3 className="font-medium text-amber-800 mb-2">Important Note</h3>
          <p className="text-amber-700">
            Make sure your OpenAI API key has been correctly set in the Supabase Edge Function secrets.
            The API key needs to have permission to access the Assistants API.
          </p>
        </div>
      </div>
    </div>
  );
}
