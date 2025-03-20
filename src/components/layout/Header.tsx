import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Award, Users, BarChart, FileCheck, Bell, LogOut, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger, 
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { isUserAuthenticated, signOutUser, signInUser, getUserData } from '@/utils/authUtils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Track authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);

  // Check authentication status every time the component renders
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isUserAuthenticated();
      setIsAuthenticated(authStatus);
      setUserData(authStatus ? getUserData() : null);
    };
    
    checkAuth();
    
    // Add event listener for storage changes
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Check auth status when the location changes
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart },
    { name: 'Certificates', path: '/certificates', icon: FileCheck },
    { name: 'Team', path: '/team', icon: Users },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Sign out clicked - executing complete sign out process");
    
    // Use the utility function to sign out
    signOutUser();
    
    // We don't need to manually update state or navigate here since
    // the page reload in signOutUser will handle this
  };

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Sign in clicked - executing mock sign in");
    
    try {
      // Use the utility function to sign in
      signInUser();
      
      // Update the local state
      setIsAuthenticated(true);
      setUserData(getUserData());
      
      // Show success toast
      toast({
        title: "Signed in successfully",
        description: "You have been signed in with a demo account",
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Error during sign in:", error);
      toast({
        title: "Sign in failed",
        description: "There was an error signing you in. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-6',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 transition-opacity duration-200 hover:opacity-80">
            <Award className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CertiMatrix</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 relative group',
                  isActive(item.path)
                    ? 'text-primary font-medium'
                    : 'text-foreground/70 hover:text-foreground hover:bg-secondary/70'
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Notification and User Menu (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive animate-pulse" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={userData?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"} 
                        alt="User avatar" 
                        className="h-full w-full object-cover"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 animate-fade-in">
                    <div className="px-2 py-1.5 text-sm font-medium">
                      {userData?.name || "User"}
                    </div>
                    <div className="px-2 py-1 text-xs text-muted-foreground mb-1">
                      {userData?.email || "user@example.com"}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-destructive flex items-center gap-2"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                variant="default"
                className="flex items-center gap-2"
                onClick={handleSignIn}
              >
                <LogIn className="h-4 w-4" />
                Sign in (Demo)
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 animate-fade-in md:hidden">
          <div className="container mx-auto py-4 px-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'px-4 py-3 rounded-md flex items-center space-x-3 transition-all duration-200',
                    isActive(item.path)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-secondary'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="h-px w-full bg-border my-2" />

              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="justify-start px-4 py-3 h-auto">
                    <Bell className="h-5 w-5 mr-3" />
                    Notifications
                  </Button>

                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img 
                        src={userData?.avatar || "https://randomuser.me/api/portraits/men/1.jpg"} 
                        alt="User avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{userData?.name || "User"}</span>
                      <span className="text-xs text-muted-foreground">{userData?.email || "user@example.com"}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="justify-start px-4 py-3 h-auto text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign out
                  </Button>
                </>
              ) : (
                <Button 
                  variant="default" 
                  className="justify-start px-4 py-3 h-auto"
                  onClick={handleSignIn}
                >
                  <LogIn className="h-5 w-5 mr-3" />
                  Sign in (Demo)
                </Button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
