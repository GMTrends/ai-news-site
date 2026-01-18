/**
 * UNIFIED NEWSLETTER SYSTEM
 * Consolidates 3 newsletter components into 1 optimized system
 * Eliminates duplicate event listeners and optimizes performance
 */

class NewsletterManager {
  private static instance: NewsletterManager;
  private initialized = false;
  private csrfToken: string | null = null;
  
  // Prevent multiple instances
  public static getInstance(): NewsletterManager {
    if (!NewsletterManager.instance) {
      NewsletterManager.instance = new NewsletterManager();
    }
    return NewsletterManager.instance;
  }

  public async init(): Promise<void> {
    if (this.initialized) return;
    
    console.log('🚀 Initializing Unified Newsletter System');
    
    // Get CSRF token once for all forms
    await this.initCSRFToken();
    
    // Initialize all newsletter forms on the page
    this.initForms();
    
    this.initialized = true;
  }

  private async initCSRFToken(): Promise<void> {
    try {
      const response = await fetch('/api/csrf-token');
      if (response.ok) {
        const data = await response.json();
        this.csrfToken = data.token;
      }
    } catch (error) {
      console.warn('Failed to fetch CSRF token:', error);
    }
  }

  private initForms(): void {
    // Find all newsletter forms with unified selector
    const forms = document.querySelectorAll('[data-newsletter-form]');
    
    forms.forEach((form) => {
      const formElement = form as HTMLFormElement;
      const formType = formElement.dataset.newsletterForm || 'default';
      
      // Remove any existing listeners to prevent duplicates
      const newForm = formElement.cloneNode(true) as HTMLFormElement;
      formElement.parentNode?.replaceChild(newForm, formElement);
      
      // Add single optimized listener
      this.attachFormListener(newForm, formType);
    });
  }

  private attachFormListener(form: HTMLFormElement, formType: string): void {
    const emailInput = form.querySelector('[data-email-input]') as HTMLInputElement;
    const submitButton = form.querySelector('[data-submit-button]') as HTMLButtonElement;
    const messageContainer = form.querySelector('[data-message-container]') as HTMLElement;
    const honeypotField = form.querySelector('[data-honeypot]') as HTMLInputElement;
    
    if (!emailInput || !submitButton) {
      console.warn(`Newsletter form missing required elements: ${formType}`);
      return;
    }

    // Set CSRF token if available
    const csrfInput = form.querySelector('[data-csrf-token]') as HTMLInputElement;
    if (csrfInput && this.csrfToken) {
      csrfInput.value = this.csrfToken;
    }

    // Single event listener per form
    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      await this.handleSubscription(emailInput, submitButton, messageContainer, honeypotField, formType);
    };

    // Attach listeners efficiently
    form.addEventListener('submit', handleSubmit, { passive: false });
    
    // Optional: Enter key support
    emailInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
      }
    });
  }

  private async handleSubscription(
    emailInput: HTMLInputElement,
    submitButton: HTMLButtonElement,
    messageContainer: HTMLElement | null,
    honeypotField: HTMLInputElement | null,
    formType: string
  ): Promise<void> {
    
    const email = emailInput.value.trim();
    
    // Validation
    if (!email) {
      this.showMessage(messageContainer, 'Please enter your email address', 'error');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.showMessage(messageContainer, 'Please enter a valid email address', 'error');
      return;
    }

    // Bot protection
    if (honeypotField?.value) {
      console.warn('Bot detected');
      return;
    }

    // Set loading state
    this.setLoadingState(submitButton, emailInput, true);
    this.showMessage(messageContainer, 'Subscribing...', 'loading');

    try {
      const response = await fetch('/api/subscribe.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          email,
          formType,
          _csrf: this.csrfToken,
          honeypot: honeypotField?.value || ''
        })
      });

      const result = await response.json();

      // Update CSRF token if provided
      const newToken = response.headers.get('X-CSRF-Token');
      if (newToken) {
        this.csrfToken = newToken;
        const csrfInput = emailInput.closest('form')?.querySelector('[data-csrf-token]') as HTMLInputElement;
        if (csrfInput) csrfInput.value = newToken;
      }

      if (response.ok && result.success) {
        this.showMessage(messageContainer, result.message || 'Successfully subscribed!', 'success');
        emailInput.value = '';
        
        // Track successful subscription
        this.trackSubscription(formType, email);
      } else {
        this.showMessage(messageContainer, result.error || 'Failed to subscribe. Please try again.', 'error');
      }

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      this.showMessage(messageContainer, 'Network error. Please check your connection and try again.', 'error');
    } finally {
      this.setLoadingState(submitButton, emailInput, false);
    }
  }

  private setLoadingState(button: HTMLButtonElement, input: HTMLInputElement, loading: boolean): void {
    button.disabled = loading;
    input.disabled = loading;
    
    if (loading) {
      button.classList.add('loading');
      button.setAttribute('aria-busy', 'true');
    } else {
      button.classList.remove('loading');
      button.removeAttribute('aria-busy');
    }
  }

  private showMessage(container: HTMLElement | null, message: string, type: 'success' | 'error' | 'loading'): void {
    if (!container) return;
    
    container.textContent = message;
    container.className = `form-message ${type}`;
    container.style.display = 'block';
    
    // Auto-hide success messages
    if (type === 'success') {
      setTimeout(() => {
        if (container) container.style.display = 'none';
      }, 5000);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private trackSubscription(formType: string, email: string): void {
    // Optional: Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'newsletter_subscription', {
        method: formType,
        email_domain: email.split('@')[1]
      });
    }
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  NewsletterManager.getInstance().init();
});

// Export for manual initialization if needed
declare global {
  interface Window {
    NewsletterManager: typeof NewsletterManager;
  }
}

window.NewsletterManager = NewsletterManager;
