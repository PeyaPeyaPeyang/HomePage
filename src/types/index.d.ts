import type { bakePassword, submitPassword, getRandomHint } from "@/lib/private/login"

declare global {
    interface Window {
        bakePassword: typeof bakePassword
        submitPassword: typeof submitPassword
        getRandomHint: typeof getRandomHint
    }
}
