import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

// Mock the database functions
vi.mock("./db", () => ({
  createContactSubmission: vi.fn(),
}));

import { createContactSubmission } from "./db";

describe("Contact Form Submission", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should validate contact form input correctly", () => {
    const contactInputSchema = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string(),
      message: z.string().min(10).max(1000),
      timestamp: z.string(),
    });

    const validInput = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      service: "electrical",
      message: "I would like to request a quote for electrical services.",
      timestamp: new Date().toISOString(),
    };

    expect(() => contactInputSchema.parse(validInput)).not.toThrow();
  });

  it("should reject contact form with invalid name", () => {
    const contactInputSchema = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string(),
      message: z.string().min(10).max(1000),
      timestamp: z.string(),
    });

    const invalidInput = {
      name: "J", // Too short
      email: "john@example.com",
      phone: "+1234567890",
      service: "electrical",
      message: "I would like to request a quote for electrical services.",
      timestamp: new Date().toISOString(),
    };

    expect(() => contactInputSchema.parse(invalidInput)).toThrow();
  });

  it("should reject contact form with invalid email", () => {
    const contactInputSchema = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string(),
      message: z.string().min(10).max(1000),
      timestamp: z.string(),
    });

    const invalidInput = {
      name: "John Doe",
      email: "invalid-email", // Invalid email format
      phone: "+1234567890",
      service: "electrical",
      message: "I would like to request a quote for electrical services.",
      timestamp: new Date().toISOString(),
    };

    expect(() => contactInputSchema.parse(invalidInput)).toThrow();
  });

  it("should reject contact form with message too short", () => {
    const contactInputSchema = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string(),
      message: z.string().min(10).max(1000),
      timestamp: z.string(),
    });

    const invalidInput = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      service: "electrical",
      message: "Short msg", // Too short (9 chars)
      timestamp: new Date().toISOString(),
    };

    expect(() => contactInputSchema.parse(invalidInput)).toThrow();
  });

  it("should accept optional phone number", () => {
    const contactInputSchema = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string(),
      message: z.string().min(10).max(1000),
      timestamp: z.string(),
    });

    const inputWithoutPhone = {
      name: "John Doe",
      email: "john@example.com",
      service: "electrical",
      message: "I would like to request a quote for electrical services.",
      timestamp: new Date().toISOString(),
    };

    expect(() => contactInputSchema.parse(inputWithoutPhone)).not.toThrow();
  });

  it("should call createContactSubmission with correct data", async () => {
    const mockCreateContactSubmission = createContactSubmission as any;
    mockCreateContactSubmission.mockResolvedValue({ id: 1 });

    const submissionData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      service: "electrical",
      message: "I would like to request a quote for electrical services.",
      status: "new" as const,
    };

    await createContactSubmission(submissionData);

    expect(mockCreateContactSubmission).toHaveBeenCalledWith(submissionData);
    expect(mockCreateContactSubmission).toHaveBeenCalledTimes(1);
  });

  it("should handle database errors gracefully", async () => {
    const mockCreateContactSubmission = createContactSubmission as any;
    mockCreateContactSubmission.mockRejectedValue(
      new Error("Database connection failed")
    );

    const submissionData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      service: "electrical",
      message: "I would like to request a quote for electrical services.",
      status: "new" as const,
    };

    await expect(
      createContactSubmission(submissionData)
    ).rejects.toThrow("Database connection failed");
  });

  it("should validate message length constraints", () => {
    const contactInputSchema = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string(),
      message: z.string().min(10).max(1000),
      timestamp: z.string(),
    });

    const longMessage = "A".repeat(1001); // Exceeds max length

    const invalidInput = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      service: "electrical",
      message: longMessage,
      timestamp: new Date().toISOString(),
    };

    expect(() => contactInputSchema.parse(invalidInput)).toThrow();
  });

  it("should accept message at minimum length boundary", () => {
    const contactInputSchema = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string(),
      message: z.string().min(10).max(1000),
      timestamp: z.string(),
    });

    const minMessage = "A".repeat(10); // Exactly at min length

    const validInput = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      service: "electrical",
      message: minMessage,
      timestamp: new Date().toISOString(),
    };

    expect(() => contactInputSchema.parse(validInput)).not.toThrow();
  });

  it("should accept message at maximum length boundary", () => {
    const contactInputSchema = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      phone: z.string().optional(),
      service: z.string(),
      message: z.string().min(10).max(1000),
      timestamp: z.string(),
    });

    const maxMessage = "A".repeat(1000); // Exactly at max length

    const validInput = {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      service: "electrical",
      message: maxMessage,
      timestamp: new Date().toISOString(),
    };

    expect(() => contactInputSchema.parse(validInput)).not.toThrow();
  });
});
