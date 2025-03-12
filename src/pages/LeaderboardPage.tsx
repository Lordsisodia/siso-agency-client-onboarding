
import React from 'react';
import { MainLayout } from '@/components/assistants/layout/MainLayout';

export default function LeaderboardPage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-siso-red to-siso-orange text-transparent bg-clip-text">
          Leaderboard
        </h1>
        <p className="text-siso-text mb-8">
          See how you rank against other users
        </p>
        <div className="rounded-lg border border-siso-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-siso-bg-darker">
              <tr>
                <th className="text-left p-4">Rank</th>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Points</th>
                <th className="text-left p-4">Projects</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-siso-border">
                <td className="p-4">1</td>
                <td className="p-4">User 1</td>
                <td className="p-4">1000</td>
                <td className="p-4">10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
}
