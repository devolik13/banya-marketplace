"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronDown, Menu, X, Rocket, Award, Users, CreditCard, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Rocket className="h-6 w-6 text-primary" />,
    title: "Blazing Fast Performance",
    description: "Experience unparalleled speed and responsiveness with our optimized infrastructure.",
  },
  {
    icon: <Award className="h-6 w-6 text-primary" />,
    title: "Award-Winning Support",
    description: "Our dedicated support team is available 24/7 to assist you with any queries.",
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: "Seamless Collaboration",
    description: "Work together effortlessly with integrated tools designed for team productivity.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    title: "Secure Transactions",
    description: "Rest easy with our enterprise-grade security measures protecting your data.",
  },
  {
    icon: <Gem className="h-6 w-6 text-primary" />,
    title: "Cutting-Edge Innovation",
    description: "Stay ahead with continuous updates and features powered by the latest technology.",
  },
];

const teamMembers = [
  {
    name: "Alice Johnson",
    role: "CEO",
    avatar: "https://api.unsplash.com/photos/a-woman-with-curly-hair-wearing-glasses-8YJpM_RspL8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDE3fHxwb3J0cmFpdCUyMGZhY2UlN0Nwb3J0cmFpdCUyMHdvbWFufGVufDB8fHx8MTcwMDc0NjQ4OXww&ixlib=rb-4.0.3&q=80&w=400",
  },
  {
    name: "Bob Williams",
    role: "CTO",
    avatar: "https://api.unsplash.com/photos/man-wearing-black-zip-up-hoodie-sweatshirt-and-black-framed-eyeglasses-in-close-up-photography-K2L3E5D8g0Y?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDcwfHxwb3J0cmFpdCUyMGZhY2UlN0Nwb3J0cmFpdCUyMG1hbnxlbnwwfHx8fDE3MDA3NDY1MDEzMzJ8MA&ixlib=rb-4.0.3&q=80&w=400",
  },
  {
    name: "Charlie Brown",
    role: "Lead Developer",
    avatar: "https://api.unsplash.com/photos/selective-focus-photography-of-man-in-black-crew-neck-shirt-wearing-eyeglasses-UrxA8Q3T914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDczfHxwb3J0cmFpdCUyMGZhY2UlN0Nwb3J0cmFpdCUyMG1hbnxlbnwwfHx8fDE3MDA3NDY1MDEzMzJ8MA&ixlib=rb-4.0.3&q=80&w=400",
  },
  {
    name: "Diana Garcia",
    role: "Product Manager",
    avatar: "https://api.unsplash.com/photos/selective-focus-photography-of-woman-wearing-eyeglasses-and-black-coat-jzz_Li3N8Pw?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDc1fHxwb3J0cmFpdCUyMGZhY2UlN0Nwb3J0cmFpbCUyMHdvbWFufGVufDB8fHx8MTcwMDc0NjQ4OTI0N3ww&ixlib=rb-4.0.3&q=80&w=400",
  },
  {
    name: "Ethan Davis",
    role: "UI/UX Designer",
    avatar: "https://api.unsplash.com/photos/man-wearing-black-sunglasses--Xb_2vV-4yU?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDU1fHxwb3J0cmFpdCUyMGZhY2UlN0Nwb3J0cmFpdCUyMG1hbnxlbnwwfHx8fDE3MDA3NDY1MDEzMzJ8MA&ixlib=rb-4.0.3&q=80&w=400",
  },
];

const TestimonialCard = ({ quote, author, title }: { quote: string; author: string; title: string }) => (
  <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
    <CardContent className="flex flex-col items-center p-0">
      <blockquote className="mb-4 text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="font-semibold text-primary">{author}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
    </CardContent>
  </Card>
);

