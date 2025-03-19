
import { Users, BookOpen, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users, skills, skillMatrix } from '@/lib/data';
import { cn } from '@/lib/utils';

const TeamOverview = () => {
  // Count total certificates across all users
  const totalCertificates = users.reduce((total, user) => {
    return total + user.certificates.length;
  }, 0);

  // Calculate coverage statistics
  const totalSkills = skills.length;
  const coveredSkills = new Set(skillMatrix.map(item => item.skill)).size;
  const coveragePercentage = Math.round((coveredSkills / totalSkills) * 100);

  // Most skilled members (based on certificate count)
  const skillRanking = [...users]
    .sort((a, b) => b.certificates.length - a.certificates.length)
    .slice(0, 3);

  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle>Team Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Users className="h-8 w-8 mr-3 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>
              <p className="text-2xl font-semibold">{users.length}</p>
            </div>
          </div>

          <div className="flex items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
            <BookOpen className="h-8 w-8 mr-3 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Certificates</p>
              <p className="text-2xl font-semibold">{totalCertificates}</p>
            </div>
          </div>

          <div className="flex items-center p-3 rounded-lg bg-secondary/30 border border-secondary/20">
            <Shield className="h-8 w-8 mr-3 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Skills Coverage</p>
              <p className="text-2xl font-semibold">{coveragePercentage}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Skills Coverage</h4>
            <Progress value={coveragePercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {coveredSkills} out of {totalSkills} skills covered by your team
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-3">Top Team Members</h4>
            <div className="space-y-3">
              {skillRanking.map((user, index) => (
                <div 
                  key={user.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md",
                    index === 0 && "bg-amber-50 border border-amber-100",
                    index !== 0 && "border border-border"
                  )}
                >
                  <div className="flex items-center">
                    <div className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full mr-3 text-xs font-medium",
                      index === 0 && "bg-amber-100 text-amber-800",
                      index === 1 && "bg-zinc-100 text-zinc-800",
                      index === 2 && "bg-amber-50 text-amber-700"
                    )}>
                      {index + 1}
                    </div>
                    
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-semibold">{user.certificates.length}</p>
                    <p className="text-xs text-muted-foreground">certificates</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamOverview;
