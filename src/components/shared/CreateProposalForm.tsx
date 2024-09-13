'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface CreateProposalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProposalDialog: React.FC<CreateProposalDialogProps> = ({ open, onOpenChange }) => {
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [selectedVoteOption, setSelectedVoteOption] = useState<string | null>(null);
  const [votingDuration, setVotingDuration] = useState('');
  const [voteOptions] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);

  const handleCreateProposalSubmit = () => {
    if (!proposalTitle || !proposalDescription || !selectedVoteOption || !votingDuration) {
      alert('Please fill all fields before submitting.');
      return;
    }

    console.log('New Proposal Created:', {
      title: proposalTitle,
      description: proposalDescription,
      voteOption: selectedVoteOption,
      duration: votingDuration,
    });
    onOpenChange(false); 
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-8 mx-auto bg-[#f7d7f7] rounded-lg shadow-xl transform transition-all md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">Create New Proposal</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">Title:</label>
            <Input
              type="text"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              placeholder="Enter proposal title"
              className="w-full p-3 text-sm border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">Description:</label>
            <textarea
              value={proposalDescription}
              onChange={(e) => setProposalDescription(e.target.value)}
              placeholder="Enter proposal description"
              className="w-full p-3 text-sm border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">Vote Options:</label>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="w-full p-3 text-sm bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-lg shadow-md focus:ring focus:ring-green-300">
                  {selectedVoteOption || 'Select Vote Option'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 w-full bg-white shadow-md rounded-lg border border-gray-300">
                {voteOptions.map((option, index) => (
                  <DropdownMenuItem 
                    key={index} 
                    className="px-4 py-2 hover:bg-blue-100 transition-all"
                    onClick={() => setSelectedVoteOption(option)}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">Voting Duration (in days):</label>
            <Input
              type="number"
              value={votingDuration}
              onChange={(e) => setVotingDuration(e.target.value)}
              placeholder="e.g. 7"
              className="w-full p-3 text-sm border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            />
          </div>
        </div>
        <DialogFooter className="mt-6 flex justify-between">
          <Button 
            onClick={handleCreateProposalSubmit} 
            className="bg-[#54b7f0] text-white px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            Submit
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)} 
            className="bg-blue-100 text-gray-700 px-6 py-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg hover:text-gray-900 hover:scale-105"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposalDialog;
