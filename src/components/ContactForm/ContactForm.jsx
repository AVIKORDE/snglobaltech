import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { submitInquiry } from '../../services/inquiry';
import { EASE } from '../../animations/variants';
import './ContactForm.css';

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  product: '',
  message: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/;

function validate(values) {
  const errors = {};
  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!values.message.trim()) errors.message = 'Please tell us what you are looking for.';
  else if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
}

/** Labelled field wrapper with animated error message. Kept outside the form so inputs never remount. */
function Field({ name, label, required, error, children }) {
  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={name}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${name}-error`}
            className="form-field__error"
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle size={14} aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Contact / inquiry form.
 * `presetProduct` (slug) pre-selects the "Product Interested In" field.
 */
export default function ContactForm({ presetProduct = '' }) {
  const [values, setValues] = useState({ ...initialValues, product: presetProduct });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  useEffect(() => {
    if (presetProduct) setValues((v) => ({ ...v, product: presetProduct }));
  }, [presetProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors(validate({ ...values, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ fullName: true, email: true, phone: true, message: true });
    if (Object.keys(nextErrors).length) {
      const first = document.querySelector('.form-field.has-error input, .form-field.has-error textarea');
      first?.focus();
      return;
    }
    setStatus('submitting');
    setServerError('');
    try {
      const productName = products.find((p) => p.slug === values.product)?.name || '';
      await submitInquiry({ ...values, productName, website: honeypot, source: 'website' });
      setStatus('success');
      setValues({ ...initialValues, product: '' });
      setTouched({});
    } catch (err) {
      if (err.fieldErrors) {
        setErrors(err.fieldErrors);
        setTouched((t) => ({ ...t, ...Object.fromEntries(Object.keys(err.fieldErrors).map((k) => [k, true])) }));
      }
      setServerError(err.message || '');
      setStatus('error');
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    'aria-invalid': Boolean(touched[name] && errors[name]),
    'aria-describedby': touched[name] && errors[name] ? `${name}-error` : undefined,
  });

  const fieldError = (name) => (touched[name] ? errors[name] : undefined);

  if (status === 'success') {
    return (
      <motion.div
        className="form-status form-status--success"
        role="status"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <CheckCircle2 size={44} aria-hidden="true" />
        <h3>Thank you. Your inquiry has been sent.</h3>
        <p>Our export team will review your requirement and get back to you shortly.</p>
        <button type="button" className="form-status__again" onClick={() => setStatus('idle')}>
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: hidden from humans, bots fill it in. Server silently drops such submissions. */}
      <div className="contact-form__hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      <div className="contact-form__grid">
        <Field name="fullName" label="Full Name" required error={fieldError("fullName")}>
          <input type="text" autoComplete="name" placeholder="Your name" required {...fieldProps('fullName')} />
        </Field>
        <Field name="email" label="Email" required error={fieldError("email")}>
          <input type="email" autoComplete="email" placeholder="you@company.com" required {...fieldProps('email')} />
        </Field>
        <Field name="phone" label="Phone Number" error={fieldError("phone")}>
          <input type="tel" autoComplete="tel" placeholder="+91 XXXXX XXXXX" {...fieldProps('phone')} />
        </Field>
        <Field name="company" label="Company Name" error={fieldError("company")}>
          <input type="text" autoComplete="organization" placeholder="Company / organisation" {...fieldProps('company')} />
        </Field>
        <div className="form-field form-field--full">
          <label htmlFor="product">Product Interested In</label>
          <div className="form-select">
            <select {...fieldProps('product')}>
              <option value="">Select a product (optional)</option>
              {categories.map((cat) => (
                <optgroup key={cat.key} label={cat.label}>
                  {products
                    .filter((p) => p.category === cat.key)
                    .map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
        <div className="form-field--full">
          <Field name="message" label="Message" required error={fieldError("message")}>
            <textarea
              rows={5}
              placeholder="Tell us about the products, quantities, destination market and packaging you need."
              required
              {...fieldProps('message')}
            />
          </Field>
        </div>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="form-status form-status--error"
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle size={20} aria-hidden="true" />
            <p>{serverError || 'Something went wrong while sending your inquiry. Please try again or email us directly.'}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="contact-form__footer">
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="spin" size={18} aria-hidden="true" />
              <span>Sending…</span>
            </>
          ) : (
            <>
              <span>Send Inquiry</span>
              <Send size={18} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="contact-form__note">Fields marked * are required. We respond to every inquiry.</p>
      </div>
    </form>
  );
}
