// Mock Auth0 client implementation for demonstration
// In a real implementation, this would use @auth0/nextjs-auth0/server

interface Auth0Config {
  domain?: string
  clientId?: string
  clientSecret?: string
  secret?: string
  baseURL?: string
}

class MockAuth0Client {
  private config: Auth0Config

  constructor(config: Auth0Config = {}) {
    this.config = {
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      secret: process.env.AUTH0_SECRET,
      baseURL: process.env.APP_BASE_URL || "http://localhost:3000",
      ...config,
    }
  }

  async middleware(request: any) {
    // Mock middleware implementation
    // In real Auth0, this would handle authentication checks
    console.log("[v0] Auth0 middleware called for:", request.nextUrl.pathname)

    // For demonstration, we'll just pass through all requests
    // Real Auth0 middleware would check authentication status
    return
  }
}

// Export the mock Auth0 client instance
export const auth0 = new MockAuth0Client()
