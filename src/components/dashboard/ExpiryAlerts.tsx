
import { 
  AlertCircle, 
  Calendar, 
  ChevronRight, 
  AlertTriangle,
  Shield 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { expiryAlerts, users } from '@/lib/data';
import { cn } from '@/lib/utils';

const ExpiryAlerts = () => {
  const criticalAlerts = expiryAlerts.filter(alert => alert.daysRemaining <= 30);
  const upcomingAlerts = expiryAlerts.filter(alert => alert.daysRemaining > 30);

  const getAlertSeverity = (daysRemaining: number) => {
    if (daysRemaining <= 0) return { color: 'text-destructive', bgColor: 'bg-destructive/10', borderColor: 'border-destructive/20' };
    if (daysRemaining <= 30) return { color: 'text-destructive', bgColor: 'bg-destructive/10', borderColor: 'border-destructive/20' };
    if (daysRemaining <= 90) return { color: 'text-amber-500', bgColor: 'bg-amber-100/30', borderColor: 'border-amber-100' };
    return { color: 'text-muted-foreground', bgColor: 'bg-secondary/30', borderColor: 'border-secondary/20' };
  };

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getUserAvatar = (userId: string) => {
    const user = users.find(u => u.id === userId);
    return user?.avatar || '';
  };

  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
            <span>Certificate Expiry Alerts</span>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {criticalAlerts.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1 text-destructive" />
              Critical Alerts
            </h4>
            <div className="space-y-3">
              {criticalAlerts.map(alert => {
                const severity = getAlertSeverity(alert.daysRemaining);
                return (
                  <div 
                    key={alert.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      severity.bgColor,
                      severity.borderColor
                    )}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={getUserAvatar(alert.userId)} alt={alert.userName} />
                        <AvatarFallback>{alert.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{alert.certificateName}</p>
                        <p className="text-xs text-muted-foreground">{alert.userName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-4">
                        <p className={cn("text-sm font-medium", severity.color)}>
                          {alert.daysRemaining <= 0 
                            ? 'Expired' 
                            : `Expires in ${alert.daysRemaining} days`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getFormattedDate(alert.expiryDate)}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {upcomingAlerts.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <Shield className="h-4 w-4 mr-1 text-muted-foreground" />
              Upcoming Renewals
            </h4>
            <div className="space-y-2">
              {upcomingAlerts.map(alert => {
                const severity = getAlertSeverity(alert.daysRemaining);
                return (
                  <div 
                    key={alert.id}
                    className="flex items-center justify-between p-2 rounded-md border border-border hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-center">
                      <Badge variant="outline" className={cn("mr-3", severity.color)}>
                        {alert.daysRemaining} days
                      </Badge>
                      <p className="text-sm">{alert.certificateName}</p>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={getUserAvatar(alert.userId)} alt={alert.userName} />
                        <AvatarFallback>{alert.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-xs text-muted-foreground mr-2">
                        {getFormattedDate(alert.expiryDate)}
                      </p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {expiryAlerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Shield className="h-12 w-12 text-accent mb-2" />
            <p className="text-muted-foreground">No upcoming certificate expirations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpiryAlerts;
