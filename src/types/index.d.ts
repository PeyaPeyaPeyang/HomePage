import type { validateEmail, submitContactForm } from "@/lib/contents/contact"
import type { bakePassword, submitPassword, getRandomHint } from "@/lib/private/login"

declare global {
    interface Window {
        validateEmail: typeof validateEmail
        submitContactForm: typeof submitContactForm

        bakePassword: typeof bakePassword
        submitPassword: typeof submitPassword
        getRandomHint: typeof getRandomHint
    }
}
