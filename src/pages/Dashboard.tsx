
import { useState, useEffect } from 'react';
import { CalendarClock, FilePlus, UserPlus, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SkillsMatrix from '@/components/dashboard/SkillsMatrix';
import CertificatesList from '@/components/dashboard/CertificatesList';
import TeamOverview from '@/components/dashboard/TeamOverview';
import ExpiryAlerts from '@/components/dashboard/ExpiryAlerts';

const Dashboard = () => {
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
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-6 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your team's certifications and skills</p>
              </div>
              
              <div className="flex space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="h-9">
                  <CalendarClock className="h-4 w-4 mr-2" />
                  This Month
                </Button>
                <Button variant="outline" size="sm" className="h-9">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Reports
                </Button>
              </div>
            </div>
            
            {/* Quick Action Cards */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FilePlus className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Add Certificate</h3>
                    <p className="text-sm text-muted-foreground">Upload a new certification</p>
                  </div>
                  <Button size="sm">Add</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Add Team Member</h3>
                    <p className="text-sm text-muted-foreground">Invite someone to your team</p>
                  </div>
                  <Button size="sm" variant="outline">Invite</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-secondary/60 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Generate Report</h3>
                    <p className="text-sm text-muted-foreground">Create skills matrix report</p>
                  </div>
                  <Button size="sm" variant="outline">Generate</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className={`lg:col-span-2 space-y-6 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <SkillsMatrix />
              <CertificatesList />
            </div>
            
            {/* Right Column */}
            <div className={`space-y-6 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
              <TeamOverview />
              <ExpiryAlerts />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
