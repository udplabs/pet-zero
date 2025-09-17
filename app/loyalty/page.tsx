"use client"

import { useState } from "react"
import Image from "next/image"
const Gift = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20,12 20,22 4,22 4,12"></polyline>
    <rect x="2" y="7" width="20" height="5"></rect>
    <line x1="12" y1="22" x2="12" y2="7"></line>
    <path d="m5,7 0,0a2,2 0 0,1 0,-4c1.1,0 2.1.9 2,2h6c-.1-1.1.9-2 2-2a2,2 0 0,1 0,4"></path>
  </svg>
)

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon>
  </svg>
)

const Crown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="m2,20 20,0"></path>
    <path d="m5,17 0,-12l1.5,1.5L12,3l5.5,3.5L19,5l0,12"></path>
    <circle cx="12" cy="9" r="1"></circle>
    <circle cx="7" cy="12" r="1"></circle>
    <circle cx="17" cy="12" r="1"></circle>
  </svg>
)

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M20.84,4.61a5.5,5.5 0 0,0 -7.78,0L12,5.67 10.94,4.61a5.5,5.5 0 0,0 -7.78,7.78l1.06,1.06L12,21.23l7.78,-7.78 1.06,-1.06a5.5,5.5 0 0,0 0,-7.78z"></path>
  </svg>
)

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22,11.08V12a10,10 0 1,1 -5.93,-9.14"></path>
    <polyline points="22,4 12,14.01 9,11.01"></polyline>
  </svg>
)

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LoyaltyPage() {
  const [email, setEmail] = useState("")
  const [isJoined, setIsJoined] = useState(false)

  const handleJoinRewards = () => {
    if (email) {
      setIsJoined(true)
    }
  }

  const tiers = [
    {
      name: "Puppy Pal",
      icon: Heart,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      requirement: "$0 - $99",
      benefits: ["5% off all purchases", "Birthday treat for your pet", "Free shipping on orders $50+"],
    },
    {
      name: "Loyal Friend",
      icon: Star,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      requirement: "$100 - $299",
      benefits: ["10% off all purchases", "Early access to sales", "Free monthly toy", "Priority customer support"],
    },
    {
      name: "VIP Pack Leader",
      icon: Crown,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      requirement: "$300+",
      benefits: [
        "15% off all purchases",
        "Exclusive VIP products",
        "Free grooming consultation",
        "Personal pet advisor",
        "Free returns",
      ],
    },
  ]

  const rewards = [
    { points: 100, reward: "$5 off your next purchase" },
    { points: 250, reward: "Free premium toy" },
    { points: 500, reward: "$25 gift card" },
    { points: 1000, reward: "Free grooming session" },
  ]

  if (isJoined) {
    return (
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6 md:py-16">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Welcome to PetDo Rewards!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You've successfully joined our loyalty program. Start earning points with your next purchase!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => (window.location.href = "/shop")}>
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" onClick={() => setIsJoined(false)}>
                View Program Details
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Gift className="h-8 w-8 text-primary" />
                <Badge variant="secondary" className="text-sm font-medium">
                  Loyalty Rewards Program
                </Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Earn Rewards for Every Purchase
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                Join PetDo Rewards and earn points on every purchase. Get exclusive discounts, free products, and
                special perks for your furry friends.
              </p>
              <div className="space-y-4">
                <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleJoinRewards} size="lg" className="font-medium">
                    Join Now - It's Free!
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">No fees, no hassle. Start earning rewards immediately.</p>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Happy pets with rewards"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Join for Free</h3>
              <p className="text-muted-foreground">
                Sign up with your email address and start earning points immediately on your first purchase.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Earn Points</h3>
              <p className="text-muted-foreground">
                Get 1 point for every $1 spent. Bonus points for reviews, referrals, and special promotions.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Redeem Rewards</h3>
              <p className="text-muted-foreground">
                Use your points for discounts, free products, and exclusive experiences for your pets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Membership Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => {
              const IconComponent = tier.icon
              return (
                <Card key={tier.name} className={`relative ${index === 1 ? "ring-2 ring-primary" : ""}`}>
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto h-16 w-16 rounded-full ${tier.bgColor} flex items-center justify-center mb-4`}
                    >
                      <IconComponent className={`h-8 w-8 ${tier.color}`} />
                    </div>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{tier.requirement}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Rewards Catalog */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-8 md:text-3xl">Rewards You Can Earn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">{reward.points}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                    <p className="font-medium">{reward.reward}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ready to Start Earning?</h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of pet parents who are already saving money and getting exclusive perks through PetDo
              Rewards.
            </p>
            <div className="flex w-full max-w-md mx-auto flex-col gap-2 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground text-foreground flex-1"
              />
              <Button variant="secondary" onClick={handleJoinRewards} size="lg">
                Join Rewards
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Start earning points on your very first purchase. No minimum spend required.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
