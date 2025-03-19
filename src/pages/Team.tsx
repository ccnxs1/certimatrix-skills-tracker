
import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Users, 
  Mail, 
  Building, 
  User,
  Award, 
  FileCheck,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { users } from '@/lib/data';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Get unique departments
  const departments = Array.from(
    new Set(users.map(user => user.department || 'Uncategorized'))
  );

  // Filter team members
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      departmentFilter === 'all' || 
      user.department === departmentFilter ||
      (departmentFilter === 'Uncategorized' && !user.department);
    
    return matchesSearch && matchesDepartment;
  });

  // Get the unique skills for a user
  const getUserSkills = (userId: string) => {
    const userCertificates = users.find(u => u.id === userId)?.certificates || [];
    const skills = new Set<string>();
    
    userCertificates.forEach(cert => {
      cert.skills.forEach(skill => skills.add(skill));
    });
    
    return Array.from(skills);
  };

  // Calculate certification progress (based on the number of certificates relative to the team)
  const getProgressPercentage = (userId: string) => {
    const userCertCount = users.find(u => u.id === userId)?.certificates.length || 0;
    const maxCertCount = Math.max(...users.map(u => u.certificates.length));
    
    return maxCertCount > 0 
      ? Math.round((userCertCount / maxCertCount) * 100) 
      : 0;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-8 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`}>
            <div>
              <h1 className="text-3xl font-bold">Team</h1>
              <p className="text-muted-foreground">Manage your team members and their certifications</p>
            </div>
            
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
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
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Team Members Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isLoaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => {
                const userSkills = getUserSkills(user.id);
                const progressPercentage = getProgressPercentage(user.id);
                
                return (
                  <Card 
                    key={user.id}
                    className="hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <Avatar className="h-14 w-14">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <p className="text-muted-foreground">{user.role}</p>
                          
                          <div className="flex items-center space-x-2 mt-1">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                          
                          {user.department && (
                            <div className="flex items-center space-x-2 mt-1">
                              <Building className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{user.department}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-1 text-primary" />
                            <span className="text-sm">Certifications</span>
                          </div>
                          <span className="text-sm font-medium">{user.certificates.length}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-1.5" />
                      </div>
                      
                      {userSkills.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <Shield className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm">Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {userSkills.map(skill => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center pt-2 border-t border-border">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <User className="h-3.5 w-3.5 mr-1" />
                          View Profile
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="text-xs">
                          <FileCheck className="h-3.5 w-3.5 mr-1" />
                          Certificates
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No team members found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setDepartmentFilter('all');
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

export default Team;
