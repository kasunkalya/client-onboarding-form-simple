import { describe, it, expect } from 'vitest';
import { onboardingSchema } from './schema';

describe('onboardingSchema validation', () => {
  it('should pass with valid data', () => {
    const validData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Analytical Engines Ltd",
      services: ["UI/UX", "Web Dev"],
      budgetUsd: 50000,
      projectStartDate: new Date(new Date().setHours(0,0,0,0)), // today
      acceptTerms: true,
    };
    expect(() => onboardingSchema.parse(validData)).not.toThrow();
  });

  it('should fail if fullName is invalid', () => {
    const invalidData = {
      fullName: "A1", // invalid chars and too short
      email: "ada@example.com",
      companyName: "Company",
      services: ["UI/UX"],
      projectStartDate: new Date(),
      acceptTerms: true,
    };
    expect(() => onboardingSchema.parse(invalidData)).toThrow();
  });

  it('should fail if email is invalid', () => {
    const invalidData = {
      fullName: "Ada Lovelace",
      email: "not-an-email",
      companyName: "Company",
      services: ["UI/UX"],
      projectStartDate: new Date(),
      acceptTerms: true,
    };
    expect(() => onboardingSchema.parse(invalidData)).toThrow();
  });

  it('should fail if no services selected', () => {
    const invalidData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Company",
      services: [],
      projectStartDate: new Date(),
      acceptTerms: true,
    };
    expect(() => onboardingSchema.parse(invalidData)).toThrow();
  });

  it('should fail if budget is below 100', () => {
    const invalidData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Company",
      services: ["UI/UX"],
      budgetUsd: 50,
      projectStartDate: new Date(),
      acceptTerms: true,
    };
    expect(() => onboardingSchema.parse(invalidData)).toThrow();
  });

  it('should fail if projectStartDate is in the past', () => {
    const invalidData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Company",
      services: ["UI/UX"],
      projectStartDate: new Date('2000-01-01'),
      acceptTerms: true,
    };
    expect(() => onboardingSchema.parse(invalidData)).toThrow();
  });

  it('should fail if acceptTerms is false', () => {
    const invalidData = {
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      companyName: "Company",
      services: ["UI/UX"],
      projectStartDate: new Date(),
      acceptTerms: false,
    };
    expect(() => onboardingSchema.parse(invalidData)).toThrow();
  });
});
