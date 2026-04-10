# Login By 2fa
Source: https://docs.twitterapi.io/api-reference/endpoint/login_by_2fa

## Endpoint

- Method: `POST`
- Path: `/twitter/login_by_2fa`
- API URL: `'https://api.twitterapi.io/twitter/login_by_2fa'`

## Description

Deprecated soon. Please use login V2 instead, as it is more stable.Login Step 2: by 2fa code.Trial operation price: $0.003 per call. 

## Example (curl)

```bash
curl --request POST \
  --url 'https://api.twitterapi.io/twitter/login_by_2fa' \
  --header 'X-API-Key: <api-key>' \
  --header 'Content-Type: application/json'
```

## Body Parameters

- `login_data` (string, required): The login data returned by /twitter/login_by_email_or_username
- `2fa_code` (string, required): The 2fa code of the user. get 2fa code from https://2fa.fb.rip/
- `proxy` (string, required): The proxy to use.Please use high-quality residential proxies and avoid free proxies.Required.Example: http://username:password@ip:port .You can get proxy from: https://www.webshare.io/?referral_code=4e0q1n00a504

_Scraped at: 2026-04-10T04:07:53.670468Z_
