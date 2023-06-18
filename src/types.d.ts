type Measurement = {
    avg: number
    lower: number
    upper: number
}

type Results = {
    shod: {
        insole?: Measurement
        nominal?: Measurement
        height?: Measurement
    }
    unshod: {
        insole?: Measurement
        nominal?: Measurement
        height?: Measurement
    }
    best: 'insole' | 'nominal' | 'height'
}

type Classification = "Men's" | "Women's" | 'Youth'
type Sex = 'Male' | 'Female'
