'use client';
/* from-purple-500 via-pink-500 to-yellow-500 */

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const createOrganizationSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  imageUrl: z.string().url({ message: 'Invalid URL.' }),
});

type CreateOrganizationFormValues = z.infer<typeof createOrganizationSchema>;

const CreateOrganizationDialog: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateOrganizationFormValues>({
    resolver: zodResolver(createOrganizationSchema),
  });

  const onSubmit: SubmitHandler<CreateOrganizationFormValues> = (data) => {
    console.log('Form Data:', data);
    setIsDialogOpen(false); 
    reset(); 
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true); 
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    reset(); 
  };

  return (
    <>
      {/* Button to open the dialog */}
      <Button
        onClick={handleOpenDialog}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-white text-xl mb-6 px-6 py-3 rounded-full flex items-center justify-center w-64 h-16 text-center shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        Create Organization
      </Button>

      {/* Dialog for creating the organization */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg mx-auto p-8 bg-gradient-to-r from-white to-gray-100 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-800">Create an Organization</DialogTitle>
          </DialogHeader>

          {/* Form for submitting organization details */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Organization Title Input */}
            <div>
              <Label htmlFor="title" className="text-lg font-semibold text-gray-700">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter organization title"
                {...register('title')}
                className="mt-2 p-2 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-indigo-500"
              />
              {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            {/* Image URL Input */}
            <div>
              <Label htmlFor="imageUrl" className="text-lg font-semibold text-gray-700">
                Image URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="imageUrl"
                placeholder="Enter image URL"
                {...register('imageUrl')}
                className="mt-2 p-2 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-indigo-500"
              />
              {errors.imageUrl && <p className="text-red-500 mt-1">{errors.imageUrl.message}</p>}
            </div>

            <DialogFooter className="space-y-4">
              {/* Add Members Button */}
              <Button
                type="button"
                variant="outline"
                className="text-indigo-600 border-indigo-500 border-2 hover:bg-indigo-50 px-4 py-2 rounded-full"
              >
                Add Members
              </Button>

              {/* Remove Members Button */}
              <Button
                type="button"
                variant="outline"
                className="text-red-600 border-red-500 border-2 hover:bg-red-50 px-4 py-2 rounded-full"
              >
                Remove Members
              </Button>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-between">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCloseDialog}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateOrganizationDialog;

