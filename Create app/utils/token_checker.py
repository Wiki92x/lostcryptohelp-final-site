def analyze_approvals(txs):
    flagged = []
    known_risky = ['0x000...rugwallet', '0x111...honeypot']  # Example flagged spender list

    seen = set()
    for tx in txs:
        spender = tx.get("to")
        token = tx.get("tokenSymbol")
        contract = tx.get("contractAddress")

        if not spender or not token or not contract:
            continue

        key = f"{token}_{spender}"
        if key in seen:
            continue
        seen.add(key)

        flagged.append({
            "token": token,
            "spender": spender,
            "contract": contract,
            "allowance": "Unlimited",  # placeholder
            "risk": "High" if spender in known_risky else "Low"
        })

    return flagged