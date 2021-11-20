import json
import os
import requests
import sys

N = 10000
BASE_URL = 'http://localhost:5000'
USERNAME = os.environ.get('APP_USER')
PASSWORD = os.environ.get('APP_PW')


def get_bearer_token(base_url, username, password):
    r = requests.post(f'{base_url}/auth/login', data={
        'email': username,
        'password': password})
    response_body = json.loads(r.text)
    if 'token' not in response_body:
        raise ValueError('Could not retrieve token: ' + response_body)
    return response_body['token']


def create_post(title, content, authorization_token):
    headers = {'Authorization': f'Bearer {token}'}
    payload = {'title': title, 'content': content}

    return requests.post(f'{BASE_URL}/api/posts',
                         data=payload, headers=headers)


if __name__ == "__main__":
    if 'APP_USER' not in os.environ:
        print('Error: need to set the environment variable "APP_USER"')
        sys.exit(2)
    if 'APP_PW' not in os.environ:
        print('Error: need to set the environment variable "APP_PW"')
        sys.exit(2)

    token = get_bearer_token(BASE_URL, USERNAME, PASSWORD)

    for i in range(N):
        create_post(title='a post created by my script',
                    content=f'This is the post nr. {i+1}',
                    authorization_token=token)
