from email import header
from matplotlib.pyplot import get
import requests

subscription_key = '955e8fcaf63b4aafa1174a1de696bcdd'


def get_token(subscription_key):
    fetch_token_url = 'https://koreacentral.api.cognitive.microsoft.com/sts/v1.0/issueToken'
    headers = {
        'Ocp-Apim-Subscription-Key': subscription_key
    }
    response = requests.post(fetch_token_url, headers=headers)
    return str(response.text)

token = get_token(subscription_key)


headers = {
    cognitiveservices/v1 HTTP/1.1,
    'Authorization': Bearer YOUR_ACCESS_TOKEN,
    'Content-type': application/ssml+xml,
    'Content-Length': 199,
    'Connection': Keep-Alive
}
requests.post('westus.stt.speech.microsoft.com', headers=headers)
