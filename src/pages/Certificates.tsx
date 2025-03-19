
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  FileCheck, 
  Download, 
  Upload, 
  Calendar,
  Shield,
  Award,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { certificates, users } from '@/lib/data';
import { cn } from '@/lib/utils';

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-sky-100 text-sky-800';
    case 'intermediate': return 'bg-emerald-100 text-emerald-800';
    case 'advanced': return 'bg-purple-100 text-purple-800';
    case 'expert': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getDaysRemaining = (expiryDate: string | null) => {
  if (!expiryDate) return null;
  
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

const getExpiryStatus = (daysRemaining: number | null) => {
  if (daysRemaining === null) return { color: 'text-muted-foreground', text: 'Never expires' };
  if (daysRemaining < 0) return { color: 'text-destructive', text: 'Expired' };
  if (daysRemaining <= 30) return { color: 'text-destructive', text: `Expires in ${daysRemaining} days` };
  if (daysRemaining <= 90) return { color: 'text-amber-500', text: `Expires in ${daysRemaining} days` };
  return { color: 'text-emerald-500', text: `Expires in ${daysRemaining} days` };
};

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Get unique providers
  const providers = Array.from(new Set(certificates.map(cert => cert.provider)));

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProvider = filterProvider === 'all' || cert.provider === filterProvider;
    const matchesLevel = filterLevel === 'all' || cert.level === filterLevel;
    
    return matchesSearch && matchesProvider && matchesLevel;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-8 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
            <div>
              <h1 className="text-3xl font-bold">Certificates</h1>
              <p className="text-muted-foreground">Manage your team's certifications</p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Certificate
              </Button>
            </div>
          </div>
          
          {/* Filters */}
          <Card className={`mb-6 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={filterProvider} onValueChange={setFilterProvider}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    {providers.map(provider => (
                      <SelectItem key={provider} value={provider}>{provider}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex-shrink-0">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Certificates List */}
          <div className={`space-y-4 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map(cert => {
                const user = users.find(u => u.id === cert.userId);
                const daysRemaining = getDaysRemaining(cert.expiryDate);
                const expiryStatus = getExpiryStatus(daysRemaining);
                
                return (
                  <Card 
                    key={cert.id}
                    className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Certificate Image/Logo */}
                        <div className="w-full md:w-48 h-32 md:h-auto bg-muted flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-border">
                          {cert.image ? (
                            <img 
                              src={cert.image} 
                              alt={cert.name} 
                              className="max-w-full max-h-full object-contain" 
                            />
                          ) : (
                            <FileCheck className="h-12 w-12 text-muted-foreground" />
                          )}
                        </div>
                        
                        {/* Certificate Details */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <h3 className="text-xl font-semibold mb-1">{cert.name}</h3>
                            <div className={cn("text-sm flex items-center", expiryStatus.color)}>
                              {daysRemaining !== null && daysRemaining <= 90 ? (
                                <AlertTriangle className="h-4 w-4 mr-1" />
                              ) : (
                                <Shield className="h-4 w-4 mr-1" />
                              )}
                              {expiryStatus.text}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{cert.provider}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {cert.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            <Badge className={cn('text-xs', getLevelColor(cert.level))}>
                              {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div className="flex items-center mb-3 sm:mb-0">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Avatar className="h-8 w-8 mr-2">
                                      <AvatarImage src={user?.avatar} alt={user?.name} />
                                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                    </Avatar>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{user?.name}</p>
                                    <p className="text-xs text-muted-foreground">{user?.role}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <span className="text-sm text-muted-foreground">{user?.name}</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Award className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                                </span>
                              </div>
                              
                              {cert.expiryDate && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileCheck className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No certificates found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setFilterProvider('all');
                    setFilterLevel('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Certificates;
