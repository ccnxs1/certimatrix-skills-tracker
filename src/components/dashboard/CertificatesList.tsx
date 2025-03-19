
import { useState } from 'react';
import { Search, Filter, Calendar, Award, Shield, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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

const CertificatesList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter certificates based on search term
  const filteredCertificates = certificates.filter(cert => 
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Recent Certifications</span>
          <div className="relative w-[220px]">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8 h-8"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map(cert => {
              const user = users.find(u => u.id === cert.userId);
              const daysRemaining = getDaysRemaining(cert.expiryDate);
              const expiryStatus = getExpiryStatus(daysRemaining);
              
              return (
                <div 
                  key={cert.id}
                  className="flex items-start justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                      {cert.image ? (
                        <img src={cert.image} alt={cert.name} className="w-full h-full object-contain" />
                      ) : (
                        <Award className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{cert.name}</h4>
                      <p className="text-sm text-muted-foreground">{cert.provider}</p>
                      
                      <div className="flex mt-2 space-x-2">
                        {cert.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        <Badge className={cn('text-xs', getLevelColor(cert.level))}>
                          {cert.level.charAt(0).toUpperCase() + cert.level.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="h-6 w-6 rounded-full overflow-hidden">
                              <img 
                                src={user?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                                alt={user?.name || "User"} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{user?.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className={cn("text-xs flex items-center", expiryStatus.color)}>
                      {daysRemaining !== null && daysRemaining <= 90 ? (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      ) : (
                        <Shield className="h-3 w-3 mr-1" />
                      )}
                      {expiryStatus.text}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-muted-foreground mb-2">No certificates match your search</p>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="mt-2"
              >
                Clear search
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="outline">View All Certificates</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificatesList;
