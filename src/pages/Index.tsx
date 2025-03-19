
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Award, 
  Users, 
  BarChart, 
  FileCheck, 
  CheckCheck, 
  ShieldCheck,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary">
                <Award className="h-4 w-4 mr-1" />
                Certificate &amp; Skills Management
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Track, manage <span className="text-primary">certifications</span> with precision
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Visualize your team's skills, identify gaps, and strengthen capabilities with our 
                elegant certification tracking platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="rounded-full" 
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className={`relative ${isLoaded ? 'animate-fade-in delay-300' : 'opacity-0'}`}>
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Skills Dashboard" 
                  className="rounded-2xl shadow-2xl object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-3 scale-95 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-secondary/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Powerful Features, Simple Design</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage your team's certifications and skills in one elegant platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`p-6 border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-primary/90 to-accent rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to transform your team's certification management?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-md">
                  Start tracking your team's certifications and skills today with our intuitive platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="rounded-full bg-white text-primary hover:bg-white/90"
                    onClick={() => navigate('/dashboard')}
                  >
                    Get Started Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-white text-white hover:bg-white/10"
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </div>
              
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
                  alt="Team collaboration" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

const features = [
  {
    icon: FileCheck,
    title: "Certificate Repository",
    description: "Centralize all certifications with expiry dates and skill categories in one secure place."
  },
  {
    icon: BarChart,
    title: "Skills Matrix Dashboard",
    description: "Visualize your team's skills strength and gaps with intuitive, beautiful charts."
  },
  {
    icon: CheckCheck,
    title: "Gap Analysis",
    description: "Automatically identify your team's strengths and areas needing improvement."
  },
  {
    icon: Bell,
    title: "Expiry Reminders",
    description: "Receive timely alerts about expiring certifications to maintain compliance."
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Organize team members and track individual growth and certification progress."
  },
  {
    icon: ShieldCheck,
    title: "Compliance Tracking",
    description: "Ensure your team maintains required certifications for client and industry standards."
  }
];

export default Index;
