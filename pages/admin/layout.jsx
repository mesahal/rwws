import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  HandHelping,
  Search,
  Shield,
  LogOut,
  Menu,
  X,
  Key,
} from "lucide-react";
import { auth } from "@/lib/auth"; // Import your auth service
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const AdminLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = auth.getAccessToken();
      if (!accessToken && router.pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await auth.logout();
    router.push("/admin/login");
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await auth.changePassword(
        passwordData.oldPassword,
        passwordData.newPassword
      );

      if (result.success) {
        toast({
          title: "Success",
          description: "Password changed successfully",
        });
        setIsChangePasswordOpen(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to change password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/admin/content",
      label: "Content",
      icon: <FileText className="h-5 w-5" />,
    },
    // ... other nav items
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button (unchanged) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-card border-r border-border`}
      >
        <div className="h-full px-3 py-4 flex flex-col">
          <div className="mb-8 px-3 flex items-center">
            <Shield className="h-6 w-6 text-primary mr-2" />
            <span className="text-lg font-bold">Admin Panel</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}

            {/* Change Password Button */}
            <Dialog
              open={isChangePasswordOpen}
              onOpenChange={setIsChangePasswordOpen}
            >
              <DialogTrigger asChild>
                <button className="w-full flex items-center px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground">
                  <Key className="h-5 w-5" />
                  <span className="ml-3">Change Password</span>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="oldPassword">Current Password</Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      value={passwordData.oldPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          oldPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </nav>

          <Button
            variant="ghost"
            className="flex items-center justify-start px-3 py-2"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
