export const OPEN_SIGNUP_PANEL_EVENT = "open-signup-panel";

export function openSignupPanel() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(OPEN_SIGNUP_PANEL_EVENT));
}
