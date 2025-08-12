'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { onboardingSchema, OnboardingFormData } from '@/lib/schema';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function OnboardingForm() {
  const searchParams = useSearchParams();
  const prefillServices = searchParams.get('service')?.split(',') || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      services: prefillServices.filter(
        (s): s is 'UI/UX' | 'Branding' | 'Web Dev' | 'Mobile App' =>
          ['UI/UX', 'Branding', 'Web Dev', 'Mobile App'].includes(s)
      ),
    },
  });

  const [success, setSuccess] = useState<OnboardingFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setErrorMessage(null);
      const response = await axios.post(
        process.env.NEXT_PUBLIC_ONBOARD_URL!,
        data,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200 || response.status === 201) {
        setSuccess(data);
        reset();
      }
    } catch (error) {
      setErrorMessage(
        'An error occurred while submitting the form. Please try again.'
      );
    }
  };

  return (
    <div className="w-full flex justify-center p-4 sm:p-6">
      <div className="w-full bg-white rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Client Onboarding
        </h1>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            Success! Submitted: {JSON.stringify(success)}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 sm:space-y-6"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium mb-1"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              {...register('fullName')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium mb-1"
            >
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              {...register('companyName')}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Services Interested In
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['UI/UX', 'Branding', 'Web Dev', 'Mobile App'].map((service) => (
                <label
                  key={service}
                  className="flex items-center border border-gray-200 rounded-md p-2 hover:bg-gray-50"
                >
                  <Controller
                    name="services"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        value={service}
                        checked={field.value?.includes(service as any)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...(field.value || []), service]
                            : (field.value || []).filter(
                                (s: string) => s !== service
                              );
                          field.onChange(updated);
                        }}
                        className="mr-2"
                      />
                    )}
                  />
                  {service}
                </label>
              ))}
            </div>
            {errors.services && (
              <p className="text-red-500 text-xs mt-1">
                {errors.services.message}
              </p>
            )}
          </div>

          {/* Budget */}
          <div>
            <label
              htmlFor="budgetUsd"
              className="block text-sm font-medium mb-1"
            >
              Budget (USD)
            </label>
            <input
              id="budgetUsd"
              type="number"
              {...register('budgetUsd', { valueAsNumber: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.budgetUsd && (
              <p className="text-red-500 text-xs mt-1">
                {errors.budgetUsd.message}
              </p>
            )}
          </div>

          {/* Project Start Date */}
          <div>
            <label
              htmlFor="projectStartDate"
              className="block text-sm font-medium mb-1"
            >
              Project Start Date
            </label>
            <input
              id="projectStartDate"
              type="date"
              {...register('projectStartDate', { valueAsDate: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
            {errors.projectStartDate && (
              <p className="text-red-500 text-xs mt-1">
                {errors.projectStartDate.message}
              </p>
            )}
          </div>

          {/* Accept Terms */}
          <div className="flex items-center">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register('acceptTerms')}
              className="mr-2"
            />
            <label htmlFor="acceptTerms" className="text-sm">
              Accept Terms
            </label>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs ml-2">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
