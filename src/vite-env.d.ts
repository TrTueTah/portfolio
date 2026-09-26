// This file is needed to support autocomplete for import.meta.env

/// <reference types="vite/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    RESEND_API_KEY?: string;
    RESEND_FROM_EMAIL?: string;
    CONTACT_TO_EMAIL?: string;
    CONTACT_SITE_URL?: string;
    RESEND_TEMPLATE_CONTACT_USER?: string;
    RESEND_TEMPLATE_CONTACT_ADMIN?: string;
  }
}
