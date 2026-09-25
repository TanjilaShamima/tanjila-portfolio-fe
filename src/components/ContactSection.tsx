'use client';

import { profile } from '@/data/profile';
import { Check, Copy, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Section, { Reveal } from './SectionHeading';

const toastTheme = () => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

export interface ContactResponse {
    success?: boolean;
    message?: string;
    error?: string;
}

export interface ContactErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const emptyForm: ContactFormData = { name: '', email: '', subject: '', message: '' };

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validate = (data: ContactFormData): ContactErrors => {
    const errors: ContactErrors = {};

    if (!data.name.trim()) errors.name = 'Name is required';
    else if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters long';

    if (!data.email.trim()) errors.email = 'Email is required';
    else if (!isValidEmail(data.email)) errors.email = 'Please enter a valid email address';

    if (!data.subject.trim()) errors.subject = 'Subject is required';
    else if (data.subject.trim().length < 5) errors.subject = 'Subject must be at least 5 characters long';

    if (!data.message.trim()) errors.message = 'Message is required';
    else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters long';

    return errors;
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <label className="block">
        <span className="mb-1.5 block text-xs font-semibold text-fg">{label}</span>
        {children}
        {error && <span className="mt-1.5 block text-xs font-medium text-red-600 dark:text-red-400">{error}</span>}
    </label>
);

const ContactSection = () => {
    const [formData, setFormData] = useState<ContactFormData>(emptyForm);
    const [errors, setErrors] = useState<ContactErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof ContactErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = validate(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.error('Please fix the errors in the form', { theme: toastTheme() });
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result: ContactResponse = await res.json();

            if (res.ok && result.success) {
                setFormData(emptyForm);
                setErrors({});
                toast.success(result.message, { theme: toastTheme() });
            } else {
                toast.error(result.error || result.message || 'Failed to send message. Please try again later.', { theme: toastTheme() });
            }
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error(`Something went wrong. You can email me directly at ${profile.email}`, { theme: toastTheme() });
        } finally {
            setIsSubmitting(false);
        }
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };

    return (
        <Section id="contact" eyebrow="Contact" title="Let's build something together." description="Have a role, a project or a question about something I wrote? Send a note and I will get back to you.">
            <Reveal className="grid overflow-hidden rounded-3xl border border-line bg-surface shadow-card lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative overflow-hidden border-b border-line bg-gradient-to-br from-accent/[0.14] via-accent/[0.05] to-transparent p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(var(--fg)/0.07)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
                    <div className="relative">
                        <h3 className="text-2xl font-bold tracking-[-0.02em] text-fg">Reach me directly</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">Email is the fastest way to reach me, or call if you prefer.</p>

                        <ul className="mt-7 space-y-3">
                            <li className="flex items-center gap-3 rounded-2xl border border-line bg-surface/80 p-3 backdrop-blur">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-white">
                                    <Mail size={17} />
                                </span>
                                <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 truncate text-sm font-semibold text-fg hover:text-accent-ink">
                                    {profile.email}
                                </a>
                                <button
                                    onClick={copyEmail}
                                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg"
                                    aria-label="Copy email address"
                                >
                                    {copied ? <Check size={16} className="text-accent-ink" /> : <Copy size={16} />}
                                </button>
                            </li>
                            <li>
                                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 rounded-2xl border border-line bg-surface/80 p-3 backdrop-blur transition-colors hover:border-fg/20">
                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-fg/[0.06] text-fg">
                                        <Phone size={17} />
                                    </span>
                                    <span className="text-sm font-semibold text-fg">{profile.phone}</span>
                                </a>
                            </li>
                            <li className="flex items-center gap-3 rounded-2xl border border-line bg-surface/80 p-3 backdrop-blur">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-fg/[0.06] text-fg">
                                    <MapPin size={17} />
                                </span>
                                <span className="text-sm font-semibold text-fg">{profile.location}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-4 p-6 sm:p-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Name" error={errors.name}>
                            <input name="name" value={formData.name} onChange={handleInputChange} className="input" placeholder="Your name" autoComplete="name" />
                        </Field>
                        <Field label="Email" error={errors.email}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="input"
                                placeholder="you@company.com"
                                autoComplete="email"
                            />
                        </Field>
                    </div>
                    <Field label="Subject" error={errors.subject}>
                        <input name="subject" value={formData.subject} onChange={handleInputChange} className="input" placeholder="What is this about?" />
                    </Field>
                    <Field label="Message" error={errors.message}>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            className="input resize-none"
                            placeholder="A few lines about the role or project"
                        />
                    </Field>
                    <button type="submit" disabled={isSubmitting} className="btn-primary w-full !py-3 disabled:cursor-not-allowed disabled:opacity-60">
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Sending
                            </>
                        ) : (
                            <>
                                <Send size={16} /> Send message
                            </>
                        )}
                    </button>
                </form>
            </Reveal>

            <ToastContainer position="bottom-right" autoClose={5000} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </Section>
    );
};

export default ContactSection;
