"use client";

import { Check, CircleCheck } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";

import { AssetIcon, Button } from "@/components/ui";
import type { InquiryCategory, InquiryCategoryId } from "@/lib/api";
import { cn } from "@/lib/utils";

import { contactFormContent } from "../data";

type FieldName = "firstName" | "lastName" | "email" | "organization" | "subject" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName | "category" | "consent", string>>;

const emptyValues: Values = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Values, category: string, consent: boolean): Errors {
  const errors: Errors = {};
  if (!values.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Please enter a valid email address, like name@example.com.";
  if (!category) errors.category = "Please choose an inquiry category.";
  if (!values.subject.trim()) errors.subject = "Please add a short subject.";
  if (!values.message.trim()) errors.message = "Please tell us a little about your question.";
  if (!consent) errors.consent = "Please confirm we can use this information to reply.";
  return errors;
}

/** Shared input look — Figma "Input" (14:16796): white, 1px border, 8px radius, 16px padding. */
const controlClass =
  "w-full rounded-control border bg-surface px-4 text-control text-fg placeholder:text-fg-muted transition-colors focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary disabled:cursor-not-allowed";

type ContactFormProps = {
  categories: InquiryCategory[];
  category: InquiryCategoryId | "";
  onCategoryChange: (id: InquiryCategoryId) => void;
  /** Disables the category select while the categories are loading or failed. */
  categoriesReady: boolean;
  /** From GET /api/stats → social.instagram; offered as the way to reach the team. */
  instagramHandle: string;
  instagramUrl: string;
};

/**
 * "Contact form" (Figma 14:16788): Neutrals/300 panel, 24px radius, 36px padding,
 * 24px between rows. Client-side validation with inline, announced errors.
 *
 * The GDGoC UGM API is read-only (no endpoint accepts messages), so a valid form is
 * not sent anywhere. The confirmation says so plainly and points to Instagram, the
 * channel the API provides. TODO: POST the payload once an endpoint exists.
 */
export function ContactForm({
  categories,
  category,
  onCategoryChange,
  categoriesReady,
  instagramHandle,
  instagramUrl,
}: ContactFormProps) {
  const { fields } = contactFormContent;
  const formId = useId();
  const [values, setValues] = useState<Values>(emptyValues);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  const update = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, category, consent);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }
    setSubmittedName(values.firstName.trim());
  };

  const inputProps = (name: FieldName) => ({
    id: fieldId(name),
    name,
    value: values[name],
    placeholder: fields[name].placeholder,
    required: fields[name].required,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
    onChange: (event: { target: { value: string } }) => update(name, event.target.value),
    className: cn(controlClass, errors[name] ? "border-brand-red" : "border-border"),
  });

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-card bg-surface-muted p-6 md:p-9">
      <div className="flex items-center justify-between gap-4">
        <h2
          id={`${formId}-heading`}
          className="text-heading-28 font-bold text-fg md:text-heading-30"
        >
          {contactFormContent.heading}
        </h2>
        <span aria-hidden className="font-inter text-glyph-28 leading-none text-link">
          ↗
        </span>
      </div>

      {submittedName !== null ? (
        <div role="status" className="flex flex-col items-start gap-4 rounded-box bg-surface p-6">
          <CircleCheck aria-hidden className="size-7 text-brand-green" />
          <p className="text-heading-24 font-bold text-fg">Thanks, {submittedName}!</p>
          <p className="text-body text-fg-muted">
            Your message looks good, but online sending isn’t available yet, so it hasn’t been
            delivered. Please reach the team on Instagram at{" "}
            <strong className="font-bold">{instagramHandle}</strong> for now.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="link"
              withArrow
            >
              Message {instagramHandle}
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </Button>
            {/* Returns to the form with everything the visitor typed still filled in. */}
            <Button variant="link" onClick={() => setSubmittedName(null)}>
              Edit your message
            </Button>
          </div>
        </div>
      ) : (
        <form
          noValidate
          aria-labelledby={`${formId}-heading`}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <p className="text-caption leading-auto text-fg-muted">
            {contactFormContent.requiredNote}
          </p>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
            <Field
              label={fields.firstName.label}
              required
              htmlFor={fieldId("firstName")}
              error={errors.firstName}
              errorId={errorId("firstName")}
            >
              <input type="text" autoComplete="given-name" {...inputProps("firstName")} />
            </Field>
            <Field label={fields.lastName.label} htmlFor={fieldId("lastName")}>
              <input type="text" autoComplete="family-name" {...inputProps("lastName")} />
            </Field>
          </div>

          <Field
            label={fields.email.label}
            required
            htmlFor={fieldId("email")}
            error={errors.email}
            errorId={errorId("email")}
          >
            <input type="email" autoComplete="email" inputMode="email" {...inputProps("email")} />
          </Field>

          <Field label={fields.organization.label} htmlFor={fieldId("organization")}>
            <input type="text" autoComplete="organization" {...inputProps("organization")} />
          </Field>

          <Field
            label={fields.category.label}
            required
            htmlFor={fieldId("category")}
            error={errors.category}
            errorId={errorId("category")}
          >
            <div className="relative">
              <select
                id={fieldId("category")}
                name="category"
                required
                value={category}
                disabled={!categoriesReady}
                aria-invalid={errors.category ? true : undefined}
                aria-describedby={errors.category ? errorId("category") : undefined}
                onChange={(event) => {
                  onCategoryChange(event.target.value);
                  setErrors((prev) => ({ ...prev, category: undefined }));
                }}
                className={cn(
                  controlClass,
                  "h-input-h appearance-none pr-12",
                  category ? "text-fg" : "text-fg-muted",
                  errors.category ? "border-brand-red" : "border-border",
                )}
              >
                <option value="" disabled>
                  {categoriesReady ? "Choose a topic" : "Loading topics…"}
                </option>
                {categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <AssetIcon
                name="selectChevron"
                className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2"
              />
            </div>
          </Field>

          <Field
            label={fields.subject.label}
            required
            htmlFor={fieldId("subject")}
            error={errors.subject}
            errorId={errorId("subject")}
          >
            <input type="text" {...inputProps("subject")} />
          </Field>

          <Field
            label={fields.message.label}
            required
            htmlFor={fieldId("message")}
            error={errors.message}
            errorId={errorId("message")}
          >
            <textarea rows={5} {...inputProps("message")} />
          </Field>

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <span className="relative flex size-6 shrink-0 items-center justify-center">
                <input
                  id={fieldId("consent")}
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? errorId("consent") : undefined}
                  onChange={(event) => {
                    setConsent(event.target.checked);
                    setErrors((prev) => ({ ...prev, consent: undefined }));
                  }}
                  className={cn(
                    "peer size-4.5 cursor-pointer appearance-none rounded-[5px] border-[1.5px] bg-transparent transition-colors checked:border-link checked:bg-link focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    errors.consent ? "border-brand-red" : "border-fg-muted",
                  )}
                />
                <Check
                  aria-hidden
                  strokeWidth={3}
                  className="pointer-events-none absolute size-3 text-fg-inverse opacity-0 peer-checked:opacity-100"
                />
              </span>
              <label
                htmlFor={fieldId("consent")}
                className="cursor-pointer text-caption text-fg-muted"
              >
                {contactFormContent.consent}
              </label>
            </div>
            {errors.consent && <FieldError id={errorId("consent")}>{errors.consent}</FieldError>}
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" withArrow>
              {contactFormContent.submit}
            </Button>
            <p className="text-eyebrow leading-auto text-fg-muted sm:w-57.5">
              {contactFormContent.privacyNote}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  errorId?: string;
  children: ReactNode;
};

/** "Form field" (Figma 14:16794): 14px Medium label, control 10px below. */
function Field({ label, htmlFor, required, error, errorId, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2.5 [&_input]:h-input-h [&_textarea]:h-36.5 [&_textarea]:resize-y [&_textarea]:py-4">
      <label htmlFor={htmlFor} className="text-small leading-auto font-medium text-fg">
        {label}
        {required && <span aria-hidden> *</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && errorId && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-center gap-2 text-caption leading-auto text-fg">
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand-red" />
      {children}
    </p>
  );
}
