from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
from app.config import ETHERSCAN_API_KEY, BSCSCAN_API_KEY
from app.utils.token_checker import analyze_approvals

router = APIRouter()

class ApprovalRequest(BaseModel):
    wallet: str
    chain: str

@router.post("/approvals")
def get_token_approvals(payload: ApprovalRequest):
    wallet = payload.wallet
    chain = payload.chain.lower()

    if not wallet.startswith("0x"):
        raise HTTPException(status_code=400, detail="Invalid wallet address")

    # Choose scan API URL
    if chain == "eth":
        api_url = f"https://api.etherscan.io/api?module=account&action=tokentx&address={wallet}&sort=desc&apikey={ETHERSCAN_API_KEY}"
    elif chain == "bsc":
        api_url = f"https://api.bscscan.com/api?module=account&action=tokentx&address={wallet}&sort=desc&apikey={BSCSCAN_API_KEY}"
    else:
        raise HTTPException(status_code=400, detail="Unsupported chain")

    try:
        res = requests.get(api_url)
        txs = res.json().get("result", [])
        approvals = analyze_approvals(txs)
        return approvals
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))