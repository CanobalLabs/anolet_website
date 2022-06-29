export default function formatValue(val) {
    if (val < 1e4) {
        return val
    }
    else if (val < 1e6 && val >= 1e4) /* 10k - 1m */ {
        return `${+(val / 1e3).toFixed(1)}K+`
    }
    else if (val < 1e9 && val >= 1e6) /* 1m - 1b */ {
        return `${+(val / 1e6).toFixed(1)}M+`
    }
    else if (val < 1e12 && val >= 1e9) /* 1b - 1t */ {
        return `${+(val / 1e9).toFixed(1)}B+`
    }
    else if (val >= 1e12) /* 1t+ */ {
        return `1T...`
    }
}