import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { siteConfig } from '../data/portfolioData';
import { SectionWrapper } from '../components/SectionWrapper';
import { Icon } from '../components/Icon';
import { useFormValidation } from '../hooks/usePortfolio';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '../lib/animations';

const contactInfo = [
  {
    icon: 'mail',
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: 'phone',
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
  },
  {
    icon: 'map-pin',
    label: 'Location',
    value: siteConfig.location,
    href: undefined,
  },
];

const socialLinks = [
  { icon: 'linkedin', label: 'LinkedIn', href: siteConfig.links.linkedin },
  { icon: 'github', label: 'GitHub', href: siteConfig.links.github },
];

export const Contact: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { errors, validate, clearError } = useFormValidation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      // ============================================================
      // INTEGRATION POINT: Connect to your email service here.
      // Options:
      //   - EmailJS: https://www.emailjs.com/
      //   - Formspree: https://formspree.io/
      //   - Custom API endpoint
      //
      // Example with Formspree:
      //   fetch('https://formspree.io/f/YOUR_FORM_ID', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(formData),
      //   });
      // ============================================================
      console.log('Form data ready to send:', formData);
      setSubmitted(true);
    }
  };

  return (
    <SectionWrapper
      id="contact"
      label="Contact"
      title={
        <>
          Let's build something <span className="gradient-text">useful</span>
        </>
      }
      subtitle="Have a question or want to work together? Get in touch."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12"
      >
        {/* Left: Contact Info */}
        <motion.div variants={fadeInLeft} className="lg:col-span-2 space-y-6">
          {/* Contact details */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--color-accent-primary)]/8 shrink-0">
                  <Icon name={item.icon} size={18} className="text-[var(--color-accent-secondary)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-[var(--color-text-primary)] hover:text-[var(--color-accent-secondary)] transition-colors no-underline font-medium"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-[var(--color-text-primary)] font-medium">
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t border-white/[0.06]">
            <p className="text-xs text-[var(--color-text-muted)] mb-3">Find me online</p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center card-elevated hover:bg-[var(--color-accent-primary)]/10 hover:border-[var(--color-border-hover)] transition-all no-underline"
                  aria-label={link.label}
                >
                  <Icon name={link.icon} size={18} className="text-[var(--color-text-secondary)]" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div variants={fadeInRight} className="lg:col-span-3">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-elevated p-8 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-accent-green)]/10 flex items-center justify-center mx-auto mb-4">
                <Icon name="check" size={24} className="text-[var(--color-accent-green)]" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                Message Received!
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-1">
                Thank you for reaching out. Your message details have been captured.
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mb-6">
                Note: To enable email delivery, connect a form service in the Contact component.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="btn-secondary text-sm"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="card-elevated p-6 md:p-8 space-y-5" noValidate>
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors ${
                    errors.name ? 'border-red-400/50' : 'border-white/[0.08]'
                  }`}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors ${
                    errors.email ? 'border-red-400/50' : 'border-white/[0.08]'
                  }`}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  className={`w-full px-4 py-3 bg-white/[0.03] border rounded-xl text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors resize-y min-h-[120px] ${
                    errors.message ? 'border-red-400/50' : 'border-white/[0.08]'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-400 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary w-full justify-center">
                <Icon name="send" size={16} />
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};
