from fastapi import APIRouter
from pydantic import BaseModel
from app.config import TELEGRAM_BOT_TOKEN
import requests

router = APIRouter()

class AlertPayload(BaseModel):
    wallet: str
    token: str
    spender: str
    txHash: str

@router.post("/telegram/alert")
def send_alert(payload: AlertPayload):
    message = (
        f"🚨 Revoke Alert\n"
        f"Wallet: {payload.wallet}\n"
        f"Token: {payload.token}\n"
        f"Spender: {payload.spender}\n"
        f"TX: https://etherscan.io/tx/{payload.txHash}"
    )

    # Replace with your real chat_id (or make dynamic)
    chat_id = "YOUR_CHAT_ID"
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    res = requests.post(url, json={"chat_id": chat_id, "text": message})

    return {"status": "sent", "telegram_response": res.json()}