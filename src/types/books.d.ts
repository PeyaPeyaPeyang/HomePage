export interface Book {
    isbn: number
    title: {
        original: string
        kana: string
        sub?: string
    }
    volume?: string
    author: {
        main: AuthorEntry
        sub?: AuthorEntry
        other?: AuthorEntry
    }
    kind: {
        name: string
        code: number
    }
    publisher: {
        name: string
        label: string
        series?: string
    }
    size: string
    link: string
    notes?: {
        1?: string
        2?: string
    }
    purchase: {
        status: string
        price?: {
            original: PriceEntry
            purchase?: PriceEntry
        }
    }
    publish: {
        first: DateEntry
        edition?: DateEntry & {
            edition?: string
        }
        schedule?: DateEntry
    }
    page: number
    memo?: string
    image?: string
    details?: {
        1?: string
        2?: string
    }
    cabinet?: string
    lend?: {
        cabinet?: string
        date?: DateEntry
    }
    read?: {
        status: string
        start?: DateEntry
        end?: DateEntry
    }
    other?: {
        1?: DateEntry
        2?: DateEntry
        3?: DateEntry
        4?: DateEntry
        5?: string
        6?: string
        7?: string
    }
}

export interface AuthorEntry {
    name: string
    kana: string
}

export interface PriceEntry {
    price: number
    tax?: number
}

export interface DateEntry {
    year: number
    month: number
    day: number
}
