"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { OPEN_SIGNUP_PANEL_EVENT } from "../lib/signupPanelEvents";

const steps = [
  {
    title: "Basic info",
    subtitle: "Tell us who you are so we can personalize your onboarding.",
    fields: ["firstName", "lastName", "phone"],
  },
  {
    title: "Company info",
    subtitle: "Help us shape your CRM workspace around your business.",
    fields: ["companyName", "industry", "companySize", "website"],
  },
  {
    title: "Choose your tier",
    subtitle: "Pick the plan that fits your current growth stage.",
    fields: ["plan"],
  },
  {
    title: "Security setup",
    subtitle: "Lock down your account from day one.",
    fields: ["email", "password", "confirmPassword"],
  },
];

const checkoutStep = {
  title: "Checkout",
  subtitle: "Add billing details to activate your paid workspace.",
  fields: ["cardName", "cardNumber", "expiry", "cvc", "billingZip"],
};

const REVIEW_INTERVAL_MS = 7000;

function generateSecurePassword(length = 16) {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const numbers = "23456789";
  const symbols = "!@#$%^&*()-_=+[]{}";
  const all = upper + lower + numbers + symbols;

  const guaranteed = [
    upper[Math.floor(Math.random() * upper.length)],
    lower[Math.floor(Math.random() * lower.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  const remaining = Array.from({ length: Math.max(length - guaranteed.length, 0) }, () => all[Math.floor(Math.random() * all.length)]);
  const combined = [...guaranteed, ...remaining];

  for (let i = combined.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  return combined.join("");
}

function getPasswordChecks(password) {
  return [
    { key: "length", label: "At least 12 characters", pass: password.length >= 12 },
    { key: "upper", label: "One uppercase letter", pass: /[A-Z]/.test(password) },
    { key: "lower", label: "One lowercase letter", pass: /[a-z]/.test(password) },
    { key: "number", label: "One number", pass: /\d/.test(password) },
    { key: "symbol", label: "One special character", pass: /[^A-Za-z0-9]/.test(password) },
  ];
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path
        d="M2 12s3.8-7 10-7c2.3 0 4.3.9 5.9 2.1M22 12s-3.8 7-10 7c-2.3 0-4.3-.9-5.9-2.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 3l18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false">
      <rect x="9" y="9" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const plans = [
  {
    value: "freemium",
    label: "Freemium",
    detail: "Great for testing the platform and solo operators.",
  },
  {
    value: "basic",
    label: "Basic",
    detail: "For growing teams managing active lead pipelines.",
  },
  {
    value: "advanced",
    label: "Advanced",
    detail: "For agencies scaling automations and client workspaces.",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    detail: "For larger orgs needing advanced controls and support.",
  },
];

const reviews = [
  {
    quote: "Fishin Leads helped us stop duct-taping tools together. Our close rate jumped within the first month.",
    author: "Jordan M.",
    role: "Agency Owner",
  },
  {
    quote: "The workflow automations are incredibly reusable. We launch client setups in a fraction of the time now.",
    author: "Priya S.",
    role: "Operations Lead",
  },
  {
    quote: "Best part is control. One system for our team and clients, without rebuilding the CRM every project.",
    author: "Derek T.",
    role: "Growth Consultant",
  },
  {
    quote: "The interface feels premium and fast. My team adopted it quickly and our reporting is finally consistent.",
    author: "Alina R.",
    role: "Sales Director",
  },
  {
    quote: "Security and usability are both top-tier. This finally gave us one reliable operating system for growth.",
    author: "Marcus L.",
    role: "Technical Founder",
  },
];

export default function SignupPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [attemptedStepTitle, setAttemptedStepTitle] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [isCompleting, setIsCompleting] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const reviewTimerRef = useRef(null);
  const lastReviewSwapAtRef = useRef(0);

  const flowSteps = useMemo(
    () => (selectedPlan === "freemium" ? steps : [...steps, checkoutStep]),
    [selectedPlan],
  );

  const {
    register,
    trigger,
    getValues,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    shouldUnregister: false,
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      companyName: "",
      industry: "",
      companySize: "",
      website: "",
      plan: "basic",
      email: "",
      password: "",
      confirmPassword: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      billingZip: "",
    },
  });

  const activeStep = flowSteps[step];
  const passwordChecks = getPasswordChecks(passwordInput);
  const passwordScore = passwordChecks.filter((item) => item.pass).length;
  const strengthLevel = passwordScore <= 1 ? "Weak" : passwordScore <= 3 ? "Medium" : "Strong";
  const strengthClass = passwordScore <= 1 ? "strength-weak" : passwordScore <= 3 ? "strength-medium" : "strength-strong";

  useEffect(() => {
    const openPanel = () => {
      setSubmitted(false);
      setStep(0);
      setSelectedPlan("basic");
      setAttemptedStepTitle("");
      setPasswordInput("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setCopyStatus("");
      setReviewIndex(0);
      setIsOpen(true);
    };

    window.addEventListener(OPEN_SIGNUP_PANEL_EVENT, openPanel);

    return () => {
      window.removeEventListener(OPEN_SIGNUP_PANEL_EVENT, openPanel);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    lastReviewSwapAtRef.current = Date.now();

    const runReviewTick = () => {
      const now = Date.now();

      if (now - lastReviewSwapAtRef.current >= REVIEW_INTERVAL_MS - 120) {
        setReviewIndex((current) => (current + 1) % reviews.length);
        lastReviewSwapAtRef.current = now;
      }

      reviewTimerRef.current = setTimeout(runReviewTick, REVIEW_INTERVAL_MS);
    };

    reviewTimerRef.current = setTimeout(runReviewTick, REVIEW_INTERVAL_MS);

    return () => {
      if (reviewTimerRef.current) {
        clearTimeout(reviewTimerRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !flowSteps[step]) {
      return;
    }

    clearErrors(flowSteps[step].fields);
  }, [step, isOpen, flowSteps, clearErrors]);

  const closePanel = () => {
    setAttemptedStepTitle("");
    setCopyStatus("");
    setReviewIndex(0);
    setIsOpen(false);
  };

  const handleNext = async () => {
    const currentStep = flowSteps[step];
    const currentStepFields = currentStep.fields;
    setAttemptedStepTitle(currentStep.title);
    const isValid = await trigger(currentStepFields);

    if (!isValid) {
      return;
    }

    const nextStep = Math.min(step + 1, flowSteps.length - 1);
    clearErrors(flowSteps[nextStep].fields);
    setAttemptedStepTitle("");
    setStep(nextStep);
  };

  const handleBack = () => {
    const previousStep = Math.max(step - 1, 0);
    setAttemptedStepTitle("");
    setStep(previousStep);
  };

  const handleCompleteSignup = async () => {
    const currentStep = flowSteps[step];
    const currentStepFields = currentStep.fields;
    setAttemptedStepTitle(currentStep.title);
    const isValid = await trigger(currentStepFields);

    if (!isValid) {
      return;
    }

    setIsCompleting(true);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    setSubmitted(true);
    setIsCompleting(false);
  };

  const startFresh = () => {
    reset();
    setStep(0);
    setSubmitted(false);
    setSelectedPlan("basic");
    setAttemptedStepTitle("");
    setPasswordInput("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setCopyStatus("");
    setIsCompleting(false);
    setReviewIndex(0);
  };

  const isFieldErrorVisible = (fieldName) => {
    return Boolean(errors[fieldName]) && attemptedStepTitle === activeStep.title;
  };

  const handleGeneratePassword = () => {
    const generated = generateSecurePassword(16);
    setValue("password", generated, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    setValue("confirmPassword", generated, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    setPasswordInput(generated);
    setCopyStatus("Generated");
  };

  const handleCopyPassword = async () => {
    const value = getValues("password") || "";

    if (!value) {
      setCopyStatus("No password yet");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("Copied");
    } catch {
      setCopyStatus("Copy failed");
    }
  };

  return (
    <div className={`signup-shell ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <button className="signup-backdrop" type="button" onClick={closePanel} aria-label="Close sign up form" />

      <section className="signup-panel" role="dialog" aria-modal="true" aria-label="Sign up">
        <aside className="signup-left">
          <Image
            src="/images/brand/fishinleads_logo.png"
            alt="Fishin Leads"
            width={460}
            height={109}
            className="-mt-2 mb-5 mx-auto w-[460px] max-w-full h-auto"
          />
          <p className="signup-kicker">Welcome to Fishin Leads</p>
          <h2 className="signup-left-title">Thanks for signing up with us.</h2>
          <p className="signup-left-subtitle">
            Build your CRM once, scale it across every client, and keep your team operating from one secure growth engine.
          </p>
          <ul className="signup-feature-list">
            <li>
              <span className="signup-feature-icon" aria-hidden="true">⚙</span>
              <span>Reusable workflows and automations</span>
            </li>
            <li>
              <span className="signup-feature-icon" aria-hidden="true">📊</span>
              <span>Client-ready dashboards and reporting</span>
            </li>
            <li>
              <span className="signup-feature-icon" aria-hidden="true">🔐</span>
              <span>Security-first account controls</span>
            </li>
          </ul>

          <div className="signup-review-carousel" aria-live="polite">
            <article className="signup-review-card" key={`${reviews[reviewIndex].author}-${reviewIndex}`}>
              <p className="signup-review-stars" aria-label="5 out of 5 stars">★★★★★</p>
              <p className="signup-review-quote">“{reviews[reviewIndex].quote}”</p>
              <p className="signup-review-author">{reviews[reviewIndex].author}</p>
              <p className="signup-review-role">{reviews[reviewIndex].role}</p>
            </article>

            <div className="signup-review-dots" aria-hidden="true">
              {reviews.map((review, index) => (
                <span key={review.author} className={`signup-review-dot ${index === reviewIndex ? "is-active" : ""}`} />
              ))}
            </div>
          </div>
        </aside>

        <div className="signup-right">
          <div className="signup-topbar">
            <p className="signup-step-label">Step {step + 1} of {flowSteps.length}</p>
            <button type="button" className="signup-close" onClick={closePanel}>
              Close
            </button>
          </div>

          <div className="signup-progress" aria-hidden="true">
            <div className="signup-progress-track">
              <span className="signup-progress-fill" style={{ width: `${((step + 1) / flowSteps.length) * 100}%` }} />
            </div>
            <div className="signup-progress-steps" style={{ "--step-count": flowSteps.length }}>
              {flowSteps.map((stepItem, index) => (
                <div
                  key={stepItem.title}
                  className={`signup-progress-step ${index === step ? "is-current" : ""} ${index < step ? "is-complete" : ""}`}
                >
                  <span className="signup-progress-dot">{index + 1}</span>
                  <small>{stepItem.title}</small>
                </div>
              ))}
            </div>
          </div>

          {!submitted ? (
            <form
              className="signup-form"
              onSubmit={(event) => {
                event.preventDefault();
                if (step === flowSteps.length - 1) {
                  void handleCompleteSignup();
                }
              }}
              noValidate
            >
              <h3 className="signup-form-title">{activeStep.title}</h3>
              <p className="signup-form-subtitle">{activeStep.subtitle}</p>

              {step === 0 && (
                <div className="signup-grid two-col">
                  <label className="signup-field">
                    <span>First name <b>*</b></span>
                    <input
                      className={errors.firstName ? "is-invalid" : ""}
                      aria-invalid={errors.firstName ? "true" : "false"}
                      {...register("firstName", { required: "First name is required." })}
                    />
                    {errors.firstName ? <em className="signup-error">{errors.firstName.message}</em> : null}
                  </label>

                  <label className="signup-field">
                    <span>Last name <b>*</b></span>
                    <input
                      className={errors.lastName ? "is-invalid" : ""}
                      aria-invalid={errors.lastName ? "true" : "false"}
                      {...register("lastName", { required: "Last name is required." })}
                    />
                    {errors.lastName ? <em className="signup-error">{errors.lastName.message}</em> : null}
                  </label>

                  <label className="signup-field two-col-span">
                    <span>Phone <b>*</b></span>
                    <input
                      className={errors.phone ? "is-invalid" : ""}
                      aria-invalid={errors.phone ? "true" : "false"}
                      {...register("phone", {
                        required: "Phone is required.",
                        minLength: { value: 10, message: "Use at least 10 digits." },
                      })}
                    />
                    {errors.phone ? <em className="signup-error">{errors.phone.message}</em> : null}
                  </label>
                </div>
              )}

              {step === 1 && (
                <div className="signup-grid two-col">
                  <label className="signup-field two-col-span">
                    <span>Company name <b>*</b></span>
                    <input
                      className={errors.companyName ? "is-invalid" : ""}
                      aria-invalid={errors.companyName ? "true" : "false"}
                      {...register("companyName", { required: "Company name is required." })}
                    />
                    {errors.companyName ? <em className="signup-error">{errors.companyName.message}</em> : null}
                  </label>

                  <label className="signup-field">
                    <span>Industry <b>*</b></span>
                    <select
                      className={errors.industry ? "is-invalid" : ""}
                      aria-invalid={errors.industry ? "true" : "false"}
                      {...register("industry", { required: "Industry is required." })}
                    >
                      <option value="">Select industry</option>
                      <option value="marketing-agency">Marketing Agency</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="legal">Legal Services</option>
                      <option value="home-services">Home Services</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="saas-tech">SaaS / Technology</option>
                      <option value="financial-services">Financial Services</option>
                      <option value="education-coaching">Education / Coaching</option>
                      <option value="automotive">Automotive</option>
                      <option value="hospitality-travel">Hospitality / Travel</option>
                      <option value="nonprofit">Nonprofit</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry ? <em className="signup-error">{errors.industry.message}</em> : null}
                  </label>

                  <label className="signup-field">
                    <span>Company size <b>*</b></span>
                    <select
                      className={errors.companySize ? "is-invalid" : ""}
                      aria-invalid={errors.companySize ? "true" : "false"}
                      {...register("companySize", { required: "Select a company size." })}
                    >
                      <option value="">Select one</option>
                      <option value="1-5">1-5</option>
                      <option value="6-20">6-20</option>
                      <option value="21-50">21-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201+">201+</option>
                    </select>
                    {errors.companySize ? <em className="signup-error">{errors.companySize.message}</em> : null}
                  </label>

                  <label className="signup-field two-col-span">
                    <span>Website</span>
                    <input placeholder="https://" {...register("website")} />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="signup-plan-grid">
                  {plans.map((plan) => (
                    <label
                      key={plan.value}
                      className={`signup-plan-option ${selectedPlan === plan.value ? "is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        value={plan.value}
                        {...register("plan", {
                          required: "Please choose a plan tier.",
                          onChange: (event) => {
                            setSelectedPlan(event.target.value);
                            clearErrors(["email", "password", "confirmPassword", "cardName", "cardNumber", "expiry", "cvc", "billingZip"]);
                          },
                        })}
                      />
                      <span>
                        <strong>{plan.label}</strong>
                        <small className="signup-plan-summary">{plan.detail}</small>
                        {selectedPlan === plan.value ? (
                          <small className="signup-plan-expand">
                            Includes onboarding playbooks, automation starter templates, and scalable contact limits for growing teams.
                          </small>
                        ) : null}
                      </span>
                    </label>
                  ))}
                  {errors.plan ? <em className="signup-error">{errors.plan.message}</em> : null}
                </div>
              )}

              {step === 3 && (
                <div className="signup-grid one-col">
                  <label className="signup-field">
                    <span>Email <b>*</b></span>
                    <input
                      type="email"
                      className={isFieldErrorVisible("email") ? "is-invalid" : ""}
                      aria-invalid={isFieldErrorVisible("email") ? "true" : "false"}
                      {...register("email", {
                        required: "Email is required.",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Enter a valid email address.",
                        },
                      })}
                    />
                    {isFieldErrorVisible("email") ? <em className="signup-error">{errors.email.message}</em> : null}
                  </label>

                  <label className="signup-field">
                    <span>Password <b>*</b></span>
                    <div className="signup-password-control">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={isFieldErrorVisible("password") ? "is-invalid" : ""}
                        aria-invalid={isFieldErrorVisible("password") ? "true" : "false"}
                        {...register("password", {
                          required: "Password is required.",
                          minLength: { value: 8, message: "Use at least 8 characters." },
                          onChange: (event) => {
                            setPasswordInput(event.target.value);
                            if (copyStatus) {
                              setCopyStatus("");
                            }
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="signup-eye-btn"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    {isFieldErrorVisible("password") ? <em className="signup-error">{errors.password.message}</em> : null}
                  </label>

                  <label className="signup-field">
                    <span>Confirm password <b>*</b></span>
                    <div className="signup-password-control">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={isFieldErrorVisible("confirmPassword") ? "is-invalid" : ""}
                        aria-invalid={isFieldErrorVisible("confirmPassword") ? "true" : "false"}
                        {...register("confirmPassword", {
                          required: "Please confirm your password.",
                          validate: (value) => value === getValues("password") || "Passwords do not match.",
                        })}
                      />
                      <button
                        type="button"
                        className="signup-eye-btn"
                        onClick={() => setShowConfirmPassword((current) => !current)}
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    {isFieldErrorVisible("confirmPassword") ? <em className="signup-error">{errors.confirmPassword.message}</em> : null}
                  </label>

                  <div className="signup-password-tools">
                    <button type="button" className="btn signup-btn-secondary" onClick={handleGeneratePassword}>
                      Generate secure password
                    </button>
                    <button
                      type="button"
                      className="btn signup-btn-secondary signup-copy-btn"
                      onClick={handleCopyPassword}
                      aria-label="Copy password"
                      title="Copy password"
                    >
                      <CopyIcon />
                    </button>
                    {copyStatus ? <span className="signup-copy-status">{copyStatus}</span> : null}
                  </div>

                  <div className="signup-password-meter" aria-live="polite">
                    <div className="signup-password-meter-head">
                      <span>Password strength</span>
                      <strong className={strengthClass}>{strengthLevel}</strong>
                    </div>
                    <div className="signup-password-meter-track">
                      <span className={`signup-password-meter-fill ${strengthClass}`} style={{ width: `${(passwordScore / 5) * 100}%` }} />
                    </div>
                    <ul className="signup-password-checks">
                      {passwordChecks.map((rule) => (
                        <li key={rule.key} className={rule.pass ? "is-pass" : ""}>
                          <span aria-hidden="true">{rule.pass ? "✓" : "•"}</span>
                          <span>{rule.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              )}

              {activeStep.title === "Checkout" && (
                <div className="signup-grid two-col">
                  <label className="signup-field two-col-span">
                    <span>Name on card <b>*</b></span>
                    <input
                      className={isFieldErrorVisible("cardName") ? "is-invalid" : ""}
                      aria-invalid={isFieldErrorVisible("cardName") ? "true" : "false"}
                      {...register("cardName", { required: "Name on card is required." })}
                    />
                    {isFieldErrorVisible("cardName") ? <em className="signup-error">{errors.cardName.message}</em> : null}
                  </label>

                  <label className="signup-field two-col-span">
                    <span>Card number <b>*</b></span>
                    <input
                      className={isFieldErrorVisible("cardNumber") ? "is-invalid" : ""}
                      aria-invalid={isFieldErrorVisible("cardNumber") ? "true" : "false"}
                      {...register("cardNumber", {
                        required: "Card number is required.",
                        minLength: { value: 12, message: "Enter a valid card number." },
                      })}
                    />
                    {isFieldErrorVisible("cardNumber") ? <em className="signup-error">{errors.cardNumber.message}</em> : null}
                  </label>

                  <label className="signup-field">
                    <span>Expiry <b>*</b></span>
                    <input
                      placeholder="MM/YY"
                      className={isFieldErrorVisible("expiry") ? "is-invalid" : ""}
                      aria-invalid={isFieldErrorVisible("expiry") ? "true" : "false"}
                      {...register("expiry", { required: "Expiry is required." })}
                    />
                    {isFieldErrorVisible("expiry") ? <em className="signup-error">{errors.expiry.message}</em> : null}
                  </label>

                  <label className="signup-field">
                    <span>CVC <b>*</b></span>
                    <input
                      className={isFieldErrorVisible("cvc") ? "is-invalid" : ""}
                      aria-invalid={isFieldErrorVisible("cvc") ? "true" : "false"}
                      {...register("cvc", {
                        required: "CVC is required.",
                        minLength: { value: 3, message: "Enter a valid CVC." },
                      })}
                    />
                    {isFieldErrorVisible("cvc") ? <em className="signup-error">{errors.cvc.message}</em> : null}
                  </label>

                  <label className="signup-field two-col-span">
                    <span>Billing ZIP / Postal code <b>*</b></span>
                    <input
                      className={isFieldErrorVisible("billingZip") ? "is-invalid" : ""}
                      aria-invalid={isFieldErrorVisible("billingZip") ? "true" : "false"}
                      {...register("billingZip", { required: "Billing ZIP is required." })}
                    />
                    {isFieldErrorVisible("billingZip") ? <em className="signup-error">{errors.billingZip.message}</em> : null}
                  </label>
                </div>
              )}

              <div className="signup-actions">
                <button type="button" className="btn signup-btn-secondary" onClick={step === 0 ? closePanel : handleBack}>
                  {step === 0 ? "Cancel" : "Back"}
                </button>

                {step < flowSteps.length - 1 ? (
                  <button type="button" className="btn btn-primary signup-btn-primary" onClick={handleNext}>
                    Continue
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary signup-btn-primary" disabled={isCompleting}>
                    {isCompleting ? "Creating..." : "Create Account"}
                  </button>
                )}
              </div>
            </form>
          ) : (
            <div className="signup-success">
              <h3>Your account request is in.</h3>
              <p>
                Awesome choice. We’ll send setup details and onboarding instructions to your inbox shortly.
              </p>
              <div className="signup-actions">
                <button type="button" className="btn signup-btn-secondary" onClick={startFresh}>
                  Start Another
                </button>
                <button type="button" className="btn btn-primary signup-btn-primary" onClick={closePanel}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
