import mongoose, { Model, Schema } from "mongoose";

export interface ContactSubmissionDoc extends mongoose.Document {
    name: string;
    email: string;
    company: string;
    message: string;
    marketingOptIn?: boolean;
    pageUrl?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    ip?: string | null;
    userAgent?: string | null;
    referer?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<ContactSubmissionDoc>(
    {
        name: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
        email: { type: String, required: true, trim: true, lowercase: true, maxlength: 320 },
        company: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
        message: { type: String, required: true, trim: true, maxlength: 5000 },
        marketingOptIn: { type: Boolean, default: false },
        pageUrl: { type: String, trim: true },
        utm_source: { type: String, trim: true },
        utm_medium: { type: String, trim: true },
        utm_campaign: { type: String, trim: true },
        ip: { type: String, index: true },
        userAgent: { type: String },
        referer: { type: String },
    },
    { timestamps: true },
);

// Useful indexes for ops & simple rate-limiting
ContactSubmissionSchema.index({ email: 1, createdAt: -1 });
ContactSubmissionSchema.index({ ip: 1, createdAt: -1 });

export const ContactSubmission: Model<ContactSubmissionDoc> =
    mongoose.models.ContactSubmission ||
    mongoose.model<ContactSubmissionDoc>("ContactSubmission", ContactSubmissionSchema);
