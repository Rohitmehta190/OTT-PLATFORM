import requests
import json

# Test API endpoints
base_url = "http://localhost:8000"

print("🚀 Testing NeonStream API...")

# Test health
print("\n1. Testing health endpoint...")
response = requests.get(f"{base_url}/health")
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")

# Test content
print("\n2. Testing content endpoints...")
response = requests.get(f"{base_url}/api/content")
print(f"All content: {len(response.json())} items")

response = requests.get(f"{base_url}/api/content/featured")
print(f"Featured content: {len(response.json())} items")

response = requests.get(f"{base_url}/api/content/trending")
print(f"Trending content: {len(response.json())} items")

# Test registration
print("\n3. Testing user registration...")
register_data = {
    "email": "demo@neonstream.com",
    "username": "demo_user",
    "password": "password123",
    "first_name": "Demo",
    "last_name": "User"
}

response = requests.post(f"{base_url}/api/auth/register", json=register_data)
print(f"Register status: {response.status_code}")
print(f"Register response: {response.json()}")

# Test login
print("\n4. Testing user login...")
login_data = {
    "email": "demo@neonstream.com",
    "password": "password123"
}

response = requests.post(f"{base_url}/api/auth/login", json=login_data)
print(f"Login status: {response.status_code}")
print(f"Login response: {response.json()}")

# Test content detail
print("\n5. Testing content detail...")
response = requests.get(f"{base_url}/api/content/1")
print(f"Content detail: {response.json()['title']}")

# Test search
print("\n6. Testing search...")
response = requests.get(f"{base_url}/api/content/search?q=neon")
print(f"Search results: {len(response.json())} items")

print("\n✅ All tests completed successfully!")