const pricingPlans = [
  {
    title: "Basic",
    price: "$9",
    duration: "/month",
    features: [
      "10 GB Storage",
      "5 Users",
      "Basic Analytics",
      "Email Support",
      "Community Access",
    ],
    buttonText: "Get Started",
  },
  {
    title: "Pro",
    price: "$29",
    duration: "/month",
    features: [
      "50 GB Storage",
      "25 Users",
      "Advanced Analytics",
      "Priority Email Support",
      "Dedicated Slack Channel",
    ],
    buttonText: "Choose Pro",
  },
  {
    title: "Enterprise",
    price: "Custom",
    duration: "",
    features: [
      "Unlimited Storage",
      "Unlimited Users",
      "Custom Integrations",
      "24/7 Phone Support",
      "Dedicated Account Manager",
    ],
    buttonText: "Contact Us",
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "About Us", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  const statItemClass =
    "flex flex-col items-center text-center p-4 bg-accent/20 rounded-lg shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105";
  const statValueClass = "text-4xl font-bold text-primary mb-1 custom-animate-fadein-up";
  const statLabelClass = "text-lg font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground animate-in fade-in">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/90 px-4 py-3 shadow-sm backdrop-blur-md md:px-8 custom-animate-fadein-down">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="flex items-center text-2xl font-bold text-primary">
            <Rocket className="mr-2 h-7 w-7" /> LaunchPad
          </a>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden space-x-6 md:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-md font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-card/95 backdrop-blur-lg md:hidden custom-animate-fadein-left">
            <ul className="flex flex-col items-center space-y-6 pt-20">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h1 className="mb-6 animate-in fade-in slide-in-from-top-10 duration-700 text-5xl font-extrabold tracking-tight md:text-7xl">
              Launch Your Ideas, Faster.
            </h1>
            <p className="mb-8 animate-in fade-in slide-in-from-top-10 duration-700 delay-200 text-lg text-gray-700 dark:text-gray-300 md:text-xl max-w-3xl mx-auto">
              Empower your projects with our cutting-edge solutions, designed for scalability and
              efficiency.
            </p>
            <div className="flex justify-center gap-4 animate-in fade-in slide-in-from-top-10 duration-700 delay-300">
              <Button size="lg" className="rounded-full shadow-lg transition-all hover:scale-105">
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full shadow-lg transition-all hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
          {/* Animated Background Circles */}
          <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
            <div className="size-96 rounded-full bg-primary/10 absolute -top-20 -left-20 animate-blob mix-blend-multiply filter blur-3xl" />
            <div className="size-80 rounded-full bg-accent/10 absolute -bottom-20 -right-20 animate-blob animation-delay-2000 mix-blend-multiply filter blur-3xl" />
            <div className="size-72 rounded-full bg-primary/10 absolute top-1/2 left-1/2 -ml-36 -mt-36 animate-blob animation-delay-4000 mix-blend-multiply filter blur-3xl" />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold custom-animate-fadein-up">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="transform-gpu custom-animate-fadein-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="flex flex-row items-center space-x-4">
                    <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6 custom-animate-fadein-left">
                <h2 className="text-4xl font-bold">About LaunchPad</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  LaunchPad is dedicated to empowering businesses and individuals with robust,
                  scalable, and intuitive digital solutions. Our commitment to innovation and
                  excellence drives us to constantly push the boundaries of what's possible,
                  ensuring our clients achieve their goals with confidence.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Founded on principles of transparency and customer-centricity, we pride ourselves
                  on delivering not just software, but a partnership dedicated to your success. Join
                  us on a journey to redefine digital landscapes.
                </p>
                <Button className="mt-4 shadow-md transition-all hover:scale-105">
                  Discover Our Story
                </Button>
              </div>
              <div className="relative h-96 w-full custom-animate-fadein-right">
                <div
                  className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-2"
                  ref={containerRef}
                >
                  <div className="flex size-full items-center justify-center p-4">
                    <div className="flex size-full flex-col items-stretch justify-between gap-10">
                      <div className="flex flex-row items-stretch justify-between gap-10">
                        <div
                          ref={div1Ref}
                          className="flex size-12 items-center justify-center rounded-full border bg-gray-100 p-3"
                        >
                          <Users className="h-6 w-6 text-gray-700"/>
                        </div>
                        <div
                          ref={div2Ref}
                          className="flex size-12 items-center justify-center rounded-full border bg-gray-100 p-3"
                        >
                            <Gem className="h-6 w-6 text-gray-700"/>
                        </div>
                      </div>
                      <div className="flex flex-row items-stretch justify-between gap-10">
                        <div
                          ref={div3Ref}
                          className="flex size-12 items-center justify-center rounded-full border bg-gray-100 p-3"
                        >
                            <CreditCard className="h-6 w-6 text-gray-700"/>
                        </div>
                        <div
                          ref={div4Ref}
                          className="flex size-12 items-center justify-center rounded-full border bg-gray-100 p-3"
                        >
                            <Award className="h-6 w-6 text-gray-700"/>
                        </div>
                      </div>
                      <div className="flex flex-row items-stretch justify-between gap-10">
                        <div
                          ref={div5Ref}
                          className="flex size-12 items-center justify-center rounded-full border bg-gray-100 p-3"
                        >
                            <Rocket className="h-6 w-6 text-gray-700"/>
                        </div>
                        <div
                          ref={div6Ref}
                          className="flex size-12 items-center justify-center rounded-full border bg-gray-100 p-3"
                        >
                            <Users className="h-6 w-6 text-gray-700"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* AnimatedBeam is designed to work as a client component */}
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div1Ref}
                    toRef={div6Ref}
                    duration={3}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div2Ref}
                    toRef={div5Ref}
                    duration={3}
                  />
                  <AnimatedBeam
                    containerRef={containerRef}
                    fromRef={div3Ref}
                    toRef={div4Ref}
                    duration={3}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold custom-animate-fadein-up">
              Our Achievements
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className={statItemClass}>
                <div className={statValueClass}>10M+</div>
                <div className={statLabelClass}>Downloads</div>
                <Progress value={90} className="w-full mt-2 h-2" />
              </div>
              <div className={statItemClass}>
                <div className={statValueClass}>99.9%</div>
                <div className={statLabelClass}>Uptime</div>
                <Progress value={99.9} className="w-full mt-2 h-2" />
              </div>
              <div className={statItemClass}>
                <div className={statValueClass}>24/7</div>
                <div className={statLabelClass}>Support</div>
                <Progress value={100} className="w-full mt-2 h-2" />
              </div>
              <div className={statItemClass}>
                <div className={statValueClass}>10K+</div>
                <div className={statLabelClass}>Happy Clients</div>
                <Progress value={80} className="w-full mt-2 h-2" />
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold custom-animate-fadein-up">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="transform-gpu flex flex-col items-center p-6 text-center shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl custom-animate-fadein-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Avatar className="mb-4 h-24 w-24 border-4 border-primary shadow-md">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-24 bg-accent/20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold custom-animate-fadein-up">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                quote="LaunchPad transformed our workflow. Their intuitive platform and exceptional support are unparalleled!"
                author="Jane Doe"
                title="CEO, Tech Innovations"
              />
              <TestimonialCard
                quote="The performance boost we experienced was immediate and significant. Highly recommend LaunchPad!"
                author="John Smith"
                title="Lead Developer, Creative Minds"
              />
              <TestimonialCard
                quote="Beyond impressed with the seamless integration and robust features. LaunchPad is a game-changer."
                author="Emily White"
                title="Product Director, Global Solutions"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold custom-animate-fadein-up">
              Simple & Transparent Pricing
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={cn(
                    "flex flex-col p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl custom-animate-fadein-up",
                    index === 1 && "border-2 border-primary shadow-lg" // Highlight Pro plan
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="p-0 mb-6 text-center">
                    <CardTitle className="mb-2 text-3xl font-semibold">{plan.title}</CardTitle>
                    <div className="text-5xl font-bold text-primary">
                      {plan.price}
                      <span className="ml-1 text-xl font-medium text-gray-600 dark:text-gray-400">
                        {plan.duration}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <ul className="mb-8 space-y-3 text-gray-700 dark:text-gray-300">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <ChevronDown className="mr-2 h-5 w-5 text-primary rotate-[270deg]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <Button
                    className={cn(
                      "w-full shadow-md transition-all hover:scale-105",
                      index === 1 ? "bg-primary text-primary-foreground" : ""
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-primary py-20 md:py-24 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-4xl font-bold custom-animate-fadein-up">
              Ready to elevate your projects?
            </h2>
            <p className="mb-10 text-xl custom-animate-fadein-up delay-100">
              Join thousands of satisfied users who trust LaunchPad for their digital needs.
            </p>
            <Button
              variant="default"
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary custom-animate-fadein-up delay-200 rounded-full shadow-lg transition-all hover:scale-105"
            >
              Start Your Journey Today
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground py-12 text-muted-foreground custom-animate-fadein-up">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center text-lg font-bold text-primary-foreground">
              <Rocket className="mr-2 h-6 w-6" /> LaunchPad
            </div>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:text-base">
              <li>
                <a href="#features" className="hover:text-primary-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-primary-foreground transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary-foreground transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-primary-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} LaunchPad. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}